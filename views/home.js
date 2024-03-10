import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, Linking, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json';
import homeStyles from './homeStyle.js';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });
    const [todaySubjects, setTodaySubjects] = useState([]);
    const [banners, setBanners] = useState([]);
    const [greeting, setGreeting] = useState('');
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [dailyStudyTip, setDailyStudyTip] = useState('');

    const loadUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserData(userData);
                loadTodaySubjects(userData.email);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    const loadTodaySubjects = async (email) => {
        try {
            const userIdResponse = await fetch(config.urlRootNode + `getUserId?email=${email}`);
            const userIdData = await userIdResponse.json();

            const todaySubjectsResponse = await fetch(`${config.urlRootNode}subjectsByDay?userId=${userIdData.userId}&day=${getToday()}`);
            const todaySubjectsData = await todaySubjectsResponse.json();
            setTodaySubjects(todaySubjectsData);
        } catch (error) {
            console.error('Erro ao carregar aulas do dia:', error);
        }
    };

    const loadBanners = async () => {
        try {
            const bannersResponse = await fetch(`${config.urlRootNode}banners`);
            const bannersData = await bannersResponse.json();
            setBanners(bannersData);
        } catch (error) {
            console.error('Erro ao carregar banners:', error);
        }
    };

    const loadDailyStudyTip = async () => {
        try {
            const response = await fetch(`${config.urlRootNode}studyTips`);
            const data = await response.json();
            console.log('Daily Study Tip:', data); // Log para verificar a dica de estudo diária recebida
            // Verifica se há dados na resposta antes de configurar o estado
            if (data && data.length > 0) {
                setDailyStudyTip(data[0]); // Configura apenas o primeiro objeto do array como dailyStudyTip
            }
        } catch (error) {
            console.error('Erro ao carregar dica de estudo do dia:', error);
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
        loadUserData();
        loadBanners();
        loadDailyStudyTip();
        getGreeting();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [banners]);

    const handleBannerPress = (item) => {
        if (item.link) {
            Linking.openURL(item.link);
        }
    };

    const getTotalClasses = () => {
        return todaySubjects.length;
    };

    return (
        <SafeAreaView style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.greeting}>{`${greeting}, ${userData.name.split(' ')[0]}` + '!'}</Text>
            </View>
            <View style={homeStyles.bannerContainer}>
                <TouchableOpacity onPress={() => handleBannerPress(banners[currentBannerIndex])}>
                    <Image source={{ uri: banners[currentBannerIndex]?.image }} style={homeStyles.bannerImage} />
                </TouchableOpacity>
            </View>
            <View style={homeStyles.subjectsContainer}>
                <Text style={homeStyles.sectionTitle}>Aulas do dia:</Text>
                {todaySubjects.length === 0 ? (
                    <Text style={homeStyles.noClassesText}>Não há aulas para o dia de hoje.</Text>
                ) : (
                    <FlatList
                        data={todaySubjects}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={homeStyles.subjectCard} onPress={() => {}}>
                                <View style={homeStyles.subjectInfo}>
                                    <Text style={homeStyles.subjectName}>{item.name}</Text>
                                    <Text style={homeStyles.subjectTime}>{`${item.startTime.substring(0, 5)} às ${item.endTime.substring(0, 5)}`}</Text>
                                    <Text style={homeStyles.subjectLocation}>{item.location}</Text>
                                </View>
                                <Image source={{ uri: item.image }} style={homeStyles.subjectImage} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                    <Text style={homeStyles.totalClassesText}>Total de aulas: {getTotalClasses()}</Text>

            </View>
            <View style={homeStyles.tipsContainer}>
                <Text style={homeStyles.tipsTitle}>Dica de estudo do dia:</Text>
                <Text style={homeStyles.tip}>{dailyStudyTip.description ? dailyStudyTip.description : 'Nenhuma dica disponível'}</Text>
            </View>
        </SafeAreaView>
    );
}
