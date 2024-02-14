// newsStyles.js
import { StyleSheet } from 'react-native';

export const newsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#253494',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,  // Alterado para paddingHorizontal
    borderRadius: 8,
    fontSize: 16,
  },
});
