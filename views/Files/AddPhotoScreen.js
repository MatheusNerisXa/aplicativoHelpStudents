import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Para Expo
import { Camera } from 'expo-camera'; // Para Expo
import Constants from 'expo-constants'; // Para Expo
import config from '../../config/config.json';

const AddPhotoScreen = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const galleryPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        const cameraPermission = await Camera.requestCameraPermissionsAsync();

        setHasGalleryPermission(galleryPermission.status === 'granted');
        setHasCameraPermission(cameraPermission.status === 'granted');
      }
    })();
  }, []);

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, conceda permissão para acessar a galeria nas configurações do aplicativo.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, conceda permissão para acessar a câmera nas configurações do aplicativo.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const handleChoosePhoto = async () => {
    if (!hasGalleryPermission) {
      await requestGalleryPermission();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      multiple: true, // Permitir seleção múltipla de imagens
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleTakePhoto = async () => {
    if (!hasCameraPermission) {
      await requestCameraPermission();
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleRemovePhoto = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleUploadPhoto = async () => {
    try {
      if (images.length === 0) {
        alert('Selecione pelo menos uma foto para enviar.');
        return;
      }
  
      const formData = new FormData();
      images.forEach((image, index) => {
        // Verifique se a imagem é um objeto ou uma string
        const file = typeof image === 'object' ? image : { uri: image, name: `photo${index}.jpg`, type: 'image/jpg' };
        formData.append(`photo${index}`, file);
      });
      formData.append('description', description);
      formData.append('subjectId', subjectId);
  
      const response = await fetch(config.urlRootNode + 'uploadPhoto', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Certifique-se de definir o tipo de conteúdo corretamente
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar fotos.');
      }
  
      const data = await response.json();
      alert(data.message);
      navigation.goBack(); // Voltar para a tela anterior após o envio das fotos
    } catch (error) {
      console.error('Erro durante o upload das fotos:', error);
      alert('Erro durante o upload das fotos.');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemovePhoto(index)}>
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Descrição da foto"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
        <Text style={styles.buttonText}>Escolher Foto da Galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>
      <Button title="Enviar Fotos" onPress={handleUploadPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: -30,
    marginLeft: 70,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPhotoScreen;
