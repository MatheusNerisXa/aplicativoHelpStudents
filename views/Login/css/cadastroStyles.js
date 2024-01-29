// cadastroStyles.js
import { StyleSheet } from 'react-native';

export const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253494',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  logo__container: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginBottom: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#FFF',
  },
  input: {
    height: 40,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderRadius: 5,
    color: '#333',
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 40,
    position: 'relative',
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
    width: '90%',
    marginTop: 20,
  },
  button__text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  messageText: {
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
