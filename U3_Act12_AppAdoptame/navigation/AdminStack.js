import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminPetListScreen from '../screens/admin/AdminPetListScreen';
import AdminPetEditScreen from '../screens/admin/AdminPetEditScreen';
import CustomAppBar from '../components/CustomAppBar';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar 
            navigation={navigation} 
            title={route.name === 'AdminPetList' ? 'Administración' : route.params?.pet ? 'Editar Mascota' : 'Nueva Mascota'}
            isRoot={route.name === 'AdminPetList'}
          />
        ),
      })}
    >
      <Stack.Screen name="AdminPetList" component={AdminPetListScreen} />
      <Stack.Screen name="AdminPetEdit" component={AdminPetEditScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;