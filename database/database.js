import * as SQLite from 'expo-sqlite';

let db;

// Function to initialize the SQLite database asynchronously
export const initializeDatabase = async () => {
  db = await SQLite.openDatabaseAsync('pharma_inventory.db');
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
          price REAL,
          expirationDate TEXT,
          image TEXT
        )`,
        [],
        () => {
          console.log('Medicines table created successfully');
          resolve();
        },
        (txObj, error) => {
          console.log('Error creating medicines table:', error);
          reject(error);
        }
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
        )`,
        [],
        () => {
          console.log('Transactions table created successfully');
          resolve();
        },
        (txObj, error) => {
          console.log('Error creating transactions table:', error);
          reject(error);
        }
      );
    });
  });
};

// Function to insert a new medicine into the `medicines` table
export const insertMedicine = (name, type, amount, price, expirationDate, image) => {
  if (!db) {
    console.error('Database not initialized');
    return;
  }

  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO medicines (name, type, amount, price, expirationDate, image) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, type, amount, price, expirationDate, image],
      (txObj, result) => console.log('Medicine added successfully', result),
      (txObj, error) => console.log('Error adding medicine:', error)
    );
  });
};

export const updateMedicineAmount = (id, newAmount) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE medicines SET amount=? WHERE id=?`,
      [newAmount, id],
      (txObj, result) => console.log(`Medicine with id ${id} updated successfully`),
      (txObj, error) => console.log('Error updating medicine amount:', error)
    );
  });
};

// Function to insert a new transaction into the `transactions` table
export const insertTransaction = (items, total, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO transactions (items, total, date) VALUES (?, ?, ?)`,
      [JSON.stringify(items), total, date],
      (txObj, result) => console.log('Transaction added successfully', result),
      (txObj, error) => console.log('Error adding transaction:', error)
    );
  });
};

// Function to fetch all medicines from the `medicines` table
export const fetchMedicines = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM medicines`,
      [],
      (txObj, { rows: { _array } }) => {
        callback(_array);
      },
      (txObj, error) => {
        console.log('Error fetching medicines:', error);
      }
    );
  });
};

// Function to fetch all transactions from the `transactions` table
export const fetchTransactions = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM transactions`,
      [],
      (txObj, { rows: { _array } }) => {
        callback(_array);
      },
      (txObj, error) => {
        console.log('Error fetching transactions:', error);
      }
    );
  });
};
// Call initializeDatabase when your app starts
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });

// Export the db object for further custom queries if needed
export const getDatabase = () => db;
