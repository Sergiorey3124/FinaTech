import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  age: z.preprocess((val) => Number(val), z.number().min(1, 'La edad debe ser mayor a 0')),
  email: z.string().email('Ingrese un correo electrónico válido').min(1, 'El correo electrónico es obligatorio'),
  postalCode: z.string().min(1, 'El código postal es obligatorio'),
  state: z.string().min(1, 'El estado es obligatorio'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  neighborhood: z.string().min(1, 'La colonia es obligatoria'),
});

const Request1 = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    Alert.alert('Formulario enviado', JSON.stringify(data));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registro</Text>

      <Text style={styles.label}>Nombre</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su nombre"
            placeholderTextColor="#888"
          />
        )}
        name="firstName"
        defaultValue=""
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

      <Text style={styles.label}>Apellido</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su apellido"
            placeholderTextColor="#888"
          />
        )}
        name="lastName"
        defaultValue=""
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

      <Text style={styles.label}>Edad</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su edad"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        )}
        name="age"
        defaultValue=""
      />
      {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}

      <Text style={styles.label}>Correo Electrónico</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su correo electrónico"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Código Postal</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.postalCode && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su código postal"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        )}
        name="postalCode"
        defaultValue=""
      />
      {errors.postalCode && <Text style={styles.error}>{errors.postalCode.message}</Text>}

      <Text style={styles.label}>Estado</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.state && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su estado"
            placeholderTextColor="#888"
          />
        )}
        name="state"
        defaultValue=""
      />
      {errors.state && <Text style={styles.error}>{errors.state.message}</Text>}

      <Text style={styles.label}>Ciudad</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su ciudad"
            placeholderTextColor="#888"
          />
        )}
        name="city"
        defaultValue=""
      />
      {errors.city && <Text style={styles.error}>{errors.city.message}</Text>}

      <Text style={styles.label}>Colonia</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.neighborhood && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su colonia"
            placeholderTextColor="#888"
          />
        )}
        name="neighborhood"
        defaultValue=""
      />
      {errors.neighborhood && <Text style={styles.error}>{errors.neighborhood.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0084a9',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 30
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0084a9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Request1;
