import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ScientificCalculator = () => {
  const [expression, setExpression] = useState('');
  const [isScientificMode, setIsScientificMode] = useState(false);

  const handleButtonPress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearExpression();
    } else if (value === 'Toggle') {
      toggleMode();
    } else {
      setExpression(prevExpression => prevExpression + value);
    }
  };

  const calculateResult = () => {
    try {
      let result = eval(expression);
      result = parseFloat(result.toFixed(10));
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const clearExpression = () => {
    setExpression('');
  };

  const toggleMode = () => {
    setIsScientificMode(prevMode => !prevMode);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.scientificButton} onPress={() => handleButtonPress('Toggle')}>
        <Text style={styles.buttonText}>{isScientificMode ? 'Voltar' : 'Científica'}</Text>
      </TouchableOpacity>
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
      </View>
      <View style={styles.buttons}>
        {isScientificMode ? (
          <>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.pow(')}><Text style={styles.buttonText}>x^y</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.log10(')}><Text style={styles.buttonText}>log</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.sin(')}><Text style={styles.buttonText}>sin</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.cos(')}><Text style={styles.buttonText}>cos</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.tan(')}><Text style={styles.buttonText}>tan</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.PI')}><Text style={styles.buttonText}>π</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.E')}><Text style={styles.buttonText}>e</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Math.sqrt(')}><Text style={styles.buttonText}>√</Text></TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('C')}><Text style={styles.buttonText}>C</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('(')}><Text style={styles.buttonText}>(</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(')')}><Text style={styles.buttonText}>)</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('/')}><Text style={styles.buttonText}>÷</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('*')}><Text style={styles.buttonText}>×</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('-')}><Text style={styles.buttonText}>−</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('+')}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('=')}><Text style={styles.buttonText}>=</Text></TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    display: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 20,
    },
    expression: {
      fontSize: 24,
      color: '#000',
    },
    buttons: {
      paddingBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: '#253494',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    scientificButton: {
      position: 'absolute',
      top: 50,
      right: 0,
      backgroundColor: '#253494',
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginRight: 10,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
    },
  });
    
export default ScientificCalculator;