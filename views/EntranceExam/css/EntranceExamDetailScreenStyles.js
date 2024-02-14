import { StyleSheet } from 'react-native';

export const entranceDetails = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#253494'
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      image: {
        width: '80%',
        height: 200, // Ajuste conforme necessário
      },
      description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000'
      },
});
