import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = () => {
  const navigation = useNavigation();

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
        {menuItems.slice(2, 4).map((item, index) => (
          <TouchableOpacity
            key={index + 2}
            style={[styles.menuItem, styles.halfWidth, { backgroundColor: item.color }]}
            onPress={() => (item.text !== 'Sair' ? navigation.navigate(item.text) : handleLogout())}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidth, { backgroundColor: menuItems[4].color }]}
          onPress={() => (menuItems[4].text !== 'Sair' ? navigation.navigate(menuItems[4].text) : handleLogout())}
        >
          <MaterialCommunityIcons name={menuItems[4].icon} size={24} color="#fff" />
          <Text style={styles.menuText}>{menuItems[4].text}</Text>
        </TouchableOpacity>
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
    width: '49%',  // Ajustando o tamanho para evitar quebras de linha
  },
  fullWidth: {
    width: '100%',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
});

export default Menu;
