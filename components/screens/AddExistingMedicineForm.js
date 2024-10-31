import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { MedicineContext } from '../contexts/MedicineContext';

const AddExistingMedicineForm = ({ route, navigation }) => {
  const { medicine } = route.params;
  const [amount, setAmount] = useState('');
  const { updateMedicineAmount } = useContext(MedicineContext);

  const handleSubmit = () => {
    const amountToAdd = parseInt(amount);
    
    if (!isNaN(amountToAdd) && amountToAdd > 0) {
      // Increment the total amount of medicine
      const newAmount = medicine.amount + amountToAdd;
      updateMedicineAmount(medicine.id, newAmount);

      console.log(`Incremented ${medicine.name} by ${amountToAdd}`);
    }

    // Navigate back to the previous screen or reset fields
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Existing Medicine</Text>
      <Text>Name: {medicine.name}</Text>
      <Text>Type: {medicine.type}</Text>
      <Text>Price: ${medicine.priceSell}</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Add Medicine" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default AddExistingMedicineForm;
