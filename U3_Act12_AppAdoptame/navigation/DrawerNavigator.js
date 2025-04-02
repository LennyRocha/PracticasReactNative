import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import PetStack from './PetStack';
import FavoritesStack from './FavoritesStack';
import AdminStack from './AdminStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: theme.drawerBack },
        drawerActiveTintColor: theme.selections,
        drawerInactiveTintColor: theme.textColor,
        headerShown: false,
      }}
    >
      {user?.role === 'admin' ? (
        <>
          <Drawer.Screen name="AdminStack" component={AdminStack} options={{ title: 'Administración' }} />
        </>
      ) : (
        <>
          <Drawer.Screen name="PetStack" component={PetStack} options={{ title: 'Mascotas' }} />
          <Drawer.Screen name="FavoritesStack" component={FavoritesStack} options={{ title: 'Favoritos' }} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;