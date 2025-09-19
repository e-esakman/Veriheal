export const ReclaimVerifyButton: React.FC<ReclaimVerifyButtonProps> = ({
    provider,
    onVerificationComplete,
}) => {
    const { data: account } = useAbstraxionAccount();
    const { client: signingClient } = useAbstraxionSigningClient();
    const { client: queryClient } = useAbstraxionClient();
    const [status, setStatus] = useState<'idle' | 'verifying' | 'scoring' | 'updating'>('idle');
    const { persona } = usePersona();

    const handleVerification = async () => {
        if (!account?.bech32Address || !signingClient || !queryClient) {
            return Alert.alert('Error', 'Client not ready. Please try again.');
        }

        setStatus('verifying');
        try {
            const verificationRequest: VerificationRequest = {
                providerId: provider.id,
                providerName: provider.name,
                userAddress: account.bech32Address
            };

            const proof = await verificationService.verifyHospitalRecord(verificationRequest);

            if (!proof) throw new Error('Verification did not return any proof.');

            console.log('Verification Proof:', proof);

            await updateDocuStore([proof], account.bech32Address);
        } catch (error: any) {
            console.error('Verification failed:', error);
            Alert.alert('Verification Failed', error.message || 'Could not complete verification.');
            setStatus('idle');
        }
    };

    const updateDocuStore = async (proofs: any[], userAddress: string) => {
        const existingPersona = persona || { verifications: {} };

        try {
            const proof = proofs[0];
            const verificationData = verificationService.extractVerificationData(proof);
            console.log('Verification Data:', verificationData);

            let newVerificationData: Record<string, any> = {};

            switch (provider.key) {
                case 'aiims_delhi':
                case 'health_insurance':
                    newVerificationData = {
                        health_insurance: {
                            policyNumber: verificationData.policyNumber || 'POL_' + Date.now(),
                            coverageAmount: verificationData.coverageAmount || '500000',
                            validityDate: verificationData.validityDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                            verifiedAt: verificationData.verifiedAt,
                            proofHash: verificationData.proofHash,
                        },
                    };
                    break;

                case 'lab_reports':
                    newVerificationData = {
                        lab_reports: {
                            testId: verificationData.testId || 'TEST_' + Date.now(),
                            testDate: verificationData.testDate || new Date().toISOString().split('T')[0],
                            labName: verificationData.labName || provider.name,
                            verifiedAt: verificationData.verifiedAt,
                            proofHash: verificationData.proofHash,
                        },
                    };
                    break;

                default:
                    newVerificationData = {
                        [provider.key]: verificationData,
                    };
            }

            const updatedVerifications = {
                ...existingPersona.verifications,
                ...newVerificationData,
            };

            setStatus('scoring');
            const personaScore = await generatePersonaScore(updatedVerifications);

            const finalPersonaDocument = {
                verifications: updatedVerifications,
                personaScore,
                lastUpdatedAt: verificationData.verifiedAt,
            };

            setStatus('updating');
            const writeMsg = {
                Set: {
                    collection: 'personas',
                    document: userAddress,
                    data: JSON.stringify(finalPersonaDocument),
                },
            };

            await signingClient!.execute(userAddress, DOCUSTORE_ADDRESS, writeMsg, 'auto');

            Alert.alert('Success!', `Your medical verification with ${provider.name} has been updated on-chain.`);
            onVerificationComplete();
        } catch (error: any) {
            Alert.alert('Update Error', error.message || 'Failed to update medical verification.');
        } finally {
            setStatus('idle');
        }
    };

    // ✅ Move helpers OUTSIDE updateDocuStore
    const getButtonTitle = () => {
        if (status === 'verifying') return 'Follow instructions...';
        if (status === 'scoring') return 'Calculating Score...';
        if (status === 'updating') return 'Saving to Blockchain...';

        const isAlreadyVerified =
            persona && persona.verifications && persona.verifications[provider.key as keyof typeof persona.verifications];

        return isAlreadyVerified ? `Re-Verify ${provider.name}` : `Verify with ${provider.name}`;
    };

    const getButtonIcon = () => {
        if (status === 'verifying') return 'hourglass-outline';
        if (status === 'scoring') return 'calculator-outline';
        if (status === 'updating') return 'cloud-upload-outline';

        const isAlreadyVerified =
            persona && persona.verifications && persona.verifications[provider.key as keyof typeof persona.verifications];

        return isAlreadyVerified ? 'refresh-outline' : 'shield-checkmark-outline';
    };

    // ✅ Proper component return
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, status !== 'idle' && styles.buttonDisabled]}
                onPress={handleVerification}
                disabled={status !== 'idle'}
            >
                <Ionicons name={getButtonIcon()} size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>{getButtonTitle()}</Text>
            </TouchableOpacity>
            {status !== 'idle' && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#007AFF" />
                    <Text style={styles.loadingText}>Processing verification...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    loadingText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#7f8c8d',
    },
});
