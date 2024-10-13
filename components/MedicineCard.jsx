import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import upIcon from '../assets/up.png';
import downIcon from '../assets/down.png';
import medicine_image from '../assets/medicine.jpg';
const MedicineCard = ({
  medicine,
  isSelected,
  amount,
  onSelect,
  onIncrease,
  onDecrease,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardFocused]}
      onPress={() => onSelect(medicine.id, !isSelected)}
    >
      <Image source={medicine_image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{medicine.name}</Text>
        <Text style={styles.type}>{medicine.type}</Text>
        <Text style={styles.price}>Price: ${medicine.price}</Text>
        <Text style={styles.expiration}>Expires: {medicine.expirationDate}</Text>
      </View>
      <View style={styles.amountBox}>
        <TouchableOpacity onPress={onIncrease} style={styles.button}>
          <Image source={upIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.amountText}>{amount}</Text>
        <TouchableOpacity onPress={onDecrease} style={styles.button}>
          <Image source={downIcon} style={styles.icon} />
        </TouchableOpacity>
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
  cardFocused: {
    backgroundColor: '#ADD8E6', 
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
  amountBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default MedicineCard;
