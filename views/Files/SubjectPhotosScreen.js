import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import config from '../../config/config.json';

const SubjectPhotosScreen = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${config.urlRootNode}files/${subjectId}`);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Erro ao obter fotos:', error);
      }
    };

    fetchPhotos();
  }, [subjectId]);

  return (
    <View style={styles.container}>
      <Text>Subject Photos Screen - Subject ID: {subjectId}</Text>
      {/* Renderizar fotos aqui */}
      <Button title="Adicionar Foto" onPress={() => navigation.navigate('AddPhotoScreen', { subjectId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SubjectPhotosScreen;
