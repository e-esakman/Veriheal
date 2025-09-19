import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAbstraxionAccount, useAbstraxionSigningClient } from '@burnt-labs/abstraxion';

interface MedicalVerification {
  aiims_patna?: {
    patientId: string;
    recordNumber: string;
    treatmentDate: string;
    hospitalName: string;
    verifiedAt: string;
    proofHash: string;
  };
  american_medical_academy?: {
    patientId: string;
    recordNumber: string;
    treatmentDate: string;
    hospitalName: string;
    verifiedAt: string;
    proofHash: string;
  };
  buraydah_college?: {
    patientId: string;
    recordNumber: string;
    treatmentDate: string;
    hospitalName: string;
    verifiedAt: string;
    proofHash: string;
  };
  inaya_medical?: {
    patientId: string;
    recordNumber: string;
    treatmentDate: string;
    hospitalName: string;
    verifiedAt: string;
    proofHash: string;
  };
  health_insurance?: {
    policyNumber: string;
    coverageAmount: string;
    validityDate: string;
    verifiedAt: string;
    proofHash: string;
  };
  lab_reports?: {
    testId: string;
    testDate: string;
    labName: string;
    verifiedAt: string;
    proofHash: string;
  };
  // Allow for dynamic hospital providers
  [key: string]: any;
}

interface Persona {
  verifications: MedicalVerification;
  personaScore: number;
  lastUpdatedAt: string;
}

interface PersonaContextType {
  persona: Persona | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

const DOCUSTORE_ADDRESS = process.env.EXPO_PUBLIC_DOCUSTORE_CONTRACT_ADDRESS || '';

interface PersonaProviderProps {
  children: ReactNode;
}

export const PersonaProvider: React.FC<PersonaProviderProps> = ({ children }) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: account } = useAbstraxionAccount();
  const { client: queryClient } = useAbstraxionSigningClient();

  const fetchPersona = async () => {
    if (!account?.bech32Address || !queryClient || !DOCUSTORE_ADDRESS) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryMsg = {
        Get: {
          collection: 'personas',
          document: account.bech32Address,
        },
      };

      const result = await queryClient.queryContractSmart(DOCUSTORE_ADDRESS, queryMsg);
      
      if (result && result.data) {
        const parsedPersona = JSON.parse(result.data);
        setPersona(parsedPersona);
      } else {
        // Initialize empty persona if none exists
        setPersona({
          verifications: {},
          personaScore: 0,
          lastUpdatedAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error('Error fetching persona:', err);
      if (err.message?.includes('not found')) {
        // Initialize empty persona if document doesn't exist
        setPersona({
          verifications: {},
          personaScore: 0,
          lastUpdatedAt: new Date().toISOString(),
        });
      } else {
        setError(err.message || 'Failed to fetch persona data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersona();
  }, [account?.bech32Address, queryClient]);

  const refetch = async () => {
    await fetchPersona();
  };

  const value: PersonaContextType = {
    persona,
    loading,
    error,
    refetch,
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = (): PersonaContextType => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};