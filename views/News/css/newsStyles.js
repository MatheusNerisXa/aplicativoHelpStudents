// newsStyles.js
import { StyleSheet } from 'react-native';

export const newsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  contentContainer: {
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
});

export default newsStyles;
