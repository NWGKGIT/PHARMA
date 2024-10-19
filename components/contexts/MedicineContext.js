import React, { createContext, useState, useEffect } from 'react';
import { initializeDatabase, getDatabase } from '../../database/database'; // Ensure the path is correct
import LoadingComponent from '../LoadingComponent'; // Ensure the path is correct

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [isDbReady, setIsDbReady] = useState(false);

  // Load medicines from database
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        await initializeDatabase(); // Initialize the database
        const db = getDatabase(); // Get the database instance

        if (!db) {
          console.error('Database not initialized');
          return;
        }

        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM medicines;',
            [],
            (txObj, resultSet) => {
              setMedicines(resultSet.rows._array);
              setIsDbReady(true); // Set flag indicating the DB is ready
            },
            (txObj, error) => {
              console.log('Error fetching medicines: ', error);
              setIsDbReady(true); // Set to true even on error to prevent infinite loading
            }
          );
        });
      } catch (error) {
        console.error('Error loading medicines: ', error);
        setIsDbReady(true); // Set to true to prevent infinite loading
      }
    };

    loadMedicines();
  }, []);

  // Add new medicine to database
  const addMedicine = async (newMedicine) => {
    const db = getDatabase(); // Get the database instance

    if (!db) {
      console.error('Database not initialized');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO medicines (name, type, amount, price, expirationDate, image) VALUES (?, ?, ?, ?, ?, ?);',
        [newMedicine.name, newMedicine.type, newMedicine.amount, newMedicine.price, newMedicine.expirationDate, newMedicine.image],
        (txObj, resultSet) => {
          setMedicines((prevMedicines) => [
            ...prevMedicines,
            { id: resultSet.insertId, ...newMedicine },
          ]);
        },
        (txObj, error) => console.log('Error adding medicine: ', error)
      );
    });
  };

  // Edit existing medicine in the database
  const editMedicine = (id, updatedMedicine) => {
    const db = getDatabase(); // Get the database instance

    if (!db) {
      console.error('Database not initialized');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE medicines SET name = ?, type = ?, amount = ?, price = ?, expirationDate = ?, image = ? WHERE id = ?;',
        [
          updatedMedicine.name,
          updatedMedicine.type,
          updatedMedicine.amount,
          updatedMedicine.price,
          updatedMedicine.expirationDate,
          updatedMedicine.image,
          id,
        ],
        (txObj, resultSet) => {
          setMedicines((prevMedicines) =>
            prevMedicines.map((medicine) =>
              medicine.id === id ? { ...medicine, ...updatedMedicine } : medicine
            )
          );
        },
        (txObj, error) => console.log('Error updating medicine: ', error)
      );
    });
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, editMedicine }}>
      {isDbReady ? children : <LoadingComponent />} 
    </MedicineContext.Provider>
  );
};
