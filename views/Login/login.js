import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import loginStyles from './css/loginStyles';
import config from '../../config/config.json';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

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
        showErrorModal(); // Exibir o modal de erro
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login');
      showErrorModal(); // Exibir o modal de erro
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
          placeholderTextColor="#000"
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
      </View>

      <View style={loginStyles.linkContainer}>
        <TouchableOpacity style={loginStyles.linkButton} onPress={navigateToSignUp}>
          <Text style={loginStyles.linkButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <Text style={{ color: '#000', fontSize: 16, marginHorizontal: 10 , marginTop: 7}}>|</Text>
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
