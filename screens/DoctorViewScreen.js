import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const mockPatients = [
  { name: 'Alice', status: 'Pending' },
  { name: 'Bob', status: 'Verified' },
];

export default function DoctorViewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctor Dashboard</Text>
      {mockPatients.map((p, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.name}>{p.name}</Text>
          <Text>Status: {p.status}</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>✅ Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.reject]}>
              <Text style={styles.btnText}>❌ Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  reject: {
    backgroundColor: '#b91c1c',
    marginRight: 0,
    marginLeft: 5,
  },
  btnText: {
    color: '#fff',
  },
});
