import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo__container: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  login__input: {
    height: 40,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#929898',
    borderRadius: 5,
    fontSize: 16,
    color: '#262824',
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
});

export default loginStyles;
