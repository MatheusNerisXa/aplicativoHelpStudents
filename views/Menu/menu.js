// Menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remover os dados de login do AsyncStorage
      await AsyncStorage.removeItem('userData');
      // Navegar de volta para a tela de login
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const menuItems = [
    { icon: 'book-open-variant', text: 'Matérias', color: '#3498db' },
    { icon: 'format-list-bulleted', text: 'Tarefas', color: '#e74c3c' },
    { icon: 'help-network', text: 'Ajuda', color: '#2ecc71' },
    { icon: 'logout', text: 'Sair', color: '#9b59b6' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {menuItems.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, styles.halfWidth, { backgroundColor: item.color }]}
            onPress={() => (item.text !== 'Sair' ? navigation.navigate(item.text) : handleLogout())}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {menuItems.slice(2).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, styles.halfWidth, { backgroundColor: item.color }]}
            onPress={() => (item.text !== 'Sair' ? navigation.navigate(item.text) : handleLogout())}
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
  },
  halfWidth: {
    width: '50%',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
});

export default Menu;
