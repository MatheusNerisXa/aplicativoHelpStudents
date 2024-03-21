import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from './views';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './views/Menu/menu';
import NewsScreen from './views/News/news';
import NewsDetails from './views/News/NewsDetails';
import ChatScreen from './views/helpgpt/chat';
import VideoScreen from './views/videos/videos';
import EntranceExamScreen from './views/EntranceExam/Entrance_exam';
import EntranceExamDetailScreen from './views/EntranceExam/EntranceExamDetailScreen';
import SubjectsScreen from './views/Subjects/subject';
import SubjectDetailsScreen from './views/Subjects/SubjectDetailsScreen';
import CreateSubjectScreen from './views/Subjects/createSubject';
import StopwatchScreen from './views/Stopwatches/stopwatches';
import HistoryScreen from './views/Stopwatches/history';

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

  const handleGoBackToMenu = () => {
    navigation.navigate('Menu');
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
        component={SubjectsScreen}
        options={{
          headerShown: route.state && route.state.index > 0 ? false : true,
          headerStyle: { backgroundColor: '#253494' },
          headerTintColor: 'white',
          title: 'Matérias',
        }}
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
    options={({ navigation }) => ({
    headerShown: true,
    headerStyle: { backgroundColor: '#253494' },
    headerTintColor: 'white',
    title: 'Notícias',
    gestureEnabled: true, // Habilita o gesto de deslizar
    gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => navigation.navigate('Menu')} // Navegação de volta para o menu
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
    tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
  })}
/>

<Tab.Screen
  name="Detalhes da Notícia"
  component={NewsDetails}
  options={({ navigation }) => ({
    headerShown: true,
    headerStyle: { backgroundColor: '#253494' },
    headerTintColor: 'white',
    title: 'Detalhes da Notícia',
    gestureEnabled: true, // Habilita o gesto de deslizar
    gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => navigation.navigate('Notícias')} // Navegação de volta para o menu
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
    tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
  })}
/>

  <Tab.Screen
      name="VideoScreen"
      component={VideoScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Vídeos',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('Menu')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
  />

<Tab.Screen
      name="SubjectsScreen"
      component={SubjectsScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Matérias',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('Menu')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
  />

<Tab.Screen
      name="StopwatchScreen"
      component={StopwatchScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Estudar',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('Menu')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
  />

<Tab.Screen
      name="HistoryScreen"
      component={HistoryScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Historico de estudos',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('StopwatchScreen')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
  />



<Tab.Screen
      name="CreateSubjectScreen"
      component={CreateSubjectScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Cadastrar matéria',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('SubjectsScreen')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
  />



<Tab.Screen
      name="SubjectDetailsScreen"
      component={SubjectDetailsScreen}
      options={({ navigation }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#253494' },
      headerTintColor: 'white',
      title: 'Detalhes da matéria',
      gestureEnabled: true, // Habilita o gesto de deslizar
      gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('SubjectsScreen')} // Navegação de volta para o menu
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
    })}
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
        
        <Tab.Screen
    name="VideoScreen"
    component={VideoScreen}
    options={({ navigation }) => ({
    headerShown: true,
    headerStyle: { backgroundColor: '#253494' },
    headerTintColor: 'white',
    title: 'Vídeos',
    gestureEnabled: true, // Habilita o gesto de deslizar
    gestureDirection: 'horizontal', // Define a direção do gesto como horizontal
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => navigation.navigate('Menu')} // Navegação de volta para o menu
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
    tabBarItemStyle: { display: 'none' }, // Remove completamente a guia e o espaço ocupado
  })}
/>

<Stack.Screen
          name="SubjectsScreen"
          component={SubjectsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Matérias',
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
          name="SubjectDetailsScreen"
          component={SubjectDetailsScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Detalhes da matéria',
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

<Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Histórico de estudos',
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

<Stack.Screen
          name="CreateSubjectScreen"
          component={CreateSubjectScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Cadastrar matéria',
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

          <Stack.Screen
          name="Notícias"
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
          name="Detalhes da Notícia"
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
        <Stack.Screen
          name="StopwatchScreen"
          component={StopwatchScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Estudar',
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
         <Stack.Screen
          name="EntranceExamScreen"
          component={EntranceExamScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Vestibulares',
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
        <Stack.Screen
          name="EntranceExamDetailScreen"
          component={EntranceExamDetailScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#253494' },
            headerTintColor: 'white',
            title: 'Detalhes do vestibular',
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
