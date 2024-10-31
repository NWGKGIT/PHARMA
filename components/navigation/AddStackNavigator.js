// components/navigation/AddStackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from '../screens/AddScreen';
import EditSearch from '../EditSearch';
import NewMedicineForm from '../NewMedicineForm';
import EditMedicineForm from '../EditMedicineForm'; 
import DeleteMedicineScreen from '../screens/DeleteMedicineScreen';

const Stack = createStackNavigator();

const AddStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AddMain">
      <Stack.Screen
        name="AddMain"
        component={AddScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditSearch"
        component={EditSearch}
        options={{ title: 'Add Existing Medicine' }}
      />
      <Stack.Screen
        name="NewMedicineForm"
        component={NewMedicineForm}
        options={{ title: 'New Medicine Form' }}
      />
      <Stack.Screen
        name="EditMedicineForm"
        component={EditMedicineForm}
        options={{ title: 'Edit Medicine' }}
      />
      <Stack.Screen
        name="DeleteMedicineForm"
        component={DeleteMedicineScreen}
        options={{ title: 'Delete Medicine' }}
      />
    </Stack.Navigator>
  );
};

export default AddStackNavigator;
