
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Desayuno from './Desayuno';
import Almuerzo from './Almuerzo';
import Postres from './Postres';
import Cena from './Cena';
import Recomendacion from './Recomendacion';
import Ontoy from './Ontoy';
import Favoritos from "./Favoritos";

import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Almuerzo" component={Almuerzo} options={{ headerShown: false }} />
        <Stack.Screen name="Desayuno" component={Desayuno} options={{ headerShown: false }} />
        <Stack.Screen name="Postres" component={Postres} options={{ headerShown: false }}/>
        <Stack.Screen name="Cena" component={Cena} options={{ headerShown: false }} />
        <Stack.Screen name="Recomendacion" component={Recomendacion} options={{ headerShown: false }} />
        <Stack.Screen name="Ontoy" component={Ontoy} options={{ headerShown: false }} />
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
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