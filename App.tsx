import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';// screens list
import HomePage from './screens/home';
import Mainmenu from './screens/menu';
import addmeal from './screens/add meal';


const Stack = createNativeStackNavigator();// navigation menu

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomePage} options={{ title: 'Home' }}/>
        <Stack.Screen name="Mainmenu" component={Mainmenu} options={{ title: 'Mainmenu' }} />
        <Stack.Screen name="addmeal" component={addmeal} options={{ title: 'addmeal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}