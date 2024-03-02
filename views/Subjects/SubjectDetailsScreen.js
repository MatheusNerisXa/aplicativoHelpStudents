import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubjectDetailsScreen = ({ route }) => {
  const { subject } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{subject.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Professor:</Text>
        <Text style={styles.value}>{subject.professor}</Text>
        <Text style={styles.label}>Horário:</Text>
        <Text style={styles.value}>{subject.startTime} - {subject.endTime}</Text>
        <Text style={styles.label}>Dias:</Text>
        <Text style={styles.value}>{subject.days}</Text>
        <Text style={styles.label}>Local:</Text>
        <Text style={styles.value}>{subject.location}</Text>
        <Text style={styles.label}>Data de Início:</Text>
        <Text style={styles.value}>{subject.startDate}</Text>
        <Text style={styles.label}>Data de Término:</Text>
        <Text style={styles.value}>{subject.endDate}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{subject.status}</Text>
        {/* Adicione mais informações conforme necessário */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#253494',
    paddingBottom: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SubjectDetailsScreen;
