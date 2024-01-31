import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from './views';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStackScreen" component={Home} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Ínicio':
            iconName = focused ? 'home' : 'home';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          case 'Cadastro':
            // Não renderiza o ícone para 'Cadastro'
            return null;
          case 'Tarefas':
            iconName = focused ? 'check' : 'check-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          case 'HelpGpt':
            iconName = focused ?  'chat-question' : 'chat';
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
    <Tab.Screen name="Ínicio" component={HomeStack} />
    <Tab.Screen name="Tarefas" component={Home} />
    <Tab.Screen name="HelpGpt" component={Home} />
    <Tab.Screen name="Materias" component={Home} />
    <Tab.Screen name="Menu" component={Home} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false } } />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}