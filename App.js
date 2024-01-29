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
              backgroundColor: '#253494', // Cor do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto no cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
