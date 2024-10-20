import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('pharma_inventory.db');

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    createTable();
    fetchMedicines();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS medicines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          expirationDate TEXT,
          amount INTEGER,
          price REAL,
          image TEXT
        );`
      );
    });
  };

  const fetchMedicines = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM medicines',
        [],
        (_, { rows }) => setMedicines(rows._array),
        (_, error) => console.error(error)
      );
    });
  };

  const addMedicine = (medicine) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO medicines (name, type, expirationDate, amount, price, image) VALUES (?, ?, ?, ?, ?, ?)',
        [medicine.name, medicine.type, medicine.expirationDate, medicine.amount, medicine.price, medicine.image],
        (_, result) => {
          setMedicines((prev) => [...prev, { id: result.insertId, ...medicine }]);
        },
        (_, error) => console.error(error)
      );
    });
  };

  const editMedicine = (id, updatedMedicine) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE medicines SET name = ?, type = ?, expirationDate = ?, amount = ?, price = ?, image = ? WHERE id = ?',
        [updatedMedicine.name, updatedMedicine.type, updatedMedicine.expirationDate, updatedMedicine.amount, updatedMedicine.price, updatedMedicine.image, id],
        (_, result) => {
          setMedicines(prev => 
            prev.map(med => (med.id === id ? { ...med, ...updatedMedicine } : med))
          );
        },
        (_, error) => console.error(error)
      );
    });
  };

  const deleteMedicine = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM medicines WHERE id = ?',
        [id],
        () => {
          setMedicines(prev => prev.filter(med => med.id !== id));
        },
        (_, error) => console.error(error)
      );
    });
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, editMedicine, deleteMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
};
