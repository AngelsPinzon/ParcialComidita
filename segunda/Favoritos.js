import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  // 🔹 Cargar favoritos desde Firestore
  const fetchFavoritos = async () => {
    const snapshot = await getDocs(collection(db, "favoritos"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFavoritos(data);
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  // 🔹 Guardar un nuevo favorito de prueba
  const addFavorito = async () => {
    await addDoc(collection(db, "favoritos"), {
      name: "Comida Ejemplo 🍔",
      image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg", // ejemplo
      instructions: "Esto es un ejemplo de comida de prueba",
      createdAt: new Date(),
    });
    fetchFavoritos(); // recargar lista
  };

  // 🔹 Eliminar un favorito
  const eliminarFavorito = async (id) => {
    await deleteDoc(doc(db, "favoritos", id));
    fetchFavoritos(); // recargar lista
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Mis Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>🍴 {item.name}</Text>
              {item.instructions && (
                <Text style={styles.instructions} numberOfLines={2}>
                  📖 {item.instructions}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarFavorito(item.id)}
            >
              <Text style={styles.deleteButtonText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={addFavorito}>
        <Text style={styles.buttonText}>➕ Agregar Favorito de Prueba</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>⬅️ Volver al Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fffaf0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#d35400" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffe6cc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  item: { fontSize: 18, fontWeight: "bold", flexShrink: 1 },
  instructions: { fontSize: 14, color: "#555", marginTop: 4 },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#27ae60",
    padding: 14,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
