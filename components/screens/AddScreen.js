// components/screens/AddScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AddNewMedicineForm from '../AddNewMedicineForm';

const { width, height } = Dimensions.get('window');

const AddScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Add New Medicine Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNewMedicineForm')}
      > 
        <Image source={require('../../assets/AddExisting.png')}  style={styles.icon} />
        <Text style={styles.buttonText}>Add Existing Medicine</Text>
      </TouchableOpacity>

      {/* Search Existing Medicine Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Add', { screen: 'NewMedicineForm' })}
      >
        <Image source={require('../../assets/Add.png')}style={styles.icon} />
        <Text style={styles.buttonText}>Add New Medicine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    width: '100%',
    justifyContent: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddScreen;
