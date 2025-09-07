import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';

export default function Desayuno() {
  const [pais, setPais] = useState('');
  const [data, setData] = useState(null);
  const [recetas, setRecetas] = useState([]); // array para múltiples recetas
  const [loading, setLoading] = useState(false);

  const normalizePais = (input) => input.trim().toLowerCase();

  const mapPaisToTheMealDBArea = (paisInput) => {
    const map = {
      'canada': 'Canadian',
      'usa': 'American',
      'united states': 'American',
      'mexico': 'Mexican',
      'italy': 'Italian',
      'france': 'French',
      'japan': 'Japanese',
      'colombia': 'Colombian',
      'spain': 'Spanish',
      'germany': 'German',
      'argentina': 'Argentine',
      'brazil': 'Brazilian',
      'russia': 'Russian',
      'china': 'Chinese',
      'india': 'Indian',
      'england': 'British',
      'united kingdom': 'British',
      'reino unido': 'British',
      'kenya': 'Kenyan',
    };
    return map[paisInput] || paisInput;
  };

  const buscarPaisYRecetas = async () => {
    if (!pais.trim()) {
      setRecetas([]);
      setRecetaMensaje("Por favor ingresa un nombre de país válido.");
      setData(null);
      return;
    }

    setLoading(true);
    setRecetas([]);
    setData(null);
    setRecetaMensaje(null);

    try {
      const responsePais = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(pais)}`
      );
      const jsonPais = await responsePais.json();

      if (!jsonPais || jsonPais.status === 404) {
        setData(null);
        setRecetas([]);
        setRecetaMensaje("No se encontró información para este país 😔");
        setLoading(false);
        return;
      }

      const nombrePais = jsonPais[0].name.common;
      setData(jsonPais[0]);

      const paisNormalized = normalizePais(nombrePais);
      const areaTheMealDB = mapPaisToTheMealDBArea(paisNormalized);

      const responseBreakfast = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast'
      );
      const jsonBreakfast = await responseBreakfast.json();

      if (!jsonBreakfast.meals || jsonBreakfast.meals.length === 0) {
        setRecetas([]);
        setRecetaMensaje("No tenemos recetas de desayuno registradas 😔");
        setLoading(false);
        return;
      }

      // Filtrar recetas que coincidan con el área
      const mealsToCheck = jsonBreakfast.meals.slice(0, 50); // revisar hasta 50 para más opciones
      const recetasEncontradas = [];

      for (const meal of mealsToCheck) {
        const responseDetalle = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const jsonDetalle = await responseDetalle.json();

        if (jsonDetalle.meals && jsonDetalle.meals.length > 0) {
          const detalle = jsonDetalle.meals[0];
          if (detalle.strArea.toLowerCase() === areaTheMealDB.toLowerCase()) {
            recetasEncontradas.push(detalle);
            if (recetasEncontradas.length >= 5) break; // máximo 5 recetas
          }
        }
      }

      if (recetasEncontradas.length === 0) {
        setRecetas([]);
        setRecetaMensaje("No tenemos recetas de desayuno para este país 😔");
        setLoading(false);
        return;
      }

      setRecetas(recetasEncontradas);
    } catch (error) {
      console.error(error);
      setData(null);
      setRecetas([]);
      setRecetaMensaje("Error al buscar el país o la receta");
    } finally {
      setLoading(false);
    }
  };

  // Estado para mensajes de error o info
  const [recetaMensaje, setRecetaMensaje] = useState(null);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Desayuno 🥐</Text>
      <Text style={styles.subtitle}>Busca un país por su nombre completo en inglés:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Mexico, Italy, Japan, United Kingdom"
        value={pais}
        onChangeText={setPais}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={buscarPaisYRecetas} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Buscando...' : 'Buscar'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#d35400" style={{ marginBottom: 20 }} />}

      {data && (
        <View style={styles.result}>
          <Image source={{ uri: data.flags.png }} style={styles.flag} />
          <Text style={styles.resultText}>País: {data.name.common}</Text>
          <Text style={styles.resultText}>Nombre oficial: {data.name.official}</Text>
        </View>
      )}

      {recetaMensaje && (
        <Text style={styles.recetaText}>{recetaMensaje}</Text>
      )}

      {recetas.length > 0 && (
        <View style={styles.recipeListContainer}>
          <Text style={styles.recetaTitle}>🍽️ Desayunos recomendados:</Text>
          {recetas.map((recetaItem) => (
            <View key={recetaItem.idMeal} style={styles.recipeContainer}>
              <Text style={styles.recipeName}>{recetaItem.strMeal}</Text>
              <Image source={{ uri: recetaItem.strMealThumb }} style={styles.recipeImage} />
              <Text style={styles.recipeInstructions}>{recetaItem.strInstructions}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff8f0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#d35400',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#d35400',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffe6cc',
  },
  flag: {
    width: 120,
    height: 80,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 6,
  },
  recipeListContainer: {
    marginBottom: 20,
  },
  recipeContainer: {
    backgroundColor: '#ffe6cc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  recetaTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#2c3e50',
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  recipeInstructions: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify',
  },
  recetaText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a94442',
    textAlign: 'center',
    marginBottom: 20,
  },
});