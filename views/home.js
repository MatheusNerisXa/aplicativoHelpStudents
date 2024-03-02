import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importe o hook useFocusEffect

export default function Home() {
    const [userData, setUserData] = useState({ name: '', email: '' });

    const getUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserData(userData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []); // Chama getUserData apenas uma vez durante a montagem inicial da tela

    // Atualiza as informações do usuário sempre que a tela Home receber foco
    useFocusEffect(() => {
        getUserData();
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo, {userData.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Fundo branco
        paddingTop: 50, // Espaçamento no topo para posicionar o card
        paddingHorizontal: 20, // Espaçamento horizontal
        alignItems: 'center', // Centralizar horizontalmente
    },
    card: {
        backgroundColor: '#f5f5f5', // Fundo do card
        borderRadius: 10, // Cantos arredondados
        padding: 20, // Espaçamento interno
        width: '100%', // Largura total
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20, // Tamanho do título
        fontWeight: 'bold', // Negrito
        marginBottom: 10, // Espaçamento inferior
        color: '#253494', // Cor do texto
        textAlign: 'center', // Centralizado
    },
    subtitle: {
        fontSize: 18, // Tamanho do subtítulo
        color: '#253494', // Cor do texto
        textAlign: 'center', // Centralizado
    },
});
