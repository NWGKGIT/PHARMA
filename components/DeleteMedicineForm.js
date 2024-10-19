import React, { useContext, useState } from 'react';
import { View, Button } from 'react-native';
import { MedicineContext } from './contexts/MedicineContext';
import DeleteModal from './DeleteModal';

const DeleteMedicineForm = ({ medicineId }) => {
  const { deleteMedicine } = useContext(MedicineContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteMedicine(medicineId);
    setModalVisible(false);
  };

  return (
    <View>
      <Button title="Delete Medicine" onPress={() => setModalVisible(true)} />
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default DeleteMedicineForm;
