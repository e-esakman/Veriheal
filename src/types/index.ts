// Consolidated type definitions for VeriHealApp

// User roles
export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

// Complete user interface
export interface User {
  id: string;
  realName: string;
  dateOfBirth: Date;
  nationalId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumber: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  encryptionMetadata: {
    algorithm: string;
    keyId: string;
    encryptedAt: Date;
    version: string;
  };
  role: UserRole;
  walletAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Claim types for healthcare verification
export enum ClaimType {
  HOSPITAL_VISIT = 'HOSPITAL_VISIT',
  LAB_REPORT = 'LAB_REPORT',
  PRESCRIPTION = 'PRESCRIPTION',
  VACCINATION = 'VACCINATION',
  INSURANCE_CLAIM = 'INSURANCE_CLAIM',
  MENTAL_HEALTH = 'MENTAL_HEALTH',
  CHRONIC_CONDITION = 'CHRONIC_CONDITION'
}

// Verification status
export enum VerificationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  VERIFIED = 'verified',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

// Proof status
export enum ProofStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

// Verification methods
export enum VerificationMethod {
  RECLAIM_PROTOCOL = 'reclaim_protocol',
  DIRECT_API = 'direct_api',
  DOCUMENT_UPLOAD = 'document_upload'
}

// Activity for trust score
export interface Activity {
  id: string;
  type: ClaimType | string;
  description: string;
  scoreImpact: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  providerId?: string;
  blockchainTx?: string;
}

// Trust score interface
export interface TrustScore {
  score: number;
  activities: Activity[];
  activityHistory: Activity[];
  lastUpdated: Date;
}

// Verification proof interface
export interface VerificationProof {
  id: string;
  type: ClaimType;
  status: ProofStatus;
  data: any;
  timestamp: Date;
  userId: string;
}

// Simplified proof metadata
export interface ProofMetadata {
  documentName?: string;
  documentDate?: Date;
  providerLocation?: string;
  treatmentType?: string;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'emergency';
  tags?: string[];
  trustLevel?: number;
  dataHash?: string;
  blockchainProof?: boolean;
  witnessCount?: number;
}

// zkTLS Proof interface
export interface zkTLSProof {
  proofId: string;
  userId: string;
  claimType: ClaimType;
  status: ProofStatus;
  verificationMethod: VerificationMethod;
  proofData: any;
  createdAt: Date;
  expiresAt: Date;
  metadata?: ProofMetadata;
}

// Verification session
export interface VerificationSession {
  sessionId: string;
  userId: string;
  claimType: ClaimType;
  status: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
  requestUrl?: string;
}

// Progress interface for verification
export interface VerificationProgress {
  step: number;
  message: string;
  details?: any;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ConnectWallet: undefined;
  Dashboard: undefined;
  VerificationType: undefined;
  zkTLSVerification: undefined;
  HealthcareProviders: undefined;
  Badges: undefined;
  TrustScoreDetails: { trustScore: TrustScore };
};