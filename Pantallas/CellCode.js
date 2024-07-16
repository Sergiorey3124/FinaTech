import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CellCode = ({}) => {
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleVerifyCode = () => {
    const code = verificationCode.join('');
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      Alert.alert('Error', 'El código de verificación debe tener 6 dígitos.');
      return;
    }

    // Aquí se puede manejar la lógica de verificación del código
    Alert.alert('Éxito', 'Código de verificación correcto.');
    navigation.navigate('Password'); // Navegar a la pantalla principal
  };

  const handleChangeText = (text, index) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Ingrese el Código de Verificación</Text>
        <View style={styles.codeInputContainer}>
        {verificationCode.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.boton} onPress={handleVerifyCode}>
        <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "center" }}>
          Verificar Código
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C89A9',
    padding: 20,
    alignItems: "center",
  },
  container2: {
    backgroundColor: '#0b7e9c',
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
    width: 300,
    height: 539,
    flexShrink: 0,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    paddingTop: 70,
    paddingBottom: 170,
    marginHorizontal: 20,
  },
  inputs: {
    height: 40,
    borderRadius: 5,
    width: "95%",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    textAlign: "center",
    margin: 10,
    backgroundColor: 'transparent',
  },
  boton2: {
    marginTop: height * .56,
    marginBottom: 15,
    height: 40,
    borderRadius: 5,
    width: "95%",
    margin: 10,
    backgroundColor: '#16254b',
    alignItems: "center",
    justifyContent: "center",
  },
codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: 40,
    borderRadius: 5,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    textAlign: "center",
    margin: 10,
    backgroundColor: 'transparent',
  },
  boton: {
    height: 40,
    borderRadius: 5,
    width: "95%",
    margin: 10,
    backgroundColor: '#16254b',
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CellCode;
