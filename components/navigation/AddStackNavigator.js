import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from '../screens/AddScreen';
import AddNewMedicineForm from '../AddNewMedicineForm';
import NewMedicineForm from '../NewMedicineForm';
import EditMedicineForm from '../EditMedicineForm'; 

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
        name="AddNewMedicineForm"
        component={AddNewMedicineForm}
        options={{ title: 'Add New Medicine' }}
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
    </Stack.Navigator>
  );
};

export default AddStackNavigator;
