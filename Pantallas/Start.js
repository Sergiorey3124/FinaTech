import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Start = () => {
  const navigation = useNavigation();


  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FinaTech</Text>
        <Image source={require('../assets/start.png')} style={styles.image} />
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>¡Únete a nosotros!</Text>
        <Text style={styles.description}>
          Prestamos rápidos y fáciles, diseñados para ti
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Unirse</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0084a9',
    paddingBottom: 310,
    paddingTop: 50, // Ajustar paddingTop para mover el título hacia arriba
  },
  title: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 20, // Agregar margen superior al título
  },
  image: {
    width: width, // Ancho igual al ancho de la pantalla
    height: undefined, // Permite que la imagen mantenga su proporción
    aspectRatio: 1, // Ajusta según la relación de aspecto de tu imagen
    marginBottom: 200, // Ajusta el espacio entre la imagen y el título
  },
  body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#0084a9',
    paddingVertical: 10,
    paddingHorizontal: height * 0.19,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#0084a9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Start;