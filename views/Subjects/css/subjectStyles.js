import { StyleSheet } from 'react-native';

export const subjectStyles = StyleSheet.create({
    container: {
        flex: 1,
      },
      card: {
        borderRadius: 8,
        marginBottom: 2,
        elevation: 2,
      },
      subjectName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      subjectProfessor: {
        fontSize: 16,
        marginTop: 5,
      },
      subjectTime: {
        fontSize: 16,
        marginTop: 5,
      },
      subjectDays: {
        fontSize: 16,
        marginTop: 5,
      },
      subjectLocation: {
        fontSize: 16,
        marginTop: 5,
      },
      subjectDates: {
        fontSize: 16,
        marginTop: 5,
      },
      subjectStatus: {
        fontSize: 16,
        marginTop: 5,
      },
      addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#253494',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
      },
      scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
      cardWrapper: {
        marginBottom: 20,
      },
      cardContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
      },
      leftBorder: {
        width: 3,
      },
      cardContent: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
      },
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#253494',
        borderRadius: 5,
        overflow: 'hidden',
        margin: 20,
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