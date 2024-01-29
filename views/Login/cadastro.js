// Cadastro.js
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { css } from "../Login/css/cadastroStyles";
import config from "../../config/config.json";

export default function Cadastro({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerUser = async () => {
    try {
      // Verificar se as senhas são iguais
      if (password !== confirmPassword) {
        setMessage('As senhas não coincidem');
        return;
      }

      let response = await fetch(config.urlRootNode + 'createUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nameUser: user,
          passwordUser: password,
          emailUser: email
        })
      });

      let data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred during registration');
    }
  };

  return (
    <View style={css.container}>
      {message && (
        <Text style={css.messageText}>{message}</Text>
      )}

      <View style={css.logo__container}>
        <Image source={require('../../assets/img/logo.png')} style={{ width: 210, height: 180 }} />
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Nome:</Text>
        <TextInput
          style={css.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setUser(text)}
        />
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Email:</Text>
        <TextInput
          style={css.input}
          placeholder="Digite seu email"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Senha:</Text>
        <View style={css.passwordContainer}>
          <TextInput
            style={css.input}
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
      </View>

      <View style={css.inputContainer}>
        <Text style={css.label}>Confirmar Senha:</Text>
        <View style={css.passwordContainer}>
          <TextInput
            style={css.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#2c3e50"
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={css.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <AntDesign name={showConfirmPassword ? 'eye' : 'eyeo'} size={20} color="#2c3e50" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={css.button} onPress={registerUser}>
        <Text style={css.button__text}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
