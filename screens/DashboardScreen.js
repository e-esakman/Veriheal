import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to VeriHeal 🩺</Text>
      <Text style={styles.badge}>✅ Verified on-chain</Text>
      <Text style={styles.wallet}>Wallet Address:</Text>
      <Text style={styles.address}>0xAB12...CDEF</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Proof on Explorer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate('BadgeGallery')}
      >
        <Text style={styles.buttonText}>View Badges</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate('DoctorView')}
      >
        <Text style={styles.buttonText}>Doctor View</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  badge: {
    fontSize: 16,
    color: '#1B873F',
    marginBottom: 16,
  },
  wallet: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  address: {
    marginBottom: 20,
    fontFamily: 'monospace',
    color: '#555',
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 30,
    marginBottom: 14,
    width: '80%',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
