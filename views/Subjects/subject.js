import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subjectStyles } from './css/subjectStyles';

const SubjectsScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [originalSubjects, setOriginalSubjects] = useState([]); // Armazenar as matérias originais
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
      console.log('Matérias recebidas:', data); 
      setSubjects(data);
      setOriginalSubjects(data); // Salvar as matérias originais
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
    }
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate('SubjectDetailsScreen', { subject });
  };

  const getRandomColor = () => {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    while (color === '#ffffff') {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    return color;
  };

  const renderSubjectCard = ({ item }) => {
    const bgColor = getRandomColor();
    const cardStyle = { ...subjectStyles.card, borderLeftColor: bgColor };
    const textColor = getTextColor(bgColor);
  
    console.log('Dias:', item.days); 

    let daysString = '';
  
    if (Array.isArray(item.days)) {
      if (item.days.length === 1) {
        daysString = item.days[0];
      } else {
        daysString = item.days.join(', ');
      }
    } else {
      daysString = item.days;
    }
  
    return (
      <TouchableOpacity onPress={() => handleSubjectPress(item)} style={cardStyle}>
        <View style={subjectStyles.cardContainer}>
          <View style={[subjectStyles.leftBorder, { backgroundColor: bgColor }]} />
          <View style={subjectStyles.cardContent}>
            <Text style={[subjectStyles.subjectName, { color: '#000' }]}>{item.name}</Text>
            <Text style={[subjectStyles.subjectProfessor, { color: '#000' }]}>Professor: {item.professor}</Text>
            <Text style={[subjectStyles.subjectTime, { color: '#000' }]}>Horário: {item.startTime} - {item.endTime}</Text>
            <Text style={[subjectStyles.subjectDays, { color: '#000' }]}>Dias: {daysString}</Text>
            <Text style={[subjectStyles.subjectLocation, { color: '#000' }]}>Local: {item.location}</Text>
            <Text style={[subjectStyles.subjectStatus, { color: '#000' }]}>Status: {item.status}</Text>
          </View>
        </View>
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

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setSubjects(originalSubjects); // Restaurar as matérias originais quando o texto de pesquisa é vazio
    } else {
      const filteredSubjects = originalSubjects.filter(subject =>
        subject.name.toLowerCase().includes(text.toLowerCase())
      );
      setSubjects(filteredSubjects);
    }
  };

  return (
    <View style={subjectStyles.container}>
      <View style={subjectStyles.searchBar}>
        <TextInput
          style={subjectStyles.input}
          placeholder="Pesquisar pelo nome da matéria"
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={subjectStyles.searchIcon} onPress={() => handleSearch(searchText)}>
          <AntDesign name="search1" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={subjectStyles.scrollViewContent}>
        {subjects.map((subject, index) => (
          <View key={index} style={subjectStyles.cardWrapper}>
            {renderSubjectCard({ item: subject })}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('CreateSubjectScreen')} style={subjectStyles.addButton}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SubjectsScreen;
