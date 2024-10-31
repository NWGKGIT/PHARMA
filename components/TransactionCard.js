import React from 'react';
import { View, Text, StyleSheet,  FlatList,
} from 'react-native';

const TransactionCard = ({ transaction }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(transaction.date).toLocaleString()}</Text>
      <FlatList
        data={transaction.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name} x{item.selectedAmount}</Text>
            <Text style={styles.itemPrice}>${(item.priceSell * item.selectedAmount).toFixed(2)}</Text>
          </View>
        )}
      />
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${transaction.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 1.41, 
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default TransactionCard;
