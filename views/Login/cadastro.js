// Cadastro.js
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { css } from "../Login/css/cadastroStyles";
import { AntDesign } from '@expo/vector-icons';
import config from "../../config/config.json";

export default function Cadastro({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function registerUser() {
    try {
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
  }

  return (
    <View style={css.container}>
      {message && (
        <Text style={css.messageText}>{message}</Text>
      )}

      <View style={css.inputContainer}>
        <TextInput
          style={css.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setUser(text)}
        />
      </View>

      <View style={css.inputContainer}>
        <TextInput
          style={css.input}
          placeholder="Digite seu email"
          placeholderTextColor="#2c3e50"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={css.inputContainer}>
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

      <TouchableOpacity style={css.button} onPress={registerUser}>
        <Text style={css.button__text}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
