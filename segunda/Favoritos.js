import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Favoritos({ navigation }) {
  // ⭐ Favoritos
  const [favoritos, setFavoritos] = useState([]);

  // 🍲 Mis Recetas
  const [recetas, setRecetas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [pasos, setPasos] = useState("");
  const [comentario, setComentario] = useState("");

  // 🔹 Cargar favoritos desde Firestore
  const fetchFavoritos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "favoritos"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavoritos(data);
    } catch (error) {
      console.error("❌ Error al cargar favoritos:", error);
    }
  };

  // 🔹 Cargar recetas desde Firestore
  const fetchRecetas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "recetas"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecetas(data);
    } catch (error) {
      console.error("❌ Error al cargar recetas:", error);
    }
  };

  useEffect(() => {
    fetchFavoritos();
    fetchRecetas();
  }, []);

  // 🔹 Guardar receta propia
  const addReceta = async () => {
    if (!nombre || !categoria || !ingredientes || !tiempo || !pasos) {
      Alert.alert("Error", "⚠️ Todos los campos obligatorios deben estar llenos");
      return;
    }

    try {
      await addDoc(collection(db, "recetas"), {
        name: nombre,
        category: categoria.split(",").map((c) => c.trim()),
        ingredients: ingredientes,
        time: tiempo,
        steps: pasos,
        comment: comentario,
        createdAt: new Date(),
      });

      // Limpiar formulario
      setNombre("");
      setCategoria("");
      setIngredientes("");
      setTiempo("");
      setPasos("");
      setComentario("");
      setShowForm(false);

      // Refrescar lista
      fetchRecetas();

      Alert.alert("✅ Guardado", `${nombre} fue agregada a tus recetas`);
    } catch (error) {
      console.error("❌ Error al guardar receta:", error);
      Alert.alert("Error", "No se pudo guardar la receta");
    }
  };

  // 🔹 Eliminar favorito
  const eliminarFavorito = async (id) => {
    try {
      await deleteDoc(doc(db, "favoritos", id));
      fetchFavoritos();
    } catch (error) {
      console.error("❌ Error al eliminar favorito:", error);
    }
  };

  // 🔹 Eliminar receta
  const eliminarReceta = async (id) => {
    try {
      await deleteDoc(doc(db, "recetas", id));
      fetchRecetas();
    } catch (error) {
      console.error("❌ Error al eliminar receta:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* ⭐ SECCIÓN FAVORITOS */}
      <Text style={styles.title}>⭐ Mis Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text style={styles.emptyText}>Aún no tienes favoritos guardados</Text>
      ) : (
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
      )}

      {/* 🍲 SECCIÓN RECETAS */}
      <Text style={styles.title}>🍲 Mis Recetas</Text>

      {recetas.length === 0 ? (
        <Text style={styles.emptyText}>Aún no tienes recetas creadas</Text>
      ) : (
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.item}>🍴 {item.name}</Text>
                <Text style={styles.instructions}>
                  📌 Categoría: {item.category.join(", ")}
                </Text>
                <Text style={styles.instructions}>
                  🥗 Ingredientes: {item.ingredients}
                </Text>
                <Text style={styles.instructions}>⏳ Tiempo: {item.time}</Text>
                <Text style={styles.instructions} numberOfLines={2}>
                  📖 {item.steps}
                </Text>
                {item.comment ? (
                  <Text style={styles.instructions}>💬 {item.comment}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarReceta(item.id)}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {showForm ? (
        <ScrollView style={styles.form}>
          <Text style={styles.formTitle}>➕ Nueva Receta</Text>

          <TextInput
            placeholder="Nombre (obligatorio)"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <TextInput
            placeholder="Categoría (separar con comas)"
            value={categoria}
            onChangeText={setCategoria}
            style={styles.input}
          />
          <TextInput
            placeholder="Ingredientes"
            value={ingredientes}
            onChangeText={setIngredientes}
            style={styles.input}
          />
          <TextInput
            placeholder="Tiempo de preparación"
            value={tiempo}
            onChangeText={setTiempo}
            style={styles.input}
          />
          <TextInput
            placeholder="Pasos"
            value={pasos}
            onChangeText={setPasos}
            multiline
            style={styles.input}
          />
          <TextInput
            placeholder="Comentario adicional (opcional)"
            value={comentario}
            onChangeText={setComentario}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={addReceta}>
            <Text style={styles.buttonText}>💾 Guardar Receta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e67e22" }]}
            onPress={() => setShowForm(false)}
          >
            <Text style={styles.buttonText}>❌ Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
          <Text style={styles.buttonText}>➕ Agregar Receta</Text>
        </TouchableOpacity>
      )}

      {/* Volver al Home */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>⬅️ Volver al Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fffaf0" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#d35400",
  },
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
  form: { marginTop: 20 },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginVertical: 10,
  },
});
