import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config.json';
import { Ionicons } from '@expo/vector-icons';
import { historyStyles } from './css/historyStyles';

const HistoryScreen = () => {
  const [stopwatches, setStopwatches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]); // Armazena os dados originais

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const { email } = userData || {};
        if (email) {
          const response = await fetch(`${config.urlRootNode}getUserId?email=${email}`);
          const data = await response.json();
          console.log('ID do usuário:', data.userId);
          setUserId(data.userId);
          fetchStopwatches(data.userId);
        } else {
          console.error('Email não encontrado nos dados do usuário');
        }
      } else {
        console.error('Dados do usuário não encontrados');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const fetchStopwatches = async (userId) => {
    try {
      const response = await fetch(`${config.urlRootNode}stopwatches/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStopwatches(data);
        setOriginalData(data); // Salva os dados originais
      } else {
        console.error('Erro ao buscar cronômetros:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar cronômetros:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={historyStyles.historyItem}>
      <Text style={historyStyles.description}>Descrição: {item.description}</Text>
      <Text style={historyStyles.time}>Tempo: {formatTime(item.time)}</Text>
      <Text style={historyStyles.createdAt}>Criado em: {formatDate(item.createdAt)}</Text>
      <TouchableOpacity style={historyStyles.deleteButton} onPress={() => handleDelete(index)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredStopwatches = originalData.filter(item =>
      item.description.toLowerCase().includes(text.toLowerCase())
    );
    setStopwatches(filteredStopwatches);
  };

  const handleDelete = async (index) => {
    const stopwatchId = stopwatches[index].id;

    try {
      const response = await fetch(`${config.urlRootNode}stopwatches/${stopwatchId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedStopwatches = [...stopwatches];
        updatedStopwatches.splice(index, 1);
        setStopwatches(updatedStopwatches);
        Alert.alert('Sucesso', 'O cronômetro foi excluído com sucesso.');
      } else {
        Alert.alert('Erro', 'Erro ao excluir o cronômetro.');
      }
    } catch (error) {
      console.error('Erro ao excluir o cronômetro:', error);
      Alert.alert('Erro', 'Erro ao excluir o cronômetro.');
    }
  };

  return (
    <View style={historyStyles.container}>
      <View style={historyStyles.searchBar}>
        <TextInput
          style={historyStyles.input}
          placeholder="Pesquisar pela descrição"
          placeholderTextColor="#FFF"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={historyStyles.searchIcon}
          onPress={() => handleSearch(searchText)}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={stopwatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HistoryScreen;
