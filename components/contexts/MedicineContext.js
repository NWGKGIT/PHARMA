import React, { createContext, useState, useEffect } from 'react';
import { fetchMedicines, insertMedicine, updateMedicine, deleteMedicine, updateMedicineAmount as dbUpdateMedicineAmount } from '../../database/database';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicinesFromDB();
  }, []);

  const fetchMedicinesFromDB = () => {
    fetchMedicines(setMedicines);
  };

  const addMedicine = (medicine) => {
    insertMedicine(medicine, (id) => {
      setMedicines((prev) => [...prev, { id, ...medicine }]);
    });
  };

  const editMedicine = (id, updatedMedicine) => {
    updateMedicine(id, updatedMedicine, () => {
      setMedicines((prev) =>
        prev.map(med => (med.id === id ? { ...med, ...updatedMedicine } : med))
      );
    });
  };

  const updateMedicineAmount = (id, newAmount) => {
    dbUpdateMedicineAmount(id, newAmount, () => {
      setMedicines(prev =>
        prev.map(med => (med.id === id ? { ...med, amount: newAmount } : med))
      );
    });
  };

  const removeMedicine = (id) => {
    deleteMedicine(id, () => {
      setMedicines(prev => prev.filter(med => med.id !== id));
    });
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, editMedicine, removeMedicine, updateMedicineAmount }}>
      {children}
    </MedicineContext.Provider>
  );
};
