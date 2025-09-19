export interface HospitalProvider {
  id: string;
  name: string;
  key: string;
  description: string;
  category: 'hospital' | 'medical_record' | 'insurance';
  icon: string;
  requiredFields: string[];
}

export const HOSPITAL_PROVIDERS: HospitalProvider[] = [
  {
    id: 'a745eadb-b7aa-4c9f-94a4-e847f48bb640',
    name: 'AIIMS Patna',
    key: 'aiims_patna',
    description: 'Verify medical records from AIIMS Patna',
    category: 'hospital',
    icon: '🏥',
    requiredFields: ['patient_id', 'medical_record_number', 'treatment_date']
  },
  {
    id: '2f84323c-630f-44fb-aa35-cbe26b699c5c',
    name: 'American Medical Academy',
    key: 'american_medical_academy',
    description: 'Verify medical records from American Medical Academy',
    category: 'hospital',
    icon: '🏥',
    requiredFields: ['patient_id', 'medical_record_number', 'treatment_date']
  },
  {
    id: '3eb2630d-631f-4461-91f5-8ecb67e2527b',
    name: 'Buraydah College of Dentistry',
    key: 'buraydah_college',
    description: 'Verify dental records from Buraydah College of Dentistry',
    category: 'hospital',
    icon: '🦷',
    requiredFields: ['patient_id', 'medical_record_number', 'treatment_date']
  },
  {
    id: process.env.EXPO_PUBLIC_RECLAIM_PROVIDER_ID_4 || 'your-next-provider-id',
    name: 'Inaya Medical College',
    key: 'inaya_medical',
    description: 'Verify medical records from Inaya Medical College',
    category: 'hospital',
    icon: '🏥',
    requiredFields: ['patient_id', 'medical_record_number', 'treatment_date']
  },
  {
    id: process.env.EXPO_PUBLIC_RECLAIM_PROVIDER_ID_5 || 'health_insurance_provider',
    name: 'Health Insurance',
    key: 'health_insurance',
    description: 'Verify health insurance coverage',
    category: 'insurance',
    icon: '🛡️',
    requiredFields: ['policy_number', 'coverage_amount', 'validity_date']
  },
  {
    id: process.env.EXPO_PUBLIC_RECLAIM_PROVIDER_ID_6 || 'lab_reports_provider',
    name: 'Lab Reports',
    key: 'lab_reports',
    description: 'Verify laboratory test results',
    category: 'medical_record',
    icon: '🧪',
    requiredFields: ['test_id', 'test_date', 'lab_name']
  }
];

// For backward compatibility with the original PersonaProvider interface
export interface PersonaProvider {
  id: string;
  name: string;
  key: string;
  description: string;
  icon: string;
}

export const PERSONA_PROVIDERS: PersonaProvider[] = HOSPITAL_PROVIDERS.map(provider => ({
  id: provider.id,
  name: provider.name,
  key: provider.key,
  description: provider.description,
  icon: provider.icon
}));