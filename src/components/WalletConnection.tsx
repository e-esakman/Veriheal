import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

interface WalletConnectionProps {
  onConnected?: () => void;
}

export function WalletConnection({ onConnected }: WalletConnectionProps) {
  const { wallet, login, logout } = useAuth();

  React.useEffect(() => {
    console.log('WalletConnection state:', { wallet });
    if (wallet && onConnected) {
      onConnected();
    }
  }, [wallet, onConnected]);

  const handleLogin = async () => {
    try {
      console.log('Attempting wallet login...');
      await login(); // This will open the XION wallet connection flow
    } catch (error) {
      console.error('Wallet login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {wallet ? (
        <View style={styles.connectedContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.connectedLabel}>Connected XION Wallet</Text>
            <Text style={styles.addressText}>
              {wallet.slice(0, 12)}...{wallet.slice(-8)}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Connect Your XION Wallet</Text>
          <Text style={styles.connectSubtitle}>
            Sign in with email, social login, wallet, or passkey to get started
          </Text>
          <TouchableOpacity onPress={handleLogin} style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect XION Wallet</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  connectedContainer: {
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  addressContainer: {
    marginBottom: 16,
  },
  connectedLabel: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: '#1b5e20',
    fontFamily: 'monospace',
  },
  displayName: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  connectContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  connectSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});