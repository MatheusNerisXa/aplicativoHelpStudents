import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importe o componente DateTimePicker
import { Picker } from '@react-native-picker/picker';

const CreateSubjectScreen = () => {
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('Cursando');
  const [userId, setUserId] = useState(null); // Inicializa como null
  const [showStartTimePicker, setShowStartTimePicker] = useState(false); // Estado para controlar a visibilidade do seletor de horário de início
  const [showEndTimePicker, setShowEndTimePicker] = useState(false); // Estado para controlar a visibilidade do seletor de horário de término
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Estado para controlar a visibilidade do seletor de data de início
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // Estado para controlar a visibilidade do seletor de data de término

  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

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

  const handleStartTimeChange = (event, selectedTime) => {
    setStartTime(selectedTime || startTime); // Se o usuário cancelar a seleção, mantenha a hora atual
    setShowStartTimePicker(false); // Oculte o seletor de horário
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setEndTime(selectedTime || endTime); // Se o usuário cancelar a seleção, mantenha a hora atual
    setShowEndTimePicker(false); // Oculte o seletor de horário
  };

  const handleStartDateChange = (event, selectedDate) => {
    setStartDate(selectedDate || startDate); // Se o usuário cancelar a seleção, mantenha a data atual
    setShowStartDatePicker(false); // Oculte o seletor de data
  };

  const handleEndDateChange = (event, selectedDate) => {
    setEndDate(selectedDate || endDate); // Se o usuário cancelar a seleção, mantenha a data atual
    setShowEndDatePicker(false); // Oculte o seletor de data
  };

  const handleDaySelection = (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = async () => {
    const errors = [];
  
    // Verifica se todos os campos estão preenchidos e adiciona mensagens de erro específicas para cada campo não preenchido
    if (!name) {
      errors.push('O campo "Nome da Matéria" é obrigatório.');
    }
  
    if (!professor) {
      errors.push('O campo "Professor" é obrigatório.');
    }
  
    if (selectedDays.length === 0) {
      errors.push('Selecione pelo menos um dia da semana.');
    }
  
    if (!location) {
      errors.push('O campo "Local" é obrigatório.');
    }
  
    if (errors.length > 0) {
      // Se houver erros, exibe uma mensagem de alerta contendo todas as mensagens de erro
      alert(errors.join('\n'));
      return;
    }
  
    try {
      // Ajustar o formato do startTime e endTime
      const formattedStartTime = startTime.toISOString().replace('T', ' ').replace('Z', '');
      const formattedEndTime = endTime.toISOString().replace('T', ' ').replace('Z', '');
      
      const response = await fetch(config.urlRootNode + 'createSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          professor,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          days: selectedDays,
          location,
          startDate: startDate.toISOString(), // Convertendo para formato ISO
          endDate: endDate.toISOString(), // Convertendo para formato ISO
          status,
          userId // Use o ID do usuário logado
        })
      });
      const data = await response.json();
      console.log(data);
      // Limpar os campos após o envio bem-sucedido
      setName('');
      setProfessor('');
      setSelectedDays([]);
      setLocation('');
      setStatus('Cursando');
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.daysContainer}>
        <Text style={styles.daysLabel}>Dias da Semana:</Text>
        <View style={styles.daysPicker}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDayButton]}
              onPress={() => handleDaySelection(day)}
            >
              <Text style={[styles.dayButtonText, selectedDays.includes(day) && styles.selectedDayButtonText]}>{day.charAt(0)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Picker
        selectedValue={status}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
      >
        <Picker.Item label="Cursando" value="Cursando" />
        <Picker.Item label="Aprovado" value="Aprovado" />
        <Picker.Item label="Reprovado" value="Reprovado" />
        <Picker.Item label="Recuperação" value="Recuperação" />
      </Picker>
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
      <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.input}>
      <Text>{`Horário de Início: ${startTime.getHours()}:${startTime.getMinutes()}`}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartTimeChange}
          locale="pt-BR" // Definindo o idioma para português do Brasil
        />
      )}
      <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.input}>
      <Text>{`Horário de Término: ${endTime.getHours()}:${endTime.getMinutes()}`}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndTimeChange}
          locale="pt-BR" // Definindo o idioma para português do Brasil
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
      <Text>{`Data de Início: ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          locale="pt-BR" // Definindo o idioma para português do Brasil
        />
      )}
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
      <Text>{`Data de Término: ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          locale="pt-BR" // Definindo o idioma para português do Brasil
        />
      )}

        <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#253494' }]} 
        onPress={handleSubmit}
        >
        <Text style={styles.buttonText}>Criar Matéria</Text>
        </TouchableOpacity>

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
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  daysLabel: {
    marginRight: 10,
  },
  daysPicker: {
    flexDirection: 'row',
  },
  dayButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  selectedDayButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  dayButtonText: {
    fontSize: 16,
  },
  selectedDayButtonText: {
    color: 'white',
  },
  button: {
    backgroundColor: '#253494',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateSubjectScreen;
