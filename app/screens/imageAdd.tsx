import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const MAX_IMAGES = 3;

  const parametros = useLocalSearchParams();
  console.log(parametros); 

  const handleSelectImage = async () => {

    //ImagePicker alterado. Erro na inserção de mais de um elemento de imagem
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria.');
      return;
    }

    //Imagem convertidas como string para inserção em um array
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newUri = result.assets[0].uri;
      setSelectedImages(prev => [...prev, newUri]);
    }
  };

  const handleRemoveImage = (uri: string) => {
    setSelectedImages(prev => prev.filter(item => item !== uri));
  };

  const remaining = MAX_IMAGES - selectedImages.length;

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Retornar" color="#174791" onPress={() => router.push("/screens/publish")} />
          <View style={{ flex: 1 }} />
          <Button title="Publicar" color="#297E33" onPress={() => router.push("/(tabs)")} />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.imageContainer}>
          {selectedImages.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />
              <Button
                title="Remover"
                onPress={() => handleRemoveImage(uri)}
                color="red"
              />
            </View>
          ))}
        </View>
      </ScrollView>

    {/*Botão alterado para ter style modificado */}
    {/*Não é possível alterar padding, border e background de um button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleSelectImage}
        disabled={selectedImages.length >= 3}
      >
        <Text style={styles.floatingButtonText}>
          Adicionar imagem ({remaining})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#174791',
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#174791',
  },
  imageContainer: {
    marginTop: 10,
  },
  imageWrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#297E33',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
