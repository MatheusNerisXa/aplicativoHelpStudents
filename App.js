import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from './views';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './views/Menu/menu';
import NewsScreen from './views/News/news';

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

const TabNavigator = ({ route }) => {
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
      <Tab.Screen
        name="Ínicio"
        component={HomeStack}
        options={{
          headerShown: route.state && route.state.index > 0 ? false : true,
          headerStyle: { backgroundColor: '#253494' },
          headerTintColor: 'white',
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Tarefas"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="HelpGpt"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Materias"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: route.state && route.state.index > 0 ? false : true,
          headerStyle: { backgroundColor: '#253494' },
          headerTintColor: 'white',
          title: 'Menu',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Notícias',
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
