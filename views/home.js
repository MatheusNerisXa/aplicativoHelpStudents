import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });
    const [todaySubjects, setTodaySubjects] = useState([]);

    const getUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserData(userData);
                getLoggedInUserId(userData.email);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    const getLoggedInUserId = async (email) => {
        try {
            const response = await fetch(config.urlRootNode + `getUserId?email=${email}`);
            const data = await response.json();
            getTodaySubjects(data.userId);
        } catch (error) {
            console.error('Erro ao obter ID do usuário:', error);
        }
    };

    const getTodaySubjects = async (userId) => {
        try {
            const response = await fetch(`${config.urlRootNode}subjectsByDay?userId=${userId}&day=${getToday()}`);
            const responseData = await response.json();
            setTodaySubjects(responseData);
        } catch (error) {
            console.error('Erro ao buscar as aulas do dia:', error);
        }
    };

    const getToday = () => {
        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const todayIndex = new Date().getDay();
        return days[todayIndex];
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person-circle" size={80} color="#6C63FF" />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userEmail}>{userData.email}</Text>
                </View>
            </View>
            <View style={styles.subjectsContainer}>
                <Text style={styles.sectionTitle}>Aulas do dia:</Text>
                {todaySubjects.length > 0 ? (
                    <FlatList
                        data={todaySubjects}
                        renderItem={({ item }) => (
                            <View style={styles.subjectItem}>
                                <Text style={styles.subjectName}>{item.name}</Text>
                                <Text style={styles.subjectDetails}>{item.startTime} - {item.endTime}, {item.location}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.noSubjectsContainer}>
                        <Text style={styles.noSubjectsText}>Não há aulas para o dia.</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    userInfo: {
        marginLeft: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 18,
        color: '#666',
    },
    subjectsContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6C63FF',
    },
    subjectItem: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        elevation: 3,
    },
    subjectName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subjectDetails: {
        fontSize: 16,
        color: '#666',
    },
    noSubjectsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    noSubjectsText: {
        fontSize: 18,
        color: '#666',
    },
});
