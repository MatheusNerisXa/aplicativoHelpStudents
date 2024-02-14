import { StyleSheet } from 'react-native';

export const entranceStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
      },
      filterContainer: {
        marginBottom: 20,
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
        fontFamily: 'Arial',
        fontSize: 14,
        color: '#fff',
      },
      searchIcon: {
        padding: 10,
      },
      itemContainer: {
        marginBottom: 10,
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        borderColor: '#253494',
        borderWidth: 1,
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
});
