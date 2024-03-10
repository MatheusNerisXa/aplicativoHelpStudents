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
        loadBanners(); // Carregar os banners assim que o componente for montado
        getGreeting();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 800);

        return () => clearInterval(interval);
    }, [banners]);

    const handleBannerPress = (item) => {
        if (item.link) {
            Linking.openURL(item.link);
        }
    };

    const dailyStudyTips = [
        'Dedique 30 minutos para revisar o conteúdo estudado ontem.',
        'Reserve um momento para fazer uma pausa e alongar-se, isso ajuda a manter a concentração.',
        'Defina metas de estudo específicas para o dia e acompanhe seu progresso.',
        'Experimente diferentes técnicas de memorização, como mapas mentais ou resumos.',
        'Organize seu espaço de estudo para que seja confortável e livre de distrações.',
        'Faça anotações enquanto estuda para ajudar na compreensão e retenção do conteúdo.',
        'Pratique exercícios de relaxamento para reduzir o estresse e aumentar a produtividade.',
    ];

    const getDailyStudyTip = () => {
        const todayIndex = new Date().getDay();
        return dailyStudyTips[todayIndex % dailyStudyTips.length];
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
            </View>
            <View style={homeStyles.tipsContainer}>
                <Text style={homeStyles.tipsTitle}>Dica de estudo do dia:</Text>
                <Text style={homeStyles.tip}>{getDailyStudyTip()}</Text>
            </View>
        </SafeAreaView>
    );
}
