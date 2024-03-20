import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stopwatchesStyles } from './css/stopwatchesStyles';

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [width, setWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    fetchUserData();
    Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const { email } = userData || {};
        if (email) {
          const response = await fetch(`${config.urlRootNode}getUserId?email=${email}`);
          const data = await response.json();
          console.log('ID do usuário:', data.userId);
          setUserId(data.userId);
          fetchSubjects(data.userId);
        } else {
          console.error('Email não encontrado nos dados do usuário');
        }
      } else {
        console.error('Dados do usuário não encontrados');
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

  const handleHistory = () => {
    console.log('Botão de histórico pressionado');
  };

  const handleOrientationChange = () => {
    setWidth(Dimensions.get('window').width);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={stopwatchesStyles.container}>
          <Animated.View style={[stopwatchesStyles.card, { opacity: fadeAnim }]}>
            <Text style={stopwatchesStyles.timerText}>{formatTime(time)}</Text>
            <View style={stopwatchesStyles.buttonsContainer}>
              <TouchableOpacity style={stopwatchesStyles.button} onPress={startStopwatch}>
                <Ionicons name="play" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={stopwatchesStyles.button} onPress={pauseStopwatch}>
                <Ionicons name="pause" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={stopwatchesStyles.button} onPress={resetStopwatch}>
                <Ionicons name="refresh" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </Animated.View>
          <TextInput
            style={[stopwatchesStyles.input, { width: width * 0.9 }]}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <Picker
            selectedValue={selectedSubjectId}
            onValueChange={(itemValue) => setSelectedSubjectId(itemValue)}
            style={[stopwatchesStyles.picker, { width: width * 0.9 }]}
          >
            <Picker.Item label="Selecione uma matéria" value={null} />
            {subjects.map((subject) => (
              <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
            ))}
          </Picker>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 }}>
            <TouchableOpacity style={stopwatchesStyles.historyButton} onPress={handleHistory}>
              <Text style={stopwatchesStyles.historyButtonText}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stopwatchesStyles.saveButton} onPress={handleSave}>
              <Text style={stopwatchesStyles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default StopwatchScreen;
