import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MedicineContext } from './contexts/MedicineContext';

const NewMedicineForm = ({ navigation }) => {
  const { addMedicine } = useContext(MedicineContext); 
  const [medicineName, setMedicineName] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatePicker(Platform.OS === 'ios');
    setExpirationDate(currentDate);
  };

  const handleDone = () => {
    if (!medicineName || !medicineType || !amount || isNaN(amount) || !price || isNaN(price) || !expirationDate) {
      Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
      return;
    }
  
    const newMedicine = {
      name: medicineName,
      type: medicineType,
      amount: parseInt(amount, 10),
      price: parseFloat(price),
      expirationDate: expirationDate.toISOString().split('T')[0],
      image: require('../assets/medicine.jpg'), 
    };

    addMedicine(newMedicine);
    Alert.alert('Success', 'Medicine added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);

    setMedicineName('');
    setMedicineType('');
    setAmount('');
    setPrice('');
    setExpirationDate(new Date());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter medicine name"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <Text style={styles.label}>Medicine Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter medicine type"
        value={medicineType}
        onChangeText={setMedicineType}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Expiration Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {expirationDate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewMedicineForm;
