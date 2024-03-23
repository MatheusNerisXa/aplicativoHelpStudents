import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const homeStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        backgroundColor: '#fff', // Fundo branco
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#253494', // Cor da borda azul
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
        color: '#253494', // Cor azul
        marginBottom: 5,
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
        fontWeight: 'normal',
        color: '#333',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    noClassesText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    totalClassesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#253494',
        textAlign: 'center'
    },
});

export default homeStyles;
