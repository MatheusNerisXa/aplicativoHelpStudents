import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from './views';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomeStackScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="HomeStackScreen"
      component={Home}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarLabel: ({ focused, color }) => {
        let labelStyle = { color: focused ? '#253494' : 'black' };
        return <Text style={labelStyle}>{route.name}</Text>;
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Ínicio':
            iconName = focused ? 'home' : 'home';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          case 'Cadastro':
            return null;
          case 'Tarefas':
            iconName = focused ? 'check' : 'check-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          case 'HelpGpt':
            iconName = focused ? 'chat-question' : 'chat';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          case 'Materias':
            iconName = focused ? 'book-open' : 'book-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          case 'Menu':
            iconName = focused ? 'clipboard-list' : 'clipboard-minus';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen name="Ínicio" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Tarefas" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="HelpGpt" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="Materias" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="Menu" component={Home} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    checkPreviousLogin();
  }, []);

  const checkPreviousLogin = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking previous login:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            headerTitle: 'Home',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            headerTitle: 'Cadastro',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
