import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { css } from '../assets/css/css';
import config from "../config/config.json"

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      let response = await fetch(config.urlRootNode + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nameUser: user, passwordUser: password }),
      });

      if (response.ok) {
        // Authentication successful, navigate to home screen
        navigation.navigate('Home');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login');
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('Cadastro'); // Replace 'Cadastro' with your registration screen name
  };

  return (
    <View style={[css.container, css.container__center]}>
      <View style={css.login__form}>
        {message && <Text style={css.login__message}>{message}</Text>}
        <TextInput
          style={css.login__input}
          placeholder="Username:"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={css.login__input}
          placeholder="Password:"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={css.login__button} onPress={handleLogin}>
          <Text style={css.login__buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={css.login__footer}>
        <TouchableOpacity
          style={css.login__footerButton}
          onPress={navigateToSignUp}>
          <Text style={css.login__footerButtonText}>Não tem cadastro? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
