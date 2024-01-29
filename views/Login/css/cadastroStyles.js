// cadastroStyles.js
import { StyleSheet } from 'react-native';

export const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    backgroundColor: '#F5F5F5', // Adicionei a cor de fundo ao container
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
    borderColor: '#253494', // Adicione esta linha para definir a cor da borda
    borderWidth: 1, // Adicione esta linha para definir a largura da borda
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
