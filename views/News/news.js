// news.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Title } from 'react-native-paper';
import NewsCard from './newsCard'; // Corrigido o caminho
import config from '../../config/config.json';


const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.urlRootNode + 'news')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching news:', data.error);
          setLoading(false);
        } else {
          setNews(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);
  
  
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  if (!Array.isArray(news)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading news</Text>
      </View>
    );
  }
  
  // Restante do código para renderizar as notícias
  

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <Title>Latest News</Title>
        {Array.isArray(news) ? (
          news.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))
        ) : (
          <Text>No news available</Text>
        )}
      </View>
    </ScrollView>
  );
        }
  
  // Export the React component
  export default NewsScreen;
