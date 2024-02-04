// NewsCard.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { newsCard } from "../News/css/newsCardStyles";


const NewsCard = ({ news }) => {
  return (
    <View style={newsCard.container}>
      <Image source={{ uri: news.coverImage }} style={newsCard.image} />
      <View style={newsCard.contentContainer}>
        <Text style={newsCard.title}>{news.title}</Text>
        <Text style={newsCard.publishedAt}>{`Publicado em: ${formatDate(news.createdAt)}`}</Text>
      </View>
    </View>
  );
};

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};

export default NewsCard;
