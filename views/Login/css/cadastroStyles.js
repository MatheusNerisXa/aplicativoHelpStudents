// cadastroStyles.js
import { StyleSheet } from 'react-native';

export const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#2c3e50',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    height: 50,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#2c3e50',
  },
  eyeIcon: {
    padding: 15,
    position: 'absolute',
    right: 10,
  },

  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button__text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
