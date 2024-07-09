import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(''); // Username
  const [nombre, setNombre] = useState(''); // Full name
  const [apellido, setApellido] = useState(''); // Full name
  const [correoElectronico, setCorreoElectronico] = useState(''); // Email
  const [password, setPassword] = useState(''); // Password
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!nombre || !apellido || !usuario || !correoElectronico || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(correoElectronico)) {
      Alert.alert('Error', 'Correo electrónico no es válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
      
    }

    // try {
    //   const response = await fetch('http://192.168.1.11:1234/registro', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       nombre,
    //       apellido,
    //       usuario,
    //       email: correoElectronico,
    //       contrasena: password,
    //       imagen: null,
    //     }),
    //   });

    //   const data = await response.json();
    //   console.log('Respuesta de la API:', data);

    //   if (data.error) {
    //     // Mostrar solo el mensaje de error en la alerta
    //     Alert.alert('Error', data.error);
    //   } else {
    //     // Mostrar mensaje de éxito si no hay error
    //     navigation.navigate("Login");
    //   }

    // } catch (error) {
    //   console.error('Error al enviar los datos a la API:', error);
    //   Alert.alert('Error', 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
    // }

    console.log('Nombre:', nombre);
    console.log('Apellidos:', apellido);
    console.log('Nombre De Usuario:', usuario);
    console.log('Correo Electrónico:', correoElectronico);
    console.log('Contraseña:', password);
    console.log('Confirmar Contraseña:', confirmPassword);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Regístrese</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.inputs}
          placeholder="Nombre"
          placeholderTextColor="white"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Apellidos"
          placeholderTextColor="white"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Nombre De Usuario"
          placeholderTextColor="white"
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Correo Electrónico"
          placeholderTextColor="white"
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
          keyboardType="email-address" // Set keyboard type for email input
          autoCorrect={false} // Optional: Disable autocorrect for email input
        />
        <TextInput
          style={styles.inputs}
          placeholder="Contraseña"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputs}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="white"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.boton} onPress={handleRegister}>
          <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "center" }}>
            Registrar
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
    //fontFamily: "Roboto",
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    paddingTop: 70,
    paddingBottom: 50,
    // You can add a marginHorizontal propert to center the text if you desire
    marginHorizontal: 20,
  },
  inputs: {
    height: 40,
    borderRadius: 5,
    width: "95%",
    fontSize: 18,
    borderWidth:1,
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

export default SignUp;