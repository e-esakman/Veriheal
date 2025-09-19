import { Alert } from 'react-native';

export interface VerificationProof {
  identifier: string;
  claimData: {
    provider: string;
    parameters: string;
  };
  signatures: string[];
  witnesses: Array<{
    id: string;
    url: string;
  }>;
  timestamp: number;
  hash: string;
}

export interface VerificationRequest {
  providerId: string;
  providerName: string;
  userAddress: string;
}

class VerificationService {
  private appId: string;
  private appSecret: string;

  constructor() {
    this.appId = process.env.EXPO_PUBLIC_RECLAIM_APP_ID || '';
    this.appSecret = process.env.EXPO_PUBLIC_RECLAIM_APP_SECRET || '';
  }

  async verifyHospitalRecord(request: VerificationRequest): Promise<VerificationProof> {
    try {
      // Simulate verification process
      // In a real implementation, this would:
      // 1. Create a Reclaim proof request
      // 2. Show verification UI to user
      // 3. Get actual proof from Reclaim Protocol
      
      const timestamp = Date.now();
      const mockProof: VerificationProof = {
        identifier: request.providerId,
        claimData: {
          provider: request.providerName,
          parameters: JSON.stringify({
            userAddress: request.userAddress,
            providerId: request.providerId,
            providerName: request.providerName,
            patientId: `PATIENT_${timestamp}`,
            recordNumber: `MRN_${timestamp}`,
            treatmentDate: new Date().toISOString().split('T')[0],
            timestamp: timestamp
          })
        },
        signatures: [`sig_${timestamp}_${Math.random().toString(36).substr(2, 9)}`],
        witnesses: [
          {
            id: `witness_${timestamp}`,
            url: 'https://witness.reclaim.com'
          }
        ],
        timestamp: timestamp,
        hash: `proof_${timestamp}_${Math.random().toString(36).substr(2, 9)}`
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      return mockProof;
    } catch (error: any) {
      console.error('Verification failed:', error);
      throw new Error(`Verification failed: ${error.message}`);
    }
  }

  async createProofRequest(providerId: string): Promise<string> {
    // This would normally create a Reclaim proof request
    // For now, return a mock request URL
    return `https://reclaim.cloud/verify/${providerId}?app=${this.appId}`;
  }

  validateProof(proof: VerificationProof): boolean {
    // Basic validation
    return !!(
      proof.identifier &&
      proof.claimData &&
      proof.signatures &&
      proof.signatures.length > 0 &&
      proof.witnesses &&
      proof.witnesses.length > 0 &&
      proof.timestamp &&
      proof.hash
    );
  }

  extractVerificationData(proof: VerificationProof) {
    try {
      const params = JSON.parse(proof.claimData.parameters);
      return {
        patientId: params.patientId || `PATIENT_${Date.now()}`,
        recordNumber: params.recordNumber || `MRN_${Date.now()}`,
        treatmentDate: params.treatmentDate || new Date().toISOString().split('T')[0],
        hospitalName: params.providerName || proof.claimData.provider,
        verifiedAt: new Date(proof.timestamp).toISOString(),
        proofHash: proof.hash
      };
    } catch (error) {
      console.error('Failed to extract verification data:', error);
      // Return default data if parsing fails
      const timestamp = Date.now();
      return {
        patientId: `PATIENT_${timestamp}`,
        recordNumber: `MRN_${timestamp}`,
        treatmentDate: new Date().toISOString().split('T')[0],
        hospitalName: proof.claimData.provider,
        verifiedAt: new Date().toISOString(),
        proofHash: proof.hash || `proof_${timestamp}`
      };
    }
  }
}

export const verificationService = new VerificationService();