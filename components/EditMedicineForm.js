import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image, 
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MedicineContext } from './contexts/MedicineContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const EditMedicineForm = ({ route, navigation }) => {
  const { medicine } = route.params;
  const { editMedicine } = useContext(MedicineContext);

  const [medicineName, setMedicineName] = useState(medicine.name);
  const [medicineType, setMedicineType] = useState(medicine.type);
  const [amount, setAmount] = useState(medicine.amount.toString());
  const [expirationDate, setExpirationDate] = useState(new Date(medicine.expirationDate));
  const [priceBuy, setPriceBuy] = useState(medicine.priceBuy ? medicine.priceBuy.toString() : '');
  const [priceSell, setPriceSell] = useState(medicine.priceSell ? medicine.priceSell.toString() : '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempImageUri, setTempImageUri] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatePicker(Platform.OS === 'ios');
    setExpirationDate(currentDate);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera access is required to take a picture.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const tempUri = result.uri;
      setSelectedImage(tempUri);
      setTempImageUri(tempUri);
    }
  };

  const handleDone = async () => {
    if (!medicineName || !medicineType || !amount || isNaN(amount) || !expirationDate || !priceBuy || isNaN(priceBuy) || !priceSell || isNaN(priceSell)) {
      Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
      return;
    }

    let finalImageUri = medicine.image;
    if (tempImageUri) {
      const fileName = `medicine${medicine.id}.png`;
      const assetsPath = `${FileSystem.documentDirectory}assets/${fileName}`;
      try {
        await FileSystem.moveAsync({
          from: tempImageUri,
          to: assetsPath,
        });
        finalImageUri = assetsPath;
      } catch (error) {
        console.log('Failed to save image:', error);
        Alert.alert('Error', 'Failed to save image.');
      }
    }

    const updatedMedicine = {
      name: medicineName,
      type: medicineType,
      amount: parseInt(amount, 10),
      expirationDate: expirationDate.toISOString().split('T')[0],
      priceBuy: parseFloat(priceBuy),
      priceSell: parseFloat(priceSell),
      image: finalImageUri,
    };

    editMedicine(medicine.id, updatedMedicine);
    Alert.alert('Success', 'Medicine updated successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <Image source={medicine.image} style={styles.image} />
      )}

      <TouchableOpacity style={styles.changeImageButton} onPress={openCamera}>
        <Text style={styles.changeImageButtonText}>Change Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <Text style={styles.label}>Medicine Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Medicine Type"
        value={medicineType}
        onChangeText={setMedicineType}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Price/Buy</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Buy Price"
        keyboardType="numeric"
        value={priceBuy}
        onChangeText={setPriceBuy}
      />

      <Text style={styles.label}>Price/Sell</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sell Price"
        keyboardType="numeric"
        value={priceSell}
        onChangeText={setPriceSell}
      />

      <Text style={styles.label}>Expiration Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{expirationDate.toISOString().split('T')[0]}</Text>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  changeImageButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  changeImageButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default EditMedicineForm;
