import React from 'react';
import { View, Text, Image } from 'react-native';
import { entranceDetails } from './css/EntranceExamDetailScreenStyles';

const EntranceExamDetailScreen = ({ route }) => {
  const { exam } = route.params;

  // Função para formatar a data para o padrão brasileiro
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <View style={entranceDetails.container}>
      <Text style={entranceDetails.title}>{exam.name}</Text>
      <View style={entranceDetails.imageContainer}>
        <Image source={{ uri: exam.urlImage }} style={entranceDetails.image} resizeMode="contain" />
      </View>
      <Text style={entranceDetails.description}>{exam.description}</Text>
      <Text>Período de Inscrição: {formatDateString(exam.registrationStart)} - {formatDateString(exam.registrationEnd)}</Text>
      <Text>Prova 1: {formatDateString(exam.exam1)}</Text>
      <Text>Prova 2: {exam.exam2 ? formatDateString(exam.exam2) : 'Não informada'}</Text>
    </View>
  );
};

export default EntranceExamDetailScreen;
