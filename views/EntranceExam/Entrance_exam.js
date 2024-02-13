import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../../config/config.json';


const EntranceExamScreen = ({ navigation }) => {
  const [entranceExams, setEntranceExams] = useState([]);

  useEffect(() => {
    // Função para obter os dados dos vestibulares do backend
    const fetchEntranceExams = async () => {
      try {
        const response = await axios.get(config.urlRootNode + 'entranceExams');
        setEntranceExams(response.data);
      } catch (error) {
        console.error('Erro ao obter vestibulares:', error);
      }
    };

    // Chamada da função para buscar os dados ao carregar a tela
    fetchEntranceExams();
  }, []);

  const renderEntranceExamItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('EntranceExamDetailScreen', { exam: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Período de Inscrição: {item.registrationStart} - {item.registrationEnd}</Text>
        <Text>Prova 1: {item.exam1}</Text>
        <Text>Prova 2: {item.exam2}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entranceExams}
        renderItem={renderEntranceExamItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default EntranceExamScreen;
