import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, Alert } from 'react-native';
import { helpStyles } from './helpStyles';

const HelpScreen = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    if (title.trim() === '' || message.trim() === '') {
      Alert.alert('Atenção', 'Por favor, preencha o título e a mensagem antes de enviar o e-mail.');
    } else {
      const email = 'matheusneris2011@gmail.com';
      const subject = title;
      const body = message;

      const mailToUrl = `mailto:${email}?subject=${subject}&body=${body}`;

      Linking.canOpenURL(mailToUrl)
        .then((supported) => {
          if (!supported) {
            Alert.alert('Erro', 'Não foi possível abrir o cliente de e-mail.');
          } else {
            return Linking.openURL(mailToUrl);
          }
        })
        .catch((error) => console.error('Erro ao enviar e-mail:', error));
    }
  };

  return (
    <View style={helpStyles.container}>
      <Text style={helpStyles.title}>Precisa de Ajuda?</Text>
      <TextInput
        style={helpStyles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={helpStyles.messageInput}
        placeholder="Mensagem"
        multiline={true}
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
      />
      <Button
        title="Enviar E-mail"
        onPress={sendEmail}
        color="#253494" 
      />
    </View>
  );
};

export default HelpScreen;
