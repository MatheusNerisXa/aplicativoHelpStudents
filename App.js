import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from './views';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#2c3e50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Ínicio"
          component={Home}
          options={{
            headerLeft: null,
            gestureEnabled: false, // Disable swipe gesture
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
