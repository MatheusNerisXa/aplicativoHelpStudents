// FileScreen.js - Adicione a navegação para SubjectPhotosScreen

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FileScreen = () => {
  const [files, setFiles] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        // Obter dados do usuário
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { email } = userData;

          // Obter o ID do usuário
          const response = await fetch(config.urlRootNode + `getUserId?email=${email}`);
          const data = await response.json();
          setUserId(data.userId);

          // Obter matérias do usuário
          const subjectsResponse = await fetch(`${config.urlRootNode}subjects?userId=${data.userId}`);
          const subjectsData = await subjectsResponse.json();
          setSubjects(subjectsData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchFiles(selectedSubject.id);
    }
  }, [selectedSubject]);

  const fetchFiles = async (subjectId) => {
    try {
      const response = await fetch(`${config.urlRootNode}files?subjectId=${subjectId}`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
    }
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate('SubjectPhotosScreen', { subjectId: subject.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.subjectsContainer}>
          {subjects.map((subject, index) => (
            <TouchableOpacity key={index} style={styles.subjectFolder} onPress={() => handleSubjectPress(subject)}>
              <AntDesign name="folderopen" size={24} color="black" />
              <Text style={styles.folderName}>{subject.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  subjectsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  subjectFolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  folderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default FileScreen;
