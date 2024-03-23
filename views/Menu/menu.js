import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = () => {
  const navigation = useNavigation();

  const handleMenuItemPress = (menuItem) => {
    if (menuItem === 'Sair') {
      handleLogout();
    } else if (menuItem === 'Vídeos') {
      navigation.navigate('VideoScreen');
    } else if (menuItem === 'Notícias') {
      navigation.navigate('Notícias');
    } else if (menuItem === 'Vestibulares') {
      navigation.navigate('EntranceExamScreen');
    } else if (menuItem === 'Matérias') {
      navigation.navigate('SubjectsScreen');
    } else if (menuItem === 'Estudo') {
      navigation.navigate('StopwatchScreen');
    } else if (menuItem === 'Ajuda') {
      navigation.navigate('HelpScreen');
    } else if (menuItem === 'Calculadora Científica') {
      // Adicione aqui a navegação para a tela da Calculadora Científica
    } else if (menuItem === 'Correção de Textos') {
      // Adicione aqui a navegação para a tela de Correção de Textos
    } else {
      navigation.navigate(menuItem);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              navigation.replace('Login');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    { icon: 'book-open-variant', text: 'Matérias', color: '#3498db' },
    { icon: 'format-list-bulleted', text: 'Tarefas', color: '#e74c3c' },
    { icon: 'help-network', text: 'Ajuda', color: '#2ecc71' },
    { icon: 'newspaper', text: 'Notícias', color: '#27ae60' },
    { icon: 'video', text: 'Vídeos', color: '#f39c12' },
    { icon: 'account-convert', text: 'Vestibulares', color: '#9b59b6' },
    { icon: 'timer', text: 'Estudo', color: '#8e44ad' },
    { icon: 'briefcase', text: 'Vagas de Emprego', color: '#d35400' },
    { icon: 'file-document', text: 'Arquivos', color: '#34495e' },
    { icon: 'calculator-variant', text: 'Calc. Científica', color: '#1abc9c' },
    { icon: 'book', text: 'Correção de Textos', color: '#e67e22' },
    { icon: 'logout', text: 'Sair', color: 'red' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.menuItem, { backgroundColor: item.color }]}
          onPress={() => handleMenuItemPress(item.text)}
        >
          <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
          <Text style={styles.menuText}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
});

export default Menu;
