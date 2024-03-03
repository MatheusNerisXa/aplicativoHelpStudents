import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubjectDetailsScreen = ({ route }) => {
  const { subject } = route.params;

  // Função para formatar a data no formato brasileiro (dd/mm/aaaa)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{subject.name}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Professor:</Text>
          <Text style={styles.value}>{subject.professor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{subject.startTime} - {subject.endTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dias:</Text>
          <Text style={styles.value}>{subject.days}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Local:</Text>
          <Text style={styles.value}>{subject.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de Início:</Text>
          <Text style={styles.value}>{formatDate(subject.startDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de Término:</Text>
          <Text style={styles.value}>{formatDate(subject.endDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{subject.status}</Text>
        </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
  },
});

export default SubjectDetailsScreen;
