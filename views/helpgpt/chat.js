import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { CHATGPT_API_URL, CHAT_KEY } from '../../keys';
import { chat } from './css/chatStyles';

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardActive(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardActive(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMessageSend = async () => {
    if (inputText.trim() === '' || sending) return;

    setSending(true);

    try {
      const response = await axios.post(
        CHATGPT_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHAT_KEY}`
          }
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputText }]);
      setMessages(prevMessages => [...prevMessages, { role: 'bot', content: botMessage }]);
      setInputText('');
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar a mensagem para o ChatGPT:', error);
      setError('Erro ao enviar a mensagem, por favor, tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView style={chat.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[chat.chatContainer, keyboardActive && chat.chatContainerKeyboardActive]}
        scrollEventThrottle={16}
      >
        {messages.map((message, index) => (
          <View key={index} style={message.role === 'user' ? chat.userMessage : chat.botMessage}>
            <Text style={chat.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      {error && <Text style={chat.errorText}>{error}</Text>}
      <View style={[chat.inputContainer, keyboardActive && chat.inputContainerKeyboardActive]}>
        <TextInput
          style={chat.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua pergunta..."
          placeholderTextColor="#777"
          multiline={true}
          numberOfLines={4}
          maxLength={1500} 
        />
        <TouchableOpacity style={chat.sendButton} onPress={handleMessageSend}>
          {sending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={chat.sendButtonText}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
