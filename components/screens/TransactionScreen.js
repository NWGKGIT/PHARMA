// components/screens/TransactionScreen.js

import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { TransactionContext } from '../contexts/TransactionContext';
import TransactionCard from '../TransactionCard';

const TransactionScreen = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions found.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontSize: 16,
  },
});

export default TransactionScreen;
