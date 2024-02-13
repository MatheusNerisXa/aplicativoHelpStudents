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
import NewsDetails from './views/News/NewsDetails';
import ChatScreen from './views/helpgpt/chat';

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

const TabNavigator = ({ route, navigation }) => {
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
              return <MaterialIcons name={iconName} size={size} color={focused ? '#253494' : color} />;
            case 'Cadastro':
              return null;
            case 'Tarefas':
              iconName = focused ? 'check' : 'check-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#253494' : color} />;
            case 'HelpGpt':
              iconName = focused ? 'chat-question' : 'chat';
              return <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#253494' : color} />;
            case 'Materias':
              iconName = focused ? 'book-open' : 'book-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#253494' : color} />;
            case 'Menu':
              iconName = focused ? 'clipboard-list' : 'clipboard-minus';
              return <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#253494' : color} />;
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
        component={ChatScreen}
        options={{
          headerShown: route.state && route.state.index > 0 ? false : true,
          headerStyle: { backgroundColor: '#253494' },
          headerTintColor: 'white',
          title: 'HelpGpt',
        }}
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
      <Tab.Screen
      name="Notícias"
      component={NewsScreen}
      options={{
        tabBarVisible: false, // Oculta a opção "Notícias" na barra de navegação inferior
        headerShown: route.state && route.state.index > 0 ? false : true,
        headerStyle: { backgroundColor: '#253494' },
        headerTintColor: 'white',
        tabBarLabel: '', // Remove o título da guia
        tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
      }}
    />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Cadastro" component={Cadastro} screenOptions={{ headerShown: true }} />
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
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Detalhes da Notícia',
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={onPress}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
