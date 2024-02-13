import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EntranceExamDetailScreen = ({ route }) => {
  const { exam } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exam.title}</Text>
      <Text>Período de Inscrição: {exam.registrationStart} - {exam.registrationEnd}</Text>
      <Text>Prova 1: {exam.exam1}</Text>
      <Text>Prova 2: {exam.exam2}</Text>
      {/* Adicione mais detalhes conforme necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EntranceExamDetailScreen;
