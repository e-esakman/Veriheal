import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function zkTLSVerificationScreen({ navigation }) {
  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifying your identity...</Text>
      <ActivityIndicator size="large" color="#000" style={styles.loader} />
      <Text style={styles.verified}>zkTLS Proof Verified ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  verified: {
    fontSize: 16,
    color: '#1B873F',
    fontWeight: '500',
  },
});
