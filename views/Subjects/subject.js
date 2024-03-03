import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe isso se estiver usando o React Navigation
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone do AntDesign
import config from '../../config/config.json';

const SubjectsScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const navigation = useNavigation(); // Use isso se estiver usando o React Navigation

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch(config.urlRootNode + 'subjects');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Erro ao buscar matérias:', error);
      }
    }

    fetchSubjects();
  }, []);

  const handleSubjectPress = (subject) => {
    // Navegue para a tela SubjectDetails e passe os dados da matéria como parâmetro
    navigation.navigate('SubjectDetailsScreen', { subject });
  };

  const getRandomColor = () => {
    // Gera uma cor hexadecimal aleatória
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const renderSubjectCard = ({ item }) => {
    const bgColor = getRandomColor();
    const cardStyle = { ...styles.card, backgroundColor: bgColor };
    const textColor = getTextColor(bgColor);

    return (
      <TouchableOpacity onPress={() => handleSubjectPress(item)} style={cardStyle}>
        <Text style={[styles.subjectName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.subjectProfessor, { color: textColor }]}>Professor: {item.professor}</Text>
        <Text style={[styles.subjectTime, { color: textColor }]}>Horário: {item.startTime} - {item.endTime}</Text>
        <Text style={[styles.subjectDays, { color: textColor }]}>Dias: {item.days}</Text>
        <Text style={[styles.subjectLocation, { color: textColor }]}>Local: {item.location}</Text>
        <Text style={[styles.subjectStatus, { color: textColor }]}>Status: {item.status}</Text>
        {/* Adicione os outros campos conforme necessário */}
      </TouchableOpacity>
    );
  };

  const getTextColor = (bgColor) => {
    // Retorna a cor do texto com base na luminosidade do fundo
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000' : '#fff'; // Retorna preto para fundos claros e branco para fundos escuros
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSubjectCard}
      />
      <TouchableOpacity onPress={() => navigation.navigate('CreateSubjectScreen')} style={styles.addButton}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectProfessor: {
    fontSize: 16,
    marginTop: 5,
  },
  subjectTime: {
    fontSize: 16,
    marginTop: 5,
  },
  subjectDays: {
    fontSize: 16,
    marginTop: 5,
  },
  subjectLocation: {
    fontSize: 16,
    marginTop: 5,
  },
  subjectDates: {
    fontSize: 16,
    marginTop: 5,
  },
  subjectStatus: {
    fontSize: 16,
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

export default SubjectsScreen;
