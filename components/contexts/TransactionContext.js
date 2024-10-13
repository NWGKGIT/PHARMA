import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions !== null) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.log('Failed to load transactions from storage:', error);
      }
    };
    loadTransactions();
  }, []);

  const addTransaction = async (newTransaction) => {
    const updatedTransactions = [
      ...transactions,
      { ...newTransaction, id: (transactions.length + 1).toString(), date: new Date().toISOString() },
    ];
    setTransactions(updatedTransactions);
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      Alert.alert('Success', 'Transaction recorded successfully!');
    } catch (error) {
      console.log('Failed to save transactions:', error);
      Alert.alert('Error', 'Failed to record transaction.');
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
 