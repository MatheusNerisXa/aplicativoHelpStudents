    import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
    import axios from 'axios';
    import config from '../../config/config.json';

    const EntranceExamScreen = ({ navigation }) => {
    const [entranceExams, setEntranceExams] = useState([]);

    useEffect(() => {
        const fetchEntranceExams = async () => {
        try {
            const response = await axios.get(config.urlRootNode + 'entranceExams');
            console.log('Dados dos vestibulares recebidos:', response.data);
            setEntranceExams(response.data);
        } catch (error) {
            console.error('Erro ao obter vestibulares:', error);
        }
        };

        fetchEntranceExams();
    }, []);

    const renderEntranceExamItem = ({ item }) => (
        <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('EntranceExamDetailScreen', { exam: item })}
        >
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.urlImage }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.dateText}>Período de Inscrição:</Text>
            <Text style={styles.dateText}>{item.registrationStart} - {item.registrationEnd}</Text>
            <Text style={styles.examText}>Prova 1: {item.exam1}</Text>
            <Text style={styles.examText}>Prova 2: {item.exam2}</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <FlatList
            data={entranceExams}
            renderItem={renderEntranceExamItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden', // Garante que a imagem não ultrapasse os limites do contêiner
        backgroundColor: '#f0f0f0',
    },
    imageContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
    examText: {
        fontSize: 14,
        marginTop: 5,
    },
    });

    export default EntranceExamScreen;
