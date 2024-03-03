import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubjectsScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { email } = userData;

          const response = await fetch(config.urlRootNode + `getUserId?email=${email}`);
          const data = await response.json();
          console.log('ID do usuário:', data.userId);
          setUserId(data.userId);
          
          fetchSubjects(data.userId);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  const fetchSubjects = async (userId) => {
    try {
      const response = await fetch(`${config.urlRootNode}subjects?userId=${userId}`);
      const data = await response.json();
      console.log('Matérias recebidas:', data); // Verifica se os dados das matérias estão corretos
      setSubjects(data);
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
    }
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate('SubjectDetailsScreen', { subject });
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const renderSubjectCard = ({ item }) => {
    const bgColor = getRandomColor();
    const cardStyle = { ...styles.card, backgroundColor: bgColor };
    const textColor = getTextColor(bgColor);
  
    console.log('Dias:', item.days); // Verifica se item.days está sendo recebido corretamente
  
    let daysString = '';
  
    if (Array.isArray(item.days)) {
      if (item.days.length === 1) {
        // Se houver apenas um dia, exibe-o normalmente
        daysString = item.days[0];
      } else {
        // Se houver mais de um dia, exibe-os em uma lista separada por vírgulas
        daysString = item.days.join(', ');
      }
    } else {
      // Se não for um array, exibe o valor normalmente
      daysString = item.days;
    }
  
    return (
      <TouchableOpacity onPress={() => handleSubjectPress(item)} style={cardStyle}>
        <Text style={[styles.subjectName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.subjectProfessor, { color: textColor }]}>Professor: {item.professor}</Text>
        <Text style={[styles.subjectTime, { color: textColor }]}>Horário: {item.startTime} - {item.endTime}</Text>
        <Text style={[styles.subjectDays, { color: textColor }]}>Dias: {daysString}</Text>
        <Text style={[styles.subjectLocation, { color: textColor }]}>Local: {item.location}</Text>
        <Text style={[styles.subjectStatus, { color: textColor }]}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  };  
  
  const getTextColor = (bgColor) => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000' : '#fff';
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {subjects.map((subject, index) => (
          <View key={index}>
            {renderSubjectCard({ item: subject })}
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: '#253494',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

export default SubjectsScreen;
