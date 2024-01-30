// cadastroStyles.js
import { StyleSheet } from 'react-native';

export const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },

  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderRadius: 5,
    color: '#333',
    fontSize: 16,
    width: '100%',
    borderColor: '#95a5a6',
    borderWidth: 1,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 40,
    position: 'relative',
    marginBottom: 10,
    borderColor: '#95a5a6',
    borderWidth: 1,
  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 10,
  },

  button: {
    backgroundColor: '#00c4cb',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button__text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: 12,
    marginLeft: 5,
  },
  errorBorder: {
    borderColor: '#e74c3c',
    borderWidth: 1,
  },
});
