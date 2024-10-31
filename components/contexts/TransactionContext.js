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
          // Parse and reverse to show newest transactions first
          setTransactions(JSON.parse(storedTransactions).reverse());
        }
      } catch (error) {
        console.log('Failed to load transactions from storage:', error);
      }
    };
    loadTransactions();
  }, []);

  const addTransaction = async (newTransaction) => {
    const updatedTransactions = [
      { ...newTransaction, id: (transactions.length + 1).toString(), date: new Date().toISOString() },
      ...transactions, // Add new transaction at the start of the list
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

  const deleteTransaction = async (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      Alert.alert('Success', 'Transaction deleted successfully!');
    } catch (error) {
      console.log('Failed to save transactions:', error);
      Alert.alert('Error', 'Failed to delete transaction.');
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
