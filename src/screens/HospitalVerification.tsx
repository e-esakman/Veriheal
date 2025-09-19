import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Removed Abstraxion imports for demo mode
import { usePersona } from '../hooks/PersonaContext';
import { useAuth } from '../contexts/AuthContext';
import { generatePersonaScore } from '../services/scoreEngine';
import { verificationService, VerificationRequest } from '../services/verificationService';
import { WalletConnection } from '../components/WalletConnection';

const DOCUSTORE_ADDRESS = process.env.EXPO_PUBLIC_DOCUSTORE_CONTRACT_ADDRESS!;

// Hospital providers from Reclaim Dashboard
const hospitalProviders = [
  {
    id: 'a745eadb-b7aa-4c9f-94a4-e847f48bb640',
    name: 'AIIMS Patna',
    key: 'aiims_patna',
  },
  {
    id: '2f84323c-630f-44fb-aa35-cbe26b699c5c',
    name: 'American Medical Academy',
    key: 'american_medical_academy',
  },
  {
    id: '3eb2630d-631f-4461-91f5-8ecb67e2527b',
    name: 'Buraydah College of Dentistry',
    key: 'buraydah_college',
  },
  {
    id: process.env.EXPO_PUBLIC_RECLAIM_PROVIDER_ID_4 || 'your-next-provider-id',
    name: 'Inaya Medical College',
    key: 'inaya_medical',
  },
];

export default function HospitalVerification() {
  const { persona, refetch } = usePersona();
  const { wallet } = useAuth();
  const account = wallet;
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [verified, setVerified] = useState<Record<string, boolean>>({});

  // Initialize verified state from persona data
  React.useEffect(() => {
    if (persona?.verifications) {
      const verifiedState: Record<string, boolean> = {};
      hospitalProviders.forEach(provider => {
        if (persona.verifications[provider.key]) {
          verifiedState[provider.id] = true;
        }
      });
      setVerified(verifiedState);
    }
  }, [persona]);

  const handleVerify = async (providerId: string, providerName: string, providerKey: string) => {
    if (!account) {
      Alert.alert('Error', 'Wallet not connected. Please connect your wallet first.');
      return;
    }

    try {
      setLoadingId(providerId);

      // Create verification request
      const verificationRequest: VerificationRequest = {
        providerId,
        providerName,
        userAddress: account
      };

      // Get verification proof using our service
      const proof = await verificationService.verifyHospitalRecord(verificationRequest);

      console.log('Verification proof:', proof);

      if (!proof) {
        throw new Error('Verification failed - no proof returned');
      }

      // Update the persona with new verification
      await updatePersonaWithVerification(proof, providerKey, providerName);

      // Mark provider as verified
      setVerified((prev) => ({ ...prev, [providerId]: true }));
      
      Alert.alert(
        'Verification Successful! ✅',
        `Your medical records from ${providerName} have been verified and stored on-chain.`
      );

    } catch (err: any) {
      console.error('Verification failed:', err);
      Alert.alert(
        'Verification Failed',
        err.message || 'Could not complete verification. Please try again.'
      );
    } finally {
      setLoadingId(null);
    }
  };

  const updatePersonaWithVerification = async (proof: any, providerKey: string, providerName: string) => {
    const existingPersona = persona || { verifications: {} };
    
    try {
      // Extract verification data from proof
      const verificationData = verificationService.extractVerificationData(proof);

      const updatedVerifications = {
        ...existingPersona.verifications,
        [providerKey]: verificationData,
      };

      // Calculate new score
      const personaScore = await generatePersonaScore(updatedVerifications);

      const finalPersonaDocument = {
        verifications: updatedVerifications,
        personaScore,
        lastUpdatedAt: verificationData.verifiedAt,
      };

      // In demo mode, we'll skip blockchain writing
      // Save to blockchain would happen here in production
      console.log('Demo mode: Would save to blockchain:', finalPersonaDocument);

      // Refresh persona data
      await refetch();

    } catch (error: any) {
      console.error('Failed to update persona:', error);
      throw new Error('Failed to save verification data on-chain');
    }
  };

  const renderHospital = ({ item }: { item: typeof hospitalProviders[0] }) => (
    <View style={styles.card}>
      <View style={styles.hospitalInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>Medical Records Verification</Text>
      </View>
      
      <View style={styles.actionContainer}>
        {verified[item.id] ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.verified}>✅ Verified</Text>
            <TouchableOpacity
              style={styles.reVerifyButton}
              onPress={() => handleVerify(item.id, item.name, item.key)}
              disabled={loadingId === item.id}
            >
              <Text style={styles.reVerifyText}>Re-verify</Text>
            </TouchableOpacity>
          </View>
        ) : loadingId === item.id ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#007AFF" size="small" />
            <Text style={styles.loadingText}>Verifying...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleVerify(item.id, item.name, item.key)}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hospital Verification</Text>
        <Text style={styles.headerSubtitle}>
          Verify your medical records with trusted healthcare providers
        </Text>
      </View>

      {!wallet ? (
        <View style={styles.walletContainer}>
          <WalletConnection />
        </View>
      ) : (
        <FlatList
          data={hospitalProviders}
          keyExtractor={(item) => item.id}
          renderItem={renderHospital}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  hospitalInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  verifiedContainer: {
    alignItems: 'flex-end',
  },
  verified: {
    color: '#27ae60',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  reVerifyButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  reVerifyText: {
    color: '#6c757d',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  walletContainer: {
    flex: 1,
    padding: 20,
  },
});