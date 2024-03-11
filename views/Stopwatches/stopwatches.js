import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const { email } = userData;
        const response = await fetch(`${config.urlRootNode}getUserId?email=${email}`);
        const data = await response.json();
        console.log('ID do usuário:', data.userId);
        setUserId(data.userId);
        fetchSubjects(data.userId);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const fetchSubjects = async (userId) => {
    try {
      const response = await fetch(`${config.urlRootNode}subjects?userId=${userId}`);
      const data = await response.json();
      console.log('Matérias recebidas:', data);
      setSubjects(data);
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
    }
  };

  const startStopwatch = () => {
    setRunning(true);
  };

  const pauseStopwatch = () => {
    setRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setRunning(false);
  };

  const handleSave = async () => {
    const stopwatchData = {
      description,
      subjectId: selectedSubjectId,
      time,
      userId,
    };
    
    try {
      const response = await fetch(config.urlRootNode + 'stopwatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stopwatchData),
      });
  
      if (response.ok) {
        console.log('Dados salvos com sucesso!');
      } else {
        console.error('Erro ao salvar dados:', response.status);
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Ionicons name="play" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pauseStopwatch}>
            <Ionicons name="pause" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={selectedSubjectId}
        onValueChange={(itemValue) => setSelectedSubjectId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma matéria" value={null} />
        {subjects.map((subject) => (
          <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#253494',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#f0f0f0',
  },
  picker: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});

export default StopwatchScreen;
