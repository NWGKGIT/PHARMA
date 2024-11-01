import * as SQLite from 'expo-sqlite/legacy';

let db;

// Function to initialize the SQLite database
export const initializeDatabase = async () => {
  db = SQLite.openDatabase('pharma_inventory.db');
  await createMedicinesTable();
  await createTransactionsTable();
};

// Function to create the `medicines` table
const createMedicinesTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS medicines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          amount INTEGER,
          priceBuy REAL,
          priceSell REAL,
          expirationDate TEXT,
          image TEXT
        );`,
        [],
        resolve,
        (txObj, error) => reject(error)
      );
    });
  });
};

// Function to create the `transactions` table
const createTransactionsTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          items TEXT,
          total REAL,
          date TEXT
        );`,
        [],
        resolve,
        (txObj, error) => reject(error)
      );
    });
  });
};

// Function to insert a new medicine into the `medicines` table
export const insertMedicine = (medicine, callback) => {
  if (!db) {
    console.error('Database not initialized');
    return;
  }

  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO medicines (name, type, amount, priceBuy, priceSell, expirationDate, image) VALUES (?, ?, ?, ?, ?, ?,?)`,
      [medicine.name, medicine.type, medicine.amount, medicine.priceBuy,medicine.priceSell, medicine.expirationDate, medicine.image],
      (txObj, result) => callback(result.insertId),
      (txObj, error) => console.error('Error adding medicine:', error)
    );
  });
};

// Function to update a medicine
export const updateMedicine = (id, updatedMedicine, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE medicines SET name = ?, type = ?, amount = ?, priceBuy = ?, priceSell = ?, expirationDate = ?, image = ? WHERE id = ?`,
      [updatedMedicine.name, updatedMedicine.type, updatedMedicine.amount, updatedMedicine.priceBuy,updatedMedicine.priceSell, updatedMedicine.expirationDate, updatedMedicine.image, id],
      (txObj) => callback(),
      (txObj, error) => console.error('Error updating medicine:', error)
    );
  });
};

// Function to update medicine amount
export const updateMedicineAmount = (id, newAmount, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE medicines SET amount = ? WHERE id = ?',
      [newAmount, id],
      (txObj) => callback(),
      (txObj, error) => console.error('Error updating medicine amount:', error)
    );
  });
};

// Function to delete a medicine
export const deleteMedicine = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM medicines WHERE id = ?`,
      [id],
      (txObj) => callback(),
      (txObj, error) => console.error('Error deleting medicine:', error)
    );
  });
};

// Function to fetch all medicines
export const fetchMedicines = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM medicines`,
      [],
      (txObj, { rows: { _array } }) => callback(_array),
      (txObj, error) => console.error('Error fetching medicines:', error)
    );
  });
};

// Export the db object for custom queries if needed
export const getDatabase = () => db;

// Initialize the database when your app starts
initializeDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch((error) => console.error('Error initializing database:', error));
