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
      navigation.navigate('NewsScreen');
    } else if (menuItem === 'Vestibulares') {
      navigation.navigate('EntranceExamScreen');
    } 
    else {
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
              // Remover os dados de login do AsyncStorage
              await AsyncStorage.removeItem('userData');
              // Navegar de volta para a tela de login
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
    { icon: 'account-convert', text: 'Vestibulares', color: '#9b59b6' }, // Adicionando o item "Vestibulares"
    { icon: 'file-document', text: 'Arquivos', color: '#34495e' }, // Adicionando o item "Arquivos"
    { icon: 'logout', text: 'Sair', color: '#9b59b6' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {menuItems.slice(0, 2).map((item, index) => (
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
      <View style={styles.row}>
        {menuItems.slice(2, 4).map((item, index) => (
          <TouchableOpacity
            key={index + 2}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => handleMenuItemPress(item.text)}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {menuItems.slice(4, 6).map((item, index) => (
          <TouchableOpacity
            key={index + 4}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => handleMenuItemPress(item.text)}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {menuItems.slice(6, 8).map((item, index) => (
          <TouchableOpacity
            key={index + 6}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => handleMenuItemPress(item.text)}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
    margin: 4,
    width: '48%', // Ajustando o tamanho para permitir espaço entre os itens
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
});

export default Menu;
