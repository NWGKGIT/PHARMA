// components/screens/HomeScreen.js

import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { MedicineContext } from '../contexts/MedicineContext';
import MedicineCard from '../MedicineCard';
import OrderModal from '../OrderModal';

const HomeScreen = () => {
  const { medicines } = useContext(MedicineContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  // State to manage selected medicines and their amounts
  const [selectedMedicines, setSelectedMedicines] = useState({});

  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMedicines(medicines);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = medicines.filter((med) =>
        med.name.toLowerCase().includes(query)
      );
      setFilteredMedicines(filtered);
    }
  }, [searchQuery, medicines]);

  const handleSelectMedicine = (id, isSelected) => {
    if (isSelected) {
      setSelectedMedicines((prev) => ({
        ...prev,
        [id]: 1, // Initialize amount to 1
      }));
    } else {
      setSelectedMedicines((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleIncreaseAmount = (id) => {
    setSelectedMedicines((prev) => {
      const currentAmount = prev[id] || 0;
      const medicine = medicines.find((med) => med.id === id);
      if (currentAmount < medicine.amount) {
        return {
          ...prev,
          [id]: currentAmount + 1,
        };
      } else {
        Alert.alert('Limit Reached', `Cannot exceed ${medicine.amount} units.`);
        return prev;
      }
    });
  };

  const handleDecreaseAmount = (id) => {
    setSelectedMedicines((prev) => {
      const currentAmount = prev[id] || 0;
      if (currentAmount > 1) {
        return {
          ...prev,
          [id]: currentAmount - 1,
        };
      } else if (currentAmount === 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return prev;
    });
  };

  const sortedMedicines = () => {
    const selected = filteredMedicines.filter((med) =>
      selectedMedicines.hasOwnProperty(med.id)
    );
    const unselected = filteredMedicines.filter(
      (med) => !selectedMedicines.hasOwnProperty(med.id)
    );
    return [...selected, ...unselected];
  };

  const selectedMedicineDetails = medicines
    .filter((med) => selectedMedicines.hasOwnProperty(med.id))
    .map((med) => ({
      ...med,
      selectedAmount: selectedMedicines[med.id],
    }));

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search medicines..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Medicine List */}
      <FlatList
  data={sortedMedicines()}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <MedicineCard
      medicine={item}
      isSelected={selectedMedicines.hasOwnProperty(item.id)}
      amount={selectedMedicines[item.id] || 0}
      onSelect={handleSelectMedicine}
      onIncrease={() => handleIncreaseAmount(item.id)}
      onDecrease={() => handleDecreaseAmount(item.id)}
    />
  )}
  contentContainerStyle={styles.list}
/>


      {/* Order Button */}
      <TouchableOpacity
        style={[
          styles.orderButton,
          Object.keys(selectedMedicines).length === 0 && styles.orderButtonDisabled,
        ]}
        onPress={() => setIsOrderModalVisible(true)}
        disabled={Object.keys(selectedMedicines).length === 0}
      >
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>

      {/* Order Modal */}
      <OrderModal
        visible={isOrderModalVisible}
        onClose={() => setIsOrderModalVisible(false)}
        selectedMedicines={selectedMedicineDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 70,
    borderColor: '#ddd',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 80, // To ensure the order button doesn't overlap
  },
  orderButton: {
    position: 'absolute',
    bottom: 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  }, 
  orderButtonDisabled: {
    backgroundColor: '#a9a9a9',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
