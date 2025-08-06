import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 72) / 2;

export default function SelectTypeScreen({ navigation }) {
  const types = [
    { label: 'Mental Health', image: require('../assets/mental.png'), value: 'mental' },
    { label: 'Cancer Care', image: require('../assets/cancer.png'), value: 'cancer' },
    { label: 'Addiction Support', image: require('../assets/narcotics.png'), value: 'narcotics' },
  ];

  const handleSelect = (type) => {
    navigation.navigate('Login', { selectedType: type });
  };

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.heading}>What is VeriHeal?</Text>
        <Text style={styles.description}>
          Your health journey should be proven through trust, privacy, and on-chain verification.
        </Text>
      </View>

      <FlatList
        data={types}
        keyExtractor={(item) => item.value}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.value}
            style={styles.card}
            onPress={() => handleSelect(item.value)}
          >
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  intro: {
    alignItems: 'center',
    marginTop: 80, // 🪄 Adjust this for vertical centering
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: cardWidth,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});
