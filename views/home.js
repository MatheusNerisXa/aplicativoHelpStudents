import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });
    const [todaySubjects, setTodaySubjects] = useState([]);
    const [banners, setBanners] = useState([]);
    const [greeting, setGreeting] = useState('');

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
        loadBanners();
        getGreeting();
    }, []);

    const handleBannerPress = (item) => {
        // Adicione aqui a ação a ser realizada quando o banner for pressionado
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>{`${greeting}, ${userData.name.split(' ')[0]}`}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
            </View>
            <View style={styles.bannerContainer}>
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
                <FlatList
                    data={todaySubjects}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.subjectCard} onPress={() => {}}>
                            <View style={styles.subjectInfo}>
                                <Text style={styles.subjectName}>{item.name}</Text>
                                <Text style={styles.subjectTime}>{`${item.startTime} - ${item.endTime}`}</Text>
                                <Text style={styles.subjectLocation}>{item.location}</Text>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.subjectImage} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    header: {
        backgroundColor: '#253494',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 20,
        elevation: 3,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 18,
        color: '#fff',
    },
    bannerContainer: {
        marginBottom: 20,
    },
    bannerImage: {
        width: windowWidth - 40,
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
    subjectCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        elevation: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#253494', // cor da linha
    },
    subjectImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#253494',
        marginBottom: 5,
    },
    subjectTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    subjectLocation: {
        fontSize: 14,
        color: '#666',
    },
});
