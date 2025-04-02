import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/adoptante/FavoritesScreen';
import PetDetailScreen from '../screens/adoptante/PetDetailScreen';
import CustomAppBar from '../components/CustomAppBar';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar 
            navigation={navigation} 
            title={route.name} 
            isRoot={route.name === "Favorites"}
          />
        ),
      })}
    >
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="PetDetail" component={PetDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;