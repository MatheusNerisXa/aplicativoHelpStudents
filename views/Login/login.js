import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // AntDesign é uma das bibliotecas suportadas pelo Expo
import loginStyles from './css/loginStyles';
import config from '../../config/config.json';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      let response = await fetch(config.urlRootNode + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailUser: user, passwordUser: password }), 
      });
  
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        const data = await response.json();
        setMessage(data.message || 'E-mail ou senha inválidos');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[loginStyles.container, loginStyles.container__center]}
    >
      <View style={loginStyles.logo__container}>
        <Image source={require('../../assets/img/logo.png')} style={{ width: 180, height: 180 }} />
      </View>

      <View style={loginStyles.login__form}>
        {message && <Text style={loginStyles.login__message}>{message}</Text>}
        <TextInput
          style={loginStyles.login__input}
          placeholder="E-mail"
          placeholderTextColor="#000"
          keyboardType="email-address"
          autoCapitalize="none" 
          onChangeText={(text) => setUser(text)}
        />
        <View style={loginStyles.passwordContainer}>
          <TextInput
            style={loginStyles.login__input}
            placeholder="Senha"
            placeholderTextColor="#000"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={loginStyles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={20} color="#262824" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={loginStyles.login__button} onPress={handleLogin}>
          <Text style={loginStyles.login__buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={loginStyles.login__footer}>
        <TouchableOpacity style={loginStyles.login__footerButton} onPress={navigateToSignUp}>
          <Text style={loginStyles.login__footerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
