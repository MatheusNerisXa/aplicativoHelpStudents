import { StyleSheet } from 'react-native';

export const historyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    historyItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#253494',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    time: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555', 
    },
    createdAt: {
        fontSize: 14,
        color: '#777',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#253494',
        borderRadius: 5,
        overflow: 'hidden',
      },
      input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontFamily: 'sans-serif',
        fontSize: 14,
        color: '#fff',
      },
      searchIcon: {
        padding: 10,
      },
});
