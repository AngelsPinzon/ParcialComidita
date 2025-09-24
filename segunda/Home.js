import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';

function AnimatedButton({ onPress, children, style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>Bienvenidos a Recetas Gourmet 🍴</Text>

      {/* Imagen principal convertida en botón */}
      <AnimatedButton onPress={() => navigation.navigate('Ontoy')}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={{
              uri: 'https://img.freepik.com/foto-gratis/vista-superior-variedad-comida-deliciosa-mesa_23-2148717374.jpg',
            }}
          />
          <View style={styles.overlay}>
            <Text style={styles.headerText}>Recetas de comiditas</Text>
          </View>
        </View>
      </AnimatedButton>

      {/* Opciones del menú */}
      <View style={styles.menuRow}>
        <AnimatedButton onPress={() => navigation.navigate('Desayuno', { opcion: 'Desayuno' })}>
          <View>
            <Image
              style={styles.menuImage}
              source={{
                uri: 'https://www.recetasderechupete.com/wp-content/uploads/2018/09/Desayuno.jpg',
              }}
            />
            <Text style={styles.menuText}>Desayuno 🥐</Text>
          </View>
        </AnimatedButton>

        <AnimatedButton onPress={() => navigation.navigate('Almuerzo', { opcion: 'Almuerzo' })}>
          <View>
            <Image
              style={styles.menuImage}
              source={{
                uri: 'https://www.shutterstock.com/image-photo/table-food-top-view-600nw-467823860.jpg',
              }}
            />
            <Text style={styles.menuText}>Almuerzo 🍲</Text>
          </View>
        </AnimatedButton>
      </View>

      <View style={styles.menuRow}>
        <AnimatedButton onPress={() => navigation.navigate('Cena', { opcion: 'Cena' })}>
          <View>
            <Image
              style={styles.menuImage}
              source={{
                uri: 'https://media-cdn.tripadvisor.com/media/photo-s/11/a2/97/1e/la-cena-de-noche-buena.jpg',
              }}
            />
            <Text style={styles.menuText}>Cena 🍷</Text>
          </View>
        </AnimatedButton>

        <AnimatedButton onPress={() => navigation.navigate('Postres', { opcion: 'Postres' })}>
          <View>
            <Image
              style={styles.menuImage}
              source={{
                uri: 'https://vecinavegetariana.com/wp-content/uploads/2022/03/Merengon-Vegano-3-1.jpeg',
              }}
            />
            <Text style={styles.menuText}>Postres 🍰</Text>
          </View>
        </AnimatedButton>
      </View>

      {/* 🔥 Botón de Recomendación del Momento */}
      <View style={styles.recomendacionContainer}>
        <AnimatedButton onPress={() => navigation.navigate('Recomendacion')}>
          <View style={styles.recomendacionButton}>
            <Text style={styles.recomendacionText}>🌟 Ver recomendación del momento</Text>
          </View>
        </AnimatedButton>
      </View>

      {/* ⭐ Botón de Favoritos */}
      <View style={styles.recomendacionContainer}>
        <AnimatedButton onPress={() => navigation.navigate('Favoritos')}>
          <View style={[styles.recomendacionButton, { backgroundColor: "#f39c12" }]}>
            <Text style={styles.recomendacionText}>⭐ Ver Favoritos</Text>
          </View>
        </AnimatedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff8f0"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#d35400",
  },
  headerImageContainer: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  menuImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  menuText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  recomendacionContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  recomendacionButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  recomendacionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
