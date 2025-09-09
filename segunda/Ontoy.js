import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import * as Location from 'expo-location';

export default function Ontoy({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado 😢');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Ejemplo: recomendaciones "simuladas" según región
      if (loc.coords.latitude > 0) {
        setRecommendations([
          { id: '1', name: 'Arepa con queso 🫓', image: 'https://www.laylita.com/recetas/wp-content/uploads/2012/11/Arepas-con-queso.jpg' },
          { id: '2', name: 'Bandeja paisa 🍛', image: 'https://restaurantecienfuegos.com.co/wp-content/uploads/2020/07/bandeja-paisa.jpg' },
        ]);
      } else {
        setRecommendations([
          { id: '1', name: 'Empanadas argentinas 🥟', image: 'https://www.paulinacocina.net/wp-content/uploads/2022/05/empanadas-argentinas.jpg' },
          { id: '2', name: 'Asado 🥩', image: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/32/3d/df/asado-argentino.jpg' },
        ]);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Recomendaciones de Comidita</Text>

      {errorMsg ? (
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
        />
      )}

      {/* Botón para volver al Home */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backText}>⬅️ Volver al Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffaf0', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#d35400' },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  image: { width: '100%', height: 180 },
  cardText: { fontSize: 18, fontWeight: '600', padding: 12, textAlign: 'center' },
  backButton: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
