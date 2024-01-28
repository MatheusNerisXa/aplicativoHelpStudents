import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import loginStyles from './css/loginStyles';
import config from '../../config/config.json';

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
        navigation.navigate('Home');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Email ou senha inválidos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login');
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('Cadastro'); 
  };

  return (
    <View style={[loginStyles.container, loginStyles.container__center]}>
      <View style={loginStyles.logo__container}>
        <Image source={require('../../assets/img/logo.png')} style={{ width: 180, height: 180 }} />
      </View>

      <View style={loginStyles.login__form}>
        {message && <Text style={loginStyles.login__message}>{message}</Text>}
        <TextInput
          style={loginStyles.login__input}
          placeholder="E-mail"
          placeholderTextColor="#000"
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={loginStyles.login__input}
          placeholder="Senha"
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={loginStyles.login__button} onPress={handleLogin}>
          <Text style={loginStyles.login__buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={loginStyles.login__footer}>
        <TouchableOpacity style={loginStyles.login__footerButton} onPress={navigateToSignUp}>
          <Text style={loginStyles.login__footerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
