import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateSubjectScreen = () => {
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null); // Inicializa como null
  useEffect(() => {
    // Aqui você pode obter o ID do usuário logado do AsyncStorage
    const getLoggedInUserId = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
  
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { email } = userData; // Extrai o email do usuário
          console.log('Email do usuário:', email);
  
          // Faz uma solicitação para obter o ID do usuário
          const response = await fetch(config.urlRootNode + `getUserId?email=${email}`);
          const data = await response.json();
          console.log('ID do usuário:', data.userId); // Imprime o ID do usuário no console
          setUserId(data.userId); // Define o ID do usuário no estado
        }
      } catch (error) {
        console.error('Erro ao obter ID do usuário:', error);
      }
    };
  
    getLoggedInUserId(); // Chama a função para obter o ID do usuário logado
  }, []);
  

  const handleSubmit = async () => {
    try {
      const response = await fetch(config.urlRootNode + 'createSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          professor,
          startTime,
          endTime,
          days,
          location,
          startDate,
          endDate,
          status,
          userId // Use o ID do usuário logado
        })
      });
      const data = await response.json();
      console.log(data);
      // Limpar os campos após o envio bem-sucedido
      setName('');
      setProfessor('');
      setStartTime('');
      setEndTime('');
      setDays('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setStatus('');
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Matéria"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Professor"
        value={professor}
        onChangeText={setProfessor}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário de Início"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário de Término"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Dias da Semana (separados por vírgula)"
        value={days}
        onChangeText={setDays}
      />
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Início"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Término"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Criar Matéria" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateSubjectScreen;
