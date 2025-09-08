
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './Details';
import Home from './Home';
import Desayuno from './Desayuno';
import Postres from './Postres';

import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        <Stack.Screen name="Desayuno" component={Desayuno} options={{ headerShown: false }} />
        <Stack.Screen name="Postres" component={Postres} options={{ headerShown: false }}/>
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