import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // Registrar usuario
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Usuario registrado correctamente");
      navigation.replace("Home"); // redirige al Home después de registrarse
    } catch (error) {
      alert("Error en registro: " + error.message);
    }
  };

  // Iniciar sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Sesión iniciada con éxito");
      navigation.replace("Home"); // redirige al Home después de loguearse
    } catch (error) {
      alert("Error en login: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? "Registro" : "Login"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isRegister ? (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.link}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#fff8f0" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#d35400" },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 15, borderRadius: 8, backgroundColor: "#fff" },
  button: { backgroundColor: "#d35400", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { color: "#d35400", marginTop: 15, textAlign: "center", fontWeight: "500" },
});