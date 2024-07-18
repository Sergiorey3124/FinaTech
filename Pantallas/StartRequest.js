import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const StartRequest = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>FinaTech</Text>
      <View style={styles.header}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>¡Solo un paso más!</Text>
          <Text style={styles.description}>
            Una vez que llenes los datos restantes podras conocer los prestamos que tenemos preparados para ti.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Request1')}>
            <Text style={styles.buttonText}>Unirse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0084a9',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084a9',
    paddingVertical: 50,
  },
  title: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: "center",
    marginTop: 50
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    //fontWeight: 'bold',
    textAlign: 'justify',
    marginVertical: 10,
    marginHorizontal: 4
  },
  button: {
    backgroundColor: '#0084a9',
    paddingVertical: 10,
    paddingHorizontal: width * 0.345,
    borderRadius: 5,
    marginTop: 20,
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

export default StartRequest;
