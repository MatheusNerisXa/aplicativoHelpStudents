import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        backgroundColor: '#253494',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    userEmail: {
        fontSize: 18,
        color: '#fff',
    },
    bannerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerImage: {
        width: windowWidth - 40,
        height: 200,
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco com opacidade
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#253494', // Cor da borda azul
    },
    subjectIcon: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    subjectInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subjectTextContainer: {
        marginLeft: 10,
    },
    subjectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#253494', // Cor azul
    },
    subjectTime: {
        fontSize: 14,
        color: '#666', // Cor cinza
        marginBottom: 5,
    },
    subjectLocation: {
        fontSize: 14,
        color: '#666', // Cor cinza
    },
    totalClassesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#253494',
        textAlign: 'center',
    },
    tipsContainer: {
        marginTop: 20,
    },
    tipsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#253494',
    },
    tip: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginLeft: 10,
    },
    noClassesText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default homeStyles;
