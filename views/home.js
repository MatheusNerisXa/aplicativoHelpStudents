import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });
    const [todaySubjects, setTodaySubjects] = useState([]);
    const [banners, setBanners] = useState([]);
    const [greeting, setGreeting] = useState('');

    // Função para carregar os banners da API
    const loadBanners = async () => {
        try {
            const response = await fetch(`${config.urlRootNode}banners`);
            const responseData = await response.json();
            setBanners(responseData);
        } catch (error) {
            console.error('Erro ao buscar banners:', error);
        }
    };

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

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Bom dia');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa tarde');
        } else {
            setGreeting('Boa noite');
        }
    };

    useEffect(() => {
        getUserData();
        loadBanners(); // Carregar os banners ao montar a tela
        getGreeting(); // Obter a saudação com base no horário
    }, []);

    const handleBannerPress = (item) => {
        // Adicione aqui a ação a ser realizada quando o banner for pressionado
    };

    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <View style={styles.userCardContent}>
                    <Text style={styles.greeting}>{`${greeting}, ${userData.name}`}</Text>
                    <Text style={styles.userEmail}>{userData.email}</Text>
                </View>
            </View>
            <View style={styles.bannerContainer}>
                {/* Renderizar os banners */}
                <FlatList
                    horizontal
                    data={banners}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleBannerPress(item)}>
                            <Image source={{ uri: item.image }} style={styles.bannerImage} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingRight: 20 }}
                />
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
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    userCardContent: {
        marginLeft: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    bannerContainer: {
        height: 200,
        marginBottom: 20,
    },
    bannerImage: {
        width: windowWidth - 40, // Ajustando o tamanho do banner para ocupar toda a largura da tela com o padding horizontal
        height: 200,
        marginRight: 10,
        borderRadius: 10,
    },
    subjectsContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#253494',
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
