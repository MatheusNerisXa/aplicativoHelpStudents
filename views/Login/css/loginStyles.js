import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo__container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo__image: {
    width: 80,
    height: 80,
  },
  login__form: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  login__message: {
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  login__input: {
    height: 40,
    marginBottom: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#253494', 
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  login__button: {
    backgroundColor: '#253494',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  login__buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  login__footer: {
    marginTop: 20,
  },
  login__footerButton: {
    padding: 10,
  },
  login__footerButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
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
