import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import config from '../../config/config.json';
import { Ionicons } from '@expo/vector-icons';
import { entranceStyles } from './css/Entrance_examStyles';

const EntranceExamScreen = ({ navigation }) => {
  const [entranceExams, setEntranceExams] = useState([]);
  const [filteredEntranceExams, setFilteredEntranceExams] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('name');

  useEffect(() => {
    fetchEntranceExams();
  }, []);

  const fetchEntranceExams = async () => {
    try {
      const response = await axios.get(config.urlRootNode + 'entranceExams');
      setEntranceExams(response.data);
      setFilteredEntranceExams(response.data);
    } catch (error) {
      console.error('Erro ao obter vestibulares:', error);
    }
  };

  const handleFilter = () => {
    let filtered = entranceExams.filter(exam => {
      const searchValue = filter.toLowerCase();
      if (filterType === 'name') {
        const name = exam.name.toLowerCase();
        return name.includes(searchValue);
      } else if (filterType === 'registration') {
        // Adicione lógica de filtro por período de inscrição, se necessário
      }
    });
    setFilteredEntranceExams(filtered);
  };

  return (
    <View style={entranceStyles.container}>
      <View style={entranceStyles.filterContainer}>
        <View style={entranceStyles.searchBar}>
          <TextInput
            style={entranceStyles.input}
            placeholder="Pesquisar por vestibular"
            value={filter}
            onChangeText={text => setFilter(text)}
            placeholderTextColor="#FFF"
          />
          <TouchableOpacity
            style={entranceStyles.searchIcon}
            onPress={handleFilter}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredEntranceExams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={entranceStyles.itemContainer} onPress={() => navigation.navigate('EntranceExamDetailScreen', { exam: item })}>
            <View style={entranceStyles.card}>
              {/* Coloque aqui os elementos do item de vestibular, como imagem, nome, período de inscrição, etc. */}
              <Text>{item.name}</Text>
              {/* Adicione mais informações conforme necessário */}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={entranceStyles.separator} />}
      />
    </View>
  );
};

export default EntranceExamScreen;
