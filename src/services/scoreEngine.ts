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

export const generatePersonaScore = async (verifications: MedicalVerification): Promise<number> => {
  let score = 0;
  const maxScore = 100;

  // Base score for having any verification
  if (Object.keys(verifications).length > 0) {
    score += 10;
  }

  // Hospital verification scores
  if (verifications.aiims_patna) {
    score += 25; // Government hospital verification carries more weight
  }

  if (verifications.american_medical_academy) {
    score += 20; // Medical academy verification
  }

  if (verifications.buraydah_college) {
    score += 18; // Dental college verification
  }

  if (verifications.inaya_medical) {
    score += 20; // Medical college verification
  }

  // Check for any other hospital verifications dynamically
  Object.keys(verifications).forEach((key) => {
    if (key !== 'health_insurance' && key !== 'lab_reports' && 
        !['aiims_patna', 'american_medical_academy', 'buraydah_college', 'inaya_medical'].includes(key)) {
      // Generic hospital verification
      score += 15;
    }
  });

  // Insurance verification
  if (verifications.health_insurance) {
    score += 15; // Insurance verification adds credibility
  }

  // Lab reports verification
  if (verifications.lab_reports) {
    score += 10; // Lab reports add medical history credibility
  }

  // Bonus for multiple verifications (shows comprehensive medical history)
  const verificationCount = Object.keys(verifications).length;
  if (verificationCount >= 3) {
    score += 15; // Bonus for having 3+ verifications
  } else if (verificationCount >= 2) {
    score += 10; // Bonus for having 2+ verifications
  }

  // Time-based scoring (more recent verifications get higher scores)
  const now = new Date();
  Object.values(verifications).forEach((verification) => {
    if (verification && verification.verifiedAt) {
      const verifiedDate = new Date(verification.verifiedAt);
      const daysSinceVerification = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceVerification <= 30) {
        score += 5; // Recent verification bonus
      } else if (daysSinceVerification <= 90) {
        score += 3; // Moderately recent verification bonus
      }
    }
  });

  // Ensure score doesn't exceed maximum
  return Math.min(score, maxScore);
};

export const getScoreLevel = (score: number): { level: string; color: string; description: string } => {
  if (score >= 80) {
    return {
      level: 'Excellent',
      color: '#27ae60',
      description: 'Comprehensive medical verification with multiple trusted sources'
    };
  } else if (score >= 60) {
    return {
      level: 'Good',
      color: '#2ecc71',
      description: 'Good medical verification with trusted healthcare providers'
    };
  } else if (score >= 40) {
    return {
      level: 'Fair',
      color: '#f39c12',
      description: 'Basic medical verification, consider adding more sources'
    };
  } else if (score >= 20) {
    return {
      level: 'Limited',
      color: '#e67e22',
      description: 'Limited medical verification, more documentation needed'
    };
  } else {
    return {
      level: 'Unverified',
      color: '#e74c3c',
      description: 'No medical verification found, please verify your healthcare records'
    };
  }
};