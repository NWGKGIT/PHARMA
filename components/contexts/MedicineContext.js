import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const storedMedicines = await AsyncStorage.getItem('medicines');
        if (storedMedicines !== null) {
          setMedicines(JSON.parse(storedMedicines));
        } else {
          const initialMedicines = [
            {
              id: '1',
              name: 'Aspirin',
              type: 'Tablet',
              expirationDate: '2025-12-01',
              amount: 100,
              price: 10,
              image: require('../../assets/medicine.jpg'),
            },
            {
              id: '2',
              name: 'Ibuprofen',
              type: 'Capsule',
              expirationDate: '2024-11-15',
              amount: 50,
              price: 15,
              image: require('../../assets/medicine.jpg'),
            },
            {
              id: '3',
              name: 'Paracetamol',
              type: 'Syrup',
              expirationDate: '2023-10-30',
              amount: 200,
              price: 8,
              image: require('../../assets/medicine.jpg'),
            },
          ];
          setMedicines(initialMedicines);
          await AsyncStorage.setItem('medicines', JSON.stringify(initialMedicines));
        }
      } catch (error) {
        console.log('Failed to load medicines from storage:', error);
      }
    };
    loadMedicines();
  }, []);

  const addMedicine = async (newMedicine) => {
    const updatedMedicines = [
      ...medicines,
      { ...newMedicine, id: (medicines.length + 1).toString() },
    ];
    setMedicines(updatedMedicines);
    try {
      await AsyncStorage.setItem('medicines', JSON.stringify(updatedMedicines));
      Alert.alert('Success', 'Medicine added successfully!');
    } catch (error) {
      console.log('Failed to save medicines:', error);
      Alert.alert('Error', 'Failed to add medicine.');
    }
  };

  const editMedicine = async (id, updatedMedicine) => {
    const updatedMedicines = medicines.map((med) =>
      med.id === id ? { ...med, ...updatedMedicine } : med
    );
    setMedicines(updatedMedicines);
    try {
      await AsyncStorage.setItem('medicines', JSON.stringify(updatedMedicines));
      Alert.alert('Success', 'Medicine updated successfully!');
    } catch (error) {
      console.log('Failed to save medicines:', error);
      Alert.alert('Error', 'Failed to update medicine.');
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, editMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
};
