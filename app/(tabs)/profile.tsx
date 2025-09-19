import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { PersonaProvider, usePersona } from '../../src/hooks/PersonaContext';
import { VerificationHistory } from '../../src/components/VerificationHistory';
import { WalletConnection } from '../../src/components/WalletConnection';
import { getScoreLevel } from '../../src/services/scoreEngine';

const ProfileContent = () => {
  const { persona, loading } = usePersona();
  const { wallet } = useAuth();
  
  const verificationCount = persona ? Object.keys(persona.verifications).length : 0;
  const scoreInfo = persona ? getScoreLevel(persona.personaScore || 0) : getScoreLevel(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Wallet Connection */}
        {!wallet && (
          <View style={styles.walletContainer}>
            <WalletConnection />
          </View>
        )}

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color="#007AFF" />
          </View>
          <Text style={styles.profileName}>
            {wallet ? 'Connected User' : 'Healthcare User'}
          </Text>
          <Text style={styles.profileSubtitle}>VeriHeal Member</Text>
          {wallet && (
            <Text style={styles.walletAddress}>
              {wallet.slice(0, 12)}...{wallet.slice(-8)}
            </Text>
          )}
        </View>

        {/* Account Information */}
        <View style={styles.profileCard}>
          <Text style={styles.title}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Member ID:</Text>
            <Text style={styles.value}>VH-2024-001</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Verified Documents:</Text>
            <Text style={styles.value}>{verificationCount}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Verification Score:</Text>
            <Text style={[styles.value, { color: scoreInfo.color }]}>
              {persona?.personaScore || 0} ({scoreInfo.level})
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>
        
        {/* Settings */}
        <View style={styles.settingsCard}>
          <Text style={styles.title}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <Text style={styles.settingText}>My Documents</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="shield-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Verification History */}
        <View style={styles.historyCard}>
          <VerificationHistory />
        </View>

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <Text style={styles.title}>App Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Version:</Text>
            <Text style={styles.value}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Build:</Text>
            <Text style={styles.value}>Development</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function ProfileScreen() {
  return (
    <PersonaProvider>
      <ProfileContent />
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
  profileHeader: {
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
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  profileCard: {
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
  settingsCard: {
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
  appInfoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  value: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  address: {
    fontSize: 12,
    color: '#2c3e50',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: 6,
    borderRadius: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#27ae60',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 12,
  },
  historyCard: {
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
  walletContainer: {
    marginBottom: 20,
  },
  walletAddress: {
    fontSize: 12,
    color: '#7f8c8d',
    fontFamily: 'monospace',
    marginTop: 4,
  },
});