import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Password = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = async () => {
    // Validación de que las contraseñas coinciden
    if (password !== password2) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validación de longitud mínima
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Validación de al menos un dígito
    if (!/\d/.test(password)) {
      Alert.alert('Error', 'La contraseña debe contener al menos un dígito.');
      return;
    }

    // Si todas las validaciones pasan
    console.log(password);
    Alert.alert('Éxito', 'Contraseña establecida correctamente.');
    // Navegar a la siguiente pantalla
     navigation.navigate("StartRequest");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Ingresa tu contraseña</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.inputs}
          placeholder="Contraseña"
          placeholderTextColor="white"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Confirmar contraseña"
          placeholderTextColor="white"
          value={password2}
          secureTextEntry
          onChangeText={setPassword2}
        />
        <Text style={styles.plainText}>Contraseña de al menos 8 caracteres y un dígito</Text>
        <TouchableOpacity style={styles.boton} onPress={handleRegister}>
          <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "center" }}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 50,
    marginHorizontal: 20,
  },
  plainText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
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
  boton: {
    marginTop: height * .4,
    marginBottom: 15,
    height: 40,
    borderRadius: 5,
    width: "95%",
    margin: 10,
    backgroundColor: '#16254b',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Password;
