import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions} from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();

  const [telefono, setTelefono] = useState('');

  const handleRegister = async () => {
    // Validación para asegurarse de que el campo no esté vacío
    if (!telefono) {
      Alert.alert('Error', 'El campo de número de teléfono es obligatorio.');
      return;
    }

    // Validación para asegurarse de que el campo solo contiene números
    if (!/^\d+$/.test(telefono)) {
      Alert.alert('Error', 'El número de teléfono solo debe contener dígitos.');
      return;
    }

    // Aquí puedes añadir más validaciones, como la longitud mínima y máxima del número de teléfono
    if (telefono.length < 10 || telefono.length > 11) {
      Alert.alert('Error', 'El número de teléfono debe tener 10 dígitos.');
      return;
    }

    // Simulación de envío de datos a una API
    console.log('Telefono:', telefono);

    // try {
    //   const response = await fetch('http://192.168.1.11:1234/registro', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       telefono,
    //     }),
    //   });

    //   const data = await response.json();
    //   console.log('Respuesta de la API:', data);

    //   if (data.error) {
    //     Alert.alert('Error', data.error);
    //   } else {
    //     navigation.navigate("Login");
    //   }

    // } catch (error) {
    //   console.error('Error al enviar los datos a la API:', error);
    //   Alert.alert('Error', 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Inicia sesión</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.inputs}
          placeholder="Número de teléfono"
          placeholderTextColor="white"
          keyboardType='numeric'
          value={telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Contraseña"
          placeholderTextColor="white"
          keyboardType='numeric'
          value={telefono}
          onChangeText={setTelefono}
        />
        <TouchableOpacity style={styles.boton} onPress={handleRegister}>
          <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "center" }}>
            Inicia sesión
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
    marginTop: height * .49,
    height: 40,
    borderRadius: 5,
    width: "95%",
    margin: 10,
    backgroundColor: '#16254b',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
