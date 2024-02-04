// newsDetailsStyles.js
import { StyleSheet } from 'react-native';

export const newsDetailsStyles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 250, // Ajuste a altura da imagem conforme necessário
    marginBottom: 5,
  },
  titleContainer: {
    position: 'absolute',
    top: '50%', // Centraliza verticalmente
    left: 0,
    right: 0,
    backgroundColor: 'rgba(37, 52, 148, 0.8)', // Cor ajustada para #253494 com alguma opacidade
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center', // Centraliza horizontalmente
  },
  title: {
    color: '#253494',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto
  },
  date: {
    color: '#666', // Cor ajustada para um tom mais suave
    fontSize: 16,
    marginTop: 8, // Espaçamento entre o título e a data
    textAlign: 'center', // Centraliza o texto
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  container:{
    backgroundColor: "#F5F5F5"
  },
  content: {
    fontSize: 18,
    lineHeight: 26, // Ajuste conforme necessário
    marginTop: 1,
  },
});
