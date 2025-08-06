import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BadgeGalleryScreen() {
  const badges = ['✅ Cancer Proof', '🧠 Mental Health', '💊 Addiction Support'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Earned Badges</Text>
      {badges.map((badge, index) => (
        <Text key={index} style={styles.badge}>
          {badge}
        </Text>
      ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  badge: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
});
