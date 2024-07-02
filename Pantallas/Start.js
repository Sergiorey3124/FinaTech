import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

const Start = () => {
  const navigation = useNavigation();


  
  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Prestamex</Text>
    <View style={styles.container2}> 

      
      <TouchableOpacity style={styles.boton}>
      <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "center" }}>Continuar</Text>
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
    fontSize: 38,
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
  botonG: {
    height: 40,
    borderRadius: 5,
    width: "95%",
    margin: 10,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Start;