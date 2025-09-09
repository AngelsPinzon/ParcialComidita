// Recomendacion.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Recomendacion({ navigation }) {
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 11) {
      setMensaje('☀️ Es hora de un buen desayuno. ¡Prueba unos huevos con aguacate!');
      setImagen('https://mandolina.co/wp-content/uploads/2020/11/desayuno-saludable-sandwich-aguacate-y-huevo-1200x900.jpg');
    } else if (hora >= 11 && hora < 16) {
      setMensaje('🍝 Es hora del almuerzo. ¿Qué tal una pasta deliciosa?');
      setImagen('https://cdn7.kiwilimon.com/brightcove/8510/8510.jpg');
    } else if (hora >= 16 && hora < 20) {
      setMensaje('🍰 Un postre siempre viene bien a esta hora.');
      setImagen('https://pepacooks.com/wp-content/uploads/2014/08/tarta-de-queso-japonesa-8.jpg');
    } else {
      setMensaje('🍷 Hora de cenar algo ligero y delicioso.');
      setImagen('https://media-cdn.tripadvisor.com/media/photo-s/11/a2/97/1e/la-cena-de-noche-buena.jpg');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendación del Momento</Text>
      <Image source={{ uri: imagen }} style={styles.image} />
      <Text style={styles.message}>{mensaje}</Text>

      {/* Botón para regresar al Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>⬅️ Volver al Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#d35400',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
