import React from 'react';
import { PersonaProvider } from '../../src/hooks/PersonaContext';
import HospitalVerification from '../../src/screens/HospitalVerification';

const VerifyScreenContent = () => {
  return <HospitalVerification />;
};

export default function VerifyScreen() {
  return (
    <PersonaProvider>
      <VerifyScreenContent />
    </PersonaProvider>
  );
}