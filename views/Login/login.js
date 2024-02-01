import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import loginStyles from './css/loginStyles';
import config from '../../config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Novo estado para controle de carregamento

  useEffect(() => {
    checkPreviousLogin();
  }, []);

  const checkPreviousLogin = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error checking previous login:', error);
    } finally {
      setIsLoading(false); // Marcar o carregamento como concluído, independentemente do resultado
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Iniciar o carregamento

      let response = await fetch(config.urlRootNode + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailUser: user, passwordUser: password }),
      });

      if (response.ok) {
        const userData = { email: user };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.replace('Home');
      } else {
        const data = await response.json();
        setMessage(data.message || 'E-mail ou senha inválidos');
        showErrorModal();
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login');
      showErrorModal();
    } finally {
      setIsLoading(false); // Marcar o carregamento como concluído, independentemente do resultado
    }
  };

  const showErrorModal = () => {
    setIsErrorModalVisible(true);
  };

  const hideErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Cadastro');
  };

  if (isLoading) {
    return (
      <View style={[loginStyles.container, loginStyles.loadingContainer]}>
        <ActivityIndicator size="large" color="#253494" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
    >
      <View style={loginStyles.logo__container}>
        <Image source={require('../../assets/img/logo.png')} style={{ width: 210, height: 180 }} />
      </View>


      <View style={loginStyles.inputContainer}>
        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          style={loginStyles.login__input}
          placeholder="Digite seu email"
          placeholderTextColor="#FFF"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setUser(text)}
        />
      </View>

      <View style={loginStyles.inputContainer}>
        <Text style={loginStyles.label}>Senha:</Text>
        <View style={loginStyles.passwordContainer}>
          <TextInput
            style={loginStyles.login__input}
            placeholder="Digite sua senha"
            placeholderTextColor="#FFF"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={loginStyles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={loginStyles.linkContainer}>
        <TouchableOpacity style={loginStyles.linkButton} onPress={navigateToSignUp}>
          <Text style={loginStyles.linkButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 16, marginHorizontal: 1, marginTop: 7 }}>|</Text>
        <TouchableOpacity style={loginStyles.linkButton}>
          <Text style={loginStyles.linkButtonText}>Recuperar Senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={loginStyles.login__button} onPress={handleLogin}>
        <Text style={loginStyles.login__buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Modal de erro */}
      <Modal
        isVisible={isErrorModalVisible}
        onBackdropPress={hideErrorModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={loginStyles.modalContainer}>
          <Text style={loginStyles.modalText}>{message}</Text>
          <TouchableOpacity style={loginStyles.modalButton} onPress={hideErrorModal}>
            <Text style={loginStyles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
