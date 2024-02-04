// NewsDetails.js
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import HTML from 'react-native-render-html'; // Importe a biblioteca de renderização HTML
import { newsDetailsStyles } from './css/newsDetailsStyles';

const NewsDetails = ({ route }) => {
  const { news } = route.params;

  return (
    <ScrollView style={newsDetailsStyles.container}>
      <View style={newsDetailsStyles.contentContainer}>
        {/* Renderizando o título */}
        <Text style={newsDetailsStyles.title}>{news.title}</Text>

        {/* Renderizando a imagem */}
        <Image source={{ uri: news.coverImage }} style={newsDetailsStyles.coverImage} />

        {/* Renderizando a data */}
        <Text style={newsDetailsStyles.date}>{news.date}</Text>

        {/* Renderizando o conteúdo HTML com estilos específicos usando react-native-render-html */}
        <HTML source={{ html: news.content }} contentWidth={300} />
      </View>
    </ScrollView>
  );
};

export default NewsDetails;
