import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>
        Bienvenidos a Restaurante Gourmet 🍴
      </Text>

      {/* Imagen principal (Header) */}
      <View style={styles.headerImageContainer}>
        <Image
          style={styles.headerImage}
          source={{
            uri: 'https://img.freepik.com/foto-gratis/vista-superior-variedad-comida-deliciosa-mesa_23-2148717374.jpg',
          }}
        />
        <View style={styles.overlay}>
          <Text style={styles.headerText}>Tu experiencia gastronómica</Text>
        </View>
      </View>

      {/* Opciones del menú */}
      <View style={styles.menuRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', { opcion: 'Desayuno' })}>
          <Image
            style={styles.menuImage}
            source={{
              uri: 'https://www.recetasderechupete.com/wp-content/uploads/2018/09/Desayuno.jpg',
            }}
          />
          <Text style={styles.menuText}>Desayuno 🥐</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Details', { opcion: 'Almuerzo' })}>
          <Image
            style={styles.menuImage}
            source={{
              uri: 'https://www.shutterstock.com/image-photo/table-food-top-view-600nw-467823860.jpg',
            }}
          />
          <Text style={styles.menuText}>Almuerzo 🍲</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', { opcion: 'Cena' })}>
          <Image
            style={styles.menuImage}
            source={{
              uri: 'https://media-cdn.tripadvisor.com/media/photo-s/11/a2/97/1e/la-cena-de-noche-buena.jpg',
            }}
          />
          <Text style={styles.menuText}>Cena 🍷</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Details', { opcion: 'Postres' })}>
          <Image
            style={styles.menuImage}
            source={{
              uri: 'https://vecinavegetariana.com/wp-content/uploads/2022/03/Merengon-Vegano-3-1.jpeg',
            }}
          />
          <Text style={styles.menuText}>Postres 🍰</Text>
        </TouchableOpacity>
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
    overflow: "hidden", // importante para que el borde redondeado afecte la imagen
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8, // sombra en Android
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
});
