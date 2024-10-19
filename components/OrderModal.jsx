import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { TransactionContext } from './contexts/TransactionContext';
import { MedicineContext } from './contexts/MedicineContext'; // Import MedicineContext
import closeIcon from '../assets/close.png'; 

const { width, height } = Dimensions.get('window');

const OrderModal = ({ visible, onClose, selectedMedicines }) => {
  const { addTransaction } = useContext(TransactionContext);
  const { updateMedicineAmount } = useContext(MedicineContext); // Use MedicineContext for updating amounts
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const totalPrice = selectedMedicines.reduce((total, med) => {
    return total + med.price * med.selectedAmount;
  }, 0);

  const handleOrder = () => {
    if (selectedMedicines.length === 0) {
      Alert.alert('No Selection', 'No medicines selected for order.');
      return;
    }
    setConfirmationVisible(true);
  };

  const handleConfirm = () => {
    const newTransaction = {
      items: selectedMedicines,
      total: totalPrice,
      date: new Date().toISOString(),
    };

    // Update the medicine amounts in the database
    selectedMedicines.forEach((medicine) => {
      const newAmount = medicine.amount - medicine.selectedAmount;
      if (newAmount >= 0) {
        updateMedicineAmount(medicine.id, newAmount);
      } else {
        Alert.alert('Error', `Not enough stock for ${medicine.name}.`);
      }
    });

    addTransaction(newTransaction);
    setConfirmationVisible(false);
    onClose();
    Alert.alert('Success', 'Your order has been placed!');
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedMedicines}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.medicineItem}>
                <Text style={styles.medicineName}>{item.name} x{item.selectedAmount}</Text>
                <Text style={styles.medicinePrice}>${(item.price * item.selectedAmount).toFixed(2)}</Text>
              </View>
            )}
            contentContainerStyle={styles.medicineList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No medicines selected.</Text>
            }
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationVisible}
        onRequestClose={() => {
          setConfirmationVisible(false);
        }}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationContent}>
            <Text style={styles.confirmationText}>
              Are you sure you want to place the order?
            </Text>

            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    maxHeight: height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  medicineList: {
    marginTop: 20,
  },
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  medicineName: {
    fontSize: 16,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContent: {
    width: width * 0.75,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  yesButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 10,
  },
  noButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderModal;
