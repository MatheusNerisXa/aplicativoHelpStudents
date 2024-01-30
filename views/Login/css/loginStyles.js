import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#253494'
  },
  logo__container: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo__image: {
    width: 80,
    height: 80,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#FFF',
  },
  login__input: {
    height: 40,
    marginBottom: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    fontSize: 16,
    color: '#FFF',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  login__button: {
    backgroundColor: '#00c4cb',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  login__buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Adjusted to center the buttons
    marginTop: 7,
  },
  linkButton: {
    padding: 10,
  },
  linkButtonText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  modalText: {
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#253494',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default loginStyles;
