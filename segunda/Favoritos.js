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

  // 🔹 Guardar un nuevo favorito de ejemplo
  const addFavorito = async () => {
    await addDoc(collection(db, "favoritos"), {
      name: "Comida Ejemplo 🍔",
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
            {item.imagen && (
              <Image source={{ uri: item.imagen }} style={styles.itemImage} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>🍴 {item.nombre || item.name}</Text>
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
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  item: { fontSize: 18, flexShrink: 1 },
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
