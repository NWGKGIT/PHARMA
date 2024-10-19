import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import DeleteMedicineForm from './DeleteMedicineForm';

const MedicineCardDel = ({ medicine }) => {
  return (
    <View style={styles.card}>
      <Image source={medicine.image} style={styles.image} />
      <Text style={styles.name}>{medicine.name}</Text>
      <Text style={styles.type}>{medicine.type}</Text>
      <Text style={styles.expirationDate}>Expiration Date: {medicine.expirationDate}</Text>
      {/* Removed amount control */}
      <DeleteMedicineForm medicineId={medicine.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: 'gray',
  },
  expirationDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MedicineCardDel;
