import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { css } from "../Login/css/cadastroStyles";
import config from "../../config/config.json";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

export default function Cadastro({ navigation }) {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isRegisterButtonDisabled = () => {
    return !(name.trim() && email.trim() && password.trim() && confirmPassword.trim());
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    setUserError(!name.trim());
    setEmailError(!isValidEmail(email));
    setPasswordError(password.length < 6);
    setConfirmPasswordError(password !== confirmPassword);
  };

  const registerUser = async () => {
    try {
      validateInputs();
  
      if (userError || emailError || passwordError || confirmPasswordError) {
        // If there is an error, do not proceed with the registration
        return;
      }
  
      let response = await fetch(config.urlRootNode + 'createUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nameUser: name, // Mantido como 'nameUser', mas com o valor da variável 'name'
          passwordUser: password,
          emailUser: email
        })
      });
  
      let data = await response.json();
      setMessage(data.message);
  
      // If the registration is successful, save the name in AsyncStorage and navigate to the 'Home' screen
      if (!data.error) {
        await AsyncStorage.setItem('userData', JSON.stringify({ name: name, email: email }));
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Ocorreu um erro durante o cadastro');
    }
  };  

  return (
    <View style={css.container}>
      {message && (
        <View style={css.errorContainer}>
          <Text style={css.errorText}>{message}</Text>
        </View>
      )}

      <View style={css.inputContainer}>
        <Text style={css.label}>Nome:</Text>
        <TextInput
          style={[css.input, userError && css.errorBorder]}
          placeholder="Digite seu nome"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setName(text)}
        />
        {userError && <Text style={css.errorMessage}>Por favor, preencha o campo de nome.</Text>}
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Email:</Text>
        <TextInput
          style={[css.input, emailError && css.errorBorder]}
          placeholder="Digite seu email"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        {emailError && <Text style={css.errorMessage}>Por favor, insira um email válido.</Text>}
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Senha:</Text>
        <View style={[css.passwordContainer, passwordError && css.errorBorder]}>
          <TextInput
            style={[css.input, passwordError && css.errorBorder]}
            placeholder="Digite a senha"
            placeholderTextColor="#2c3e50"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={css.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={20} color="#2c3e50" />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={css.errorMessage}>A senha deve ter pelo menos 6 caracteres.</Text>}
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Confirmar Senha:</Text>
        <View style={[css.passwordContainer, confirmPasswordError && css.errorBorder]}>
          <TextInput
            style={[css.input, confirmPasswordError && css.errorBorder]}
            placeholder="Confirme sua senha"
            placeholderTextColor="#2c3e50"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={css.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={20} color="#2c3e50" />
          </TouchableOpacity>
        </View>
        {confirmPasswordError && <Text style={css.errorMessage}>As senhas não coincidem.</Text>}
      </View>

      <TouchableOpacity
        style={[css.button, { backgroundColor: isRegisterButtonDisabled() ? '#A9A9A9' : '#00c4cb' }]}
        onPress={registerUser}
        disabled={isRegisterButtonDisabled()}
      >
        <Text style={css.button__text}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
