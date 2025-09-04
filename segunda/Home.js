import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity, Button, Alert } from 'react-native';

export default function Home({ navigation }) {
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Bienvenidos a la app de Formula 1
      </Text>
      <View style={{alignItems:"center",borderWidth:5,backgroundColor:'#ffffff'}}>
      <Image
        style={{width:350,height:150}}
        source={{
          uri: 'https://static.wikia.nocookie.net/f1wikia/images/2/21/Formula1_2018logo.png',
        }}
      />
     <Text style={styles.paragraphInferior}>
        Selecciona tu experiencia
      </Text>
      </View>
      <View style={{alignItems:"center",flexDirection: "row", justifyContent:"center"}} >
      <TouchableOpacity  onPress={() => navigation.navigate('Details')}>
      <Image
        style={{width:150,height:150}}
        source={{
          uri: 'https://cdn-7.motorsport.com/images/amp/63kZaKw6/s6/f1-infographies-de-la-saison-2018-guide-f1-2018-7879456.jpg',
        }}
      />
      </TouchableOpacity>
      <Image
        style={{width:150,height:150}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      </View>


      <View style={{alignItems:"center",flexDirection: "row",justifyContent:"center"}} >
      <Image
        style={{width:150,height:150}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={{width:150,height:150}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      </View>


     
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});