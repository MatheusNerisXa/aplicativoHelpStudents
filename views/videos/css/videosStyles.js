import { StyleSheet } from 'react-native';

export const videosStyles = StyleSheet.create({
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
        fontFamily: 'sans-serif',
        fontSize: 14,
        color: '#fff',
      },
      searchIcon: {
        padding: 10,
      },
      filterOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      filterOption: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        backgroundColor: '#ff9800',
        borderRadius: 20,
      },
      activeFilterOption: {
        backgroundColor: '#ff5722',
      },
      filterOptionText: {
        color: '#fff',
        fontFamily: 'sans-serif',
        fontSize: 14,
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
      image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 5,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'sans-serif',
      },
      bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      matterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      matter: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'sans-serif',
        marginLeft: 5,
      },
      categoryIcon: {
        marginRight: 5,
      },
      video: {
        flex: 1,
        height: Platform.OS === 'ios' ? 200 : 300, // Adjust as needed for Android
        borderRadius: 10,
        overflow: 'hidden',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },    
});
