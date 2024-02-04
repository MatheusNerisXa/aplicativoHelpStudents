// NewsCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { newsCard } from "../News/css/newsCardStyles";

const NewsCard = ({ news }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('NewsDetails', { news });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={newsCard.container}>
        <Image source={{ uri: news.coverImage }} style={newsCard.image} />
        <View style={newsCard.contentContainer}>
          <Text style={newsCard.title}>{news.title}</Text>
          <Text style={newsCard.publishedAt}>{`Publicado em: ${formatDate(news.createdAt)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};

export default NewsCard;
