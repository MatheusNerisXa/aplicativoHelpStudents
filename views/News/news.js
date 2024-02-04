// NewsScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import NewsCard from './newsCard'; // Caminho corrigido
import config from '../../config/config.json';

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!Array.isArray(news)) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar notícias</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
 
  searchInput: {
    height: 40,
    borderColor: '#253494',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});

// Exportar o componente React
export default NewsScreen;
