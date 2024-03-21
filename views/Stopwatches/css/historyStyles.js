import { StyleSheet } from 'react-native';

export const historyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      historyItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#253494',
        borderRadius: 5,
      },
      description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
      },
      time: {
        fontSize: 14,
        marginBottom: 5,
        color: '#fff', 
      },
      createdAt: {
        fontSize: 14,
        color: '#eee',
      },
});
