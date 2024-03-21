import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config.json';
import { historyStyles } from './css/historyStyles';

const HistoryScreen = () => {
  const [stopwatches, setStopwatches] = useState([]);
  const [userId, setUserId] = useState(null);

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
      } else {
        console.error('Erro ao buscar cronômetros:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar cronômetros:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={historyStyles.historyItem}>
      <Text style={historyStyles.description}>Descrição: {item.description}</Text>
      <Text style={historyStyles.time}>Tempo: {formatTime(item.time)}</Text>
      <Text style={historyStyles.createdAt}>Criado em: {formatDate(item.createdAt)}</Text>
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

  return (
    <View style={historyStyles.container}>
      <FlatList
        data={stopwatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
};

export default HistoryScreen;
