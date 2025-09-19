import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAbstraxion } from '../providers/AbstraxionProvider';

export default function DebugInfo() {
  const { account, isConnected, client, config } = useAbstraxion();

  if (!__DEV__) return null; // Only show in development

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Info</Text>
      <Text style={styles.text}>Connected: {isConnected ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>Account: {account?.bech32Address || 'None'}</Text>
      <Text style={styles.text}>Client: {client ? 'Available' : 'Not available'}</Text>
      <Text style={styles.text}>Chain ID: {config.chainId}</Text>
      <Text style={styles.text}>RPC: {config.rpcUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
});