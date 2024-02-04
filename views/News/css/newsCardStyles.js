import { StyleSheet } from 'react-native';

export const newsCard = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
        borderColor: '#253494',
        borderWidth: 2,
      },
      image: {
        height: 150,
        width: '100%',
      },
      contentContainer: {
        padding: 16,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#253494',
        textAlign: 'center',
      },
      publishedAt: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
      },
});
