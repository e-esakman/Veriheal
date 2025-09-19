import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePersona } from '../hooks/PersonaContext';

interface VerificationItem {
  id: string;
  type: string;
  name: string;
  verifiedAt: string;
  icon: string;
}

export const VerificationHistory: React.FC = () => {
  const { persona, loading } = usePersona();

  const getVerificationItems = (): VerificationItem[] => {
    if (!persona?.verifications) return [];

    const items: VerificationItem[] = [];

    if (persona.verifications.aiims_patna) {
      items.push({
        id: 'aiims_patna',
        type: 'Hospital',
        name: persona.verifications.aiims_patna.hospitalName || 'AIIMS Patna',
        verifiedAt: persona.verifications.aiims_patna.verifiedAt,
        icon: '🏥'
      });
    }

    if (persona.verifications.american_medical_academy) {
      items.push({
        id: 'american_medical_academy',
        type: 'Medical Academy',
        name: persona.verifications.american_medical_academy.hospitalName || 'American Medical Academy',
        verifiedAt: persona.verifications.american_medical_academy.verifiedAt,
        icon: '🏥'
      });
    }

    if (persona.verifications.buraydah_college) {
      items.push({
        id: 'buraydah_college',
        type: 'Dental College',
        name: persona.verifications.buraydah_college.hospitalName || 'Buraydah College of Dentistry',
        verifiedAt: persona.verifications.buraydah_college.verifiedAt,
        icon: '🦷'
      });
    }

    if (persona.verifications.inaya_medical) {
      items.push({
        id: 'inaya_medical',
        type: 'Medical College',
        name: persona.verifications.inaya_medical.hospitalName || 'Inaya Medical College',
        verifiedAt: persona.verifications.inaya_medical.verifiedAt,
        icon: '🏥'
      });
    }

    // Handle dynamic hospital verifications
    Object.keys(persona.verifications).forEach((key) => {
      if (!['aiims_patna', 'american_medical_academy', 'buraydah_college', 'inaya_medical', 'health_insurance', 'lab_reports'].includes(key)) {
        const verification = persona.verifications[key];
        if (verification && verification.verifiedAt) {
          items.push({
            id: key,
            type: 'Hospital',
            name: verification.hospitalName || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            verifiedAt: verification.verifiedAt,
            icon: '🏥'
          });
        }
      }
    });

    if (persona.verifications.health_insurance) {
      items.push({
        id: 'health_insurance',
        type: 'Insurance',
        name: 'Health Insurance',
        verifiedAt: persona.verifications.health_insurance.verifiedAt,
        icon: '🛡️'
      });
    }

    if (persona.verifications.lab_reports) {
      items.push({
        id: 'lab_reports',
        type: 'Lab Report',
        name: 'Laboratory Tests',
        verifiedAt: persona.verifications.lab_reports.verifiedAt,
        icon: '🧪'
      });
    }

    return items.sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime());
  };

  const renderVerificationItem = ({ item }: { item: VerificationItem }) => (
    <View style={styles.verificationItem}>
      <View style={styles.verificationIcon}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.verificationDetails}>
        <Text style={styles.verificationName}>{item.name}</Text>
        <Text style={styles.verificationType}>{item.type}</Text>
        <Text style={styles.verificationDate}>
          Verified on {new Date(item.verifiedAt).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading verification history...</Text>
      </View>
    );
  }

  const verificationItems = getVerificationItems();

  if (verificationItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-outline" size={48} color="#ccc" />
        <Text style={styles.emptyTitle}>No Verifications Yet</Text>
        <Text style={styles.emptyText}>
          Start by verifying your medical documents with trusted healthcare providers.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification History</Text>
      <FlatList
        data={verificationItems}
        keyExtractor={(item) => item.id}
        renderItem={renderVerificationItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  verificationDetails: {
    flex: 1,
  },
  verificationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  verificationType: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  verificationDate: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});