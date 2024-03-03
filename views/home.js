import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe Ionicons do @expo/vector-icons

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
    }, []);

    useFocusEffect(() => {
        getUserData();
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="book" size={24} color="#FFF" style={styles.icon} />
                <View style={styles.content}>
                    <Text style={styles.title}>Bem-vindo, {userData.name} </Text>
                    <Text style={styles.subtitle}> {userData.email}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#253494',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row', // Adiciona um layout de linha
        alignItems: 'center', // Centraliza verticalmente
    },
    content: {
        flex: 1, // Ocupa todo o espaço disponível
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFF',
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'left',
    },
    icon: {
        marginRight: 20, // Espaçamento à direita do ícone
    },
});
