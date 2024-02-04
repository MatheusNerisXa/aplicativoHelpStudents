// NewsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import NewsCard from './newsCard'; // Caminho corrigido
import { newsStyles } from "../News/css/newsStyles";
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
      <View style={news.container}>
        <ActivityIndicator size="large" color="#253494" />
        <Text style={newsStyles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!Array.isArray(news)) {
    return (
      <View style={newsStyles.container}>
        <Text>Erro ao carregar notícias</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={news.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={newsStyles.contentContainer}>
        <TextInput
          style={newsStyles.searchInput}
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

// Exportar o componente React
export default NewsScreen;
