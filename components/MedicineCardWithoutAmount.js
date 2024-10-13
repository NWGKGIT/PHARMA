import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MedicineCardWithoutAmount = ({ medicine, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={medicine.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{medicine.name}</Text>
        <Text style={styles.type}>{medicine.type}</Text>
        <Text style={styles.price}>Price: ${medicine.price}</Text>
        <Text style={styles.expiration}>Expires: {medicine.expirationDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 1.41, 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  expiration: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MedicineCardWithoutAmount;
