import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/navigation/BottomTabNavigator';
import { MedicineProvider } from './components/contexts/MedicineContext';
import { TransactionProvider } from './components/contexts/TransactionContext';

const App = () => {
  return (
    <MedicineProvider>
      <TransactionProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </TransactionProvider>
    </MedicineProvider>
  );
};

export default App;
