import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Asegúrate de tener tu firebase.js configurado

// Tus pantallas
import Home from './Home';
import Desayuno from './Desayuno';
import Almuerzo from './Almuerzo';
import Postres from './Postres';
import Cena from './Cena';
import Recomendacion from './Recomendacion';
import Ontoy from './Ontoy';
import Favoritos from "./Favoritos";
import Login from "./Login"; // 👈 Nueva pantalla de Login

import { StyleSheet, View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha cambios de sesión en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // 🔹 Si está logueado → Pantallas de la app
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Almuerzo" component={Almuerzo} />
            <Stack.Screen name="Desayuno" component={Desayuno} />
            <Stack.Screen name="Postres" component={Postres} />
            <Stack.Screen name="Cena" component={Cena} />
            <Stack.Screen name="Recomendacion" component={Recomendacion} />
            <Stack.Screen name="Ontoy" component={Ontoy} />
            <Stack.Screen name="Favoritos" component={Favoritos} />
          </>
        ) : (
          // 🔹 Si NO está logueado → Solo Login
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
