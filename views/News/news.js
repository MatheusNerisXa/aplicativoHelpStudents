// NewsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import NewsCard from './newsCard'; // Caminho corrigido
import { newsStyles } from "../News/css/newsStyles";
import config from '../../config/config.json';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(config.urlRootNode + 'news');
      const data = await response.json();

      console.log('Dados recebidos da API:', data);

      if (data.error) {
        console.error('Erro ao obter notícias:', data.error);
      } else {
        setNews(data);
      }

      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Erro ao obter notícias:', error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFilter = () => {
    let filtered = news.filter(item => {
      const searchValue = searchText.toLowerCase();
      return item.title.toLowerCase().includes(searchValue);
    });
    setNews(filtered);
  };

  return (
    <ScrollView
      style={newsStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={newsStyles.contentContainer}>
        <View style={newsStyles.searchBar}>
          <TextInput
            style={newsStyles.input}
            placeholder="Pesquisar por título"
            placeholderTextColor="#FFF"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <TouchableOpacity
            style={newsStyles.searchIcon}
            onPress={handleFilter}
          >
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {filteredNews.length > 0 ? (
          filteredNews.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))
        ) : (
          <Text>Nenhuma notícia correspondente encontrada</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Exportar o componente React
export default NewsScreen;
