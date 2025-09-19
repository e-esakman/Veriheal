import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PersonaProvider, usePersona } from '../../src/hooks/PersonaContext';
import { getScoreLevel } from '../../src/services/scoreEngine';

const DashboardContent = () => {
  const { persona, loading } = usePersona();
  const [verifications] = useState([
    { id: '1', hospital: 'AIIMS Delhi', status: 'verified', date: '2024-01-15', type: 'Blood Test' },
    { id: '2', hospital: 'Apollo Hospital', status: 'pending', date: '2024-01-14', type: 'X-Ray Report' },
  ]);

  const getStats = () => {
    if (!persona) {
      return {
        totalVerifications: 0,
        verifiedDocuments: 0,
        personaScore: 0
      };
    }

    const verificationCount = Object.keys(persona.verifications).length;
    return {
      totalVerifications: verificationCount,
      verifiedDocuments: verificationCount,
      personaScore: persona.personaScore || 0
    };
  };

  const stats = getStats();
  const scoreInfo = getScoreLevel(stats.personaScore);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <Ionicons name="medical" size={40} color="#007AFF" />
            <Text style={styles.welcomeTitle}>VeriHeal Dashboard</Text>
          </View>
          <Text style={styles.welcomeSubtitle}>Secure Healthcare Document Verification</Text>
        </View>

        {/* Persona Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Ionicons name="shield-checkmark" size={32} color={scoreInfo.color} />
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreTitle}>Medical Verification Score</Text>
              <Text style={[styles.scoreLevel, { color: scoreInfo.color }]}>{scoreInfo.level}</Text>
            </View>
            <Text style={[styles.scoreValue, { color: scoreInfo.color }]}>{stats.personaScore}</Text>
          </View>
          <Text style={styles.scoreDescription}>{scoreInfo.description}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{stats.totalVerifications}</Text>
            <Text style={styles.statLabel}>Total Verifications</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
            <Text style={styles.statNumber}>{stats.verifiedDocuments}</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={24} color={scoreInfo.color} />
            <Text style={styles.statNumber}>{stats.personaScore}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.actionText}>Upload Document</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#fff" />
            <Text style={styles.actionText}>Find Hospital</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Verifications */}
        <View style={styles.verificationsCard}>
          <Text style={styles.verificationsTitle}>Recent Verifications</Text>
          {verifications.map((verification) => (
            <View key={verification.id} style={styles.verificationItem}>
              <View style={styles.verificationIcon}>
                <Ionicons
                  name={verification.status === 'verified' ? 'checkmark-circle' : 'time'}
                  size={20}
                  color={verification.status === 'verified' ? '#27ae60' : '#f39c12'}
                />
              </View>
              <View style={styles.verificationDetails}>
                <Text style={styles.verificationHospital}>{verification.hospital}</Text>
                <Text style={styles.verificationType}>{verification.type}</Text>
                <Text style={styles.verificationDate}>{verification.date}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={[
                  styles.statusText,
                  { color: verification.status === 'verified' ? '#27ae60' : '#f39c12' }
                ]}>
                  {verification.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How VeriHeal Works</Text>
          <Text style={styles.infoText}>
            1. Upload your medical documents{'\n'}
            2. Select the hospital for verification{'\n'}
            3. Hospital verifies authenticity{'\n'}
            4. Get verified documents on blockchain
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function DashboardScreen() {
  return (
    <PersonaProvider>
      <DashboardContent />
    </PersonaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  verificationsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  verificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  verificationDetails: {
    flex: 1,
  },
  verificationHospital: {
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
    color: '#7f8c8d',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  scoreCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scoreLevel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
  },
});