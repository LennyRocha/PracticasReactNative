import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PetListScreen from '../screens/adoptante/PetListScreen';
import PetDetailScreen from '../screens/adoptante/PetDetailScreen';
import CustomAppBar from '../components/CustomAppBar';

const Stack = createStackNavigator();

const PetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar 
            navigation={navigation} 
            title={route.name} 
            isRoot={route.name === "PetList"}
          />
        ),
      })}
    >
      <Stack.Screen name="PetList" component={PetListScreen} />
      <Stack.Screen name="PetDetail" component={PetDetailScreen} />
    </Stack.Navigator>
  );
};

export default PetStack;