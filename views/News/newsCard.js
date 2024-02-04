// NewsCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NewsCard = ({ news }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: news.coverImage }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.publishedAt}>{`Publicado em: ${formatDate(news.createdAt)}`}</Text>
      </View>
    </View>
  );
};

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 5,
    borderColor: '#253494',
    borderWidth: 2,
  },
  image: {
    height: 150,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#253494',
    textAlign: 'center',
  },
  publishedAt: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default NewsCard;
