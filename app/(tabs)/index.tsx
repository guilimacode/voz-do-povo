import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function App() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const { address } = useLocalSearchParams();

  
const handleSelectImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Section 1 */}
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Button title="Cancelar" color='#297E33' onPress={() => {}} />
          <View style={{ flex: 1 }} />
          <View style={styles.publishBtn}>
            <Button title="Publicar" color='#297E33' onPress={() => {}} />
          </View>
        </View>
      </View>

      {/* Section 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Nova publicação</Text>

        {/* Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título aqui..."
            maxLength={30}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Tema */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tema</Text>
          <Picker
            selectedValue={theme}
            style={styles.picker}
            onValueChange={(itemValue) => setTheme(itemValue)}
          >
            <Picker.Item label="Selecione um tema" value="" />
            <Picker.Item label="Saneamento Básico" value="saneamento" />
            <Picker.Item label="Infraestrutura Viária" value="infraestrutura" />
            <Picker.Item label="Educação" value="educacao" />
            <Picker.Item label="Iluminação Pública" value="iluminacao" />
            <Picker.Item label="Energia Elétrica" value="energia" />
            <Picker.Item label="Segurança Pública" value="seguranca" />
            <Picker.Item label="Áreas verdes e Lazer" value="lazer" />
          </Picker>
        </View>

        <View style={styles.inputGroup} >
          <Text style={styles.label}>Endereço</Text>
          {address ? (
            <Text style={styles.address} onPress={() => router.push('/screens/address')}>{address}</Text>
          ) : (
            <Text style={styles.placeholder} onPress={() => router.push('/screens/address')}>Nenhum endereço cadastrado.</Text>
          )}
        </View>

        {/* Nome + Switch */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            maxLength={30}
            value={name}
            onChangeText={setName}
          />
          <View style={styles.switchContainer}>
            <Switch value={anonymous} onValueChange={setAnonymous} />
            <Text style={styles.switchLabel}>Permanecer anônimo</Text>
          </View>
        </View>

        {/* Reclamação */}
        <View style={styles.textAreaGroup}>
          <Text style={styles.counter}>{complaint.length}/250</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escreva sua reclamação aqui..."
            multiline
            maxLength={250}
            value={complaint}
            onChangeText={setComplaint}
          />
        </View>
        <View style={styles.inputGroup}>
        <Button title="Adicionar imagem" onPress={handleSelectImage} color="#297E33" />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 10 }}
            resizeMode="cover"
          />
        )}
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#174791',
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31,
  },
  publishBtn: {
    backgroundColor: '#297E33',
    paddingHorizontal: 22,
    borderRadius: 5,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputGroup: {
    borderWidth: 1, // Sets the width of the border
    borderColor: 'gray', // Sets the color of the border
    borderStyle: 'solid', // Can be 'solid', 'dotted', or 'dashed'
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
  },
  label: {
    color: '#297E33',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    fontSize: 16,
    color: '#555555',
  },
  picker: {
    height: 50,
    color: '#555555',
  },
  switchContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 10,
    color: '#297E33',
    marginTop: 4,
  },
  textAreaGroup: {
    borderWidth: 1, // Sets the width of the border
    borderColor: 'gray', // Sets the color of the border
    borderStyle: 'solid', // Can be 'solid', 'dotted', or 'dashed'
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  counter: {
    textAlign: 'right',
    fontSize: 16,
    color: '#555555',
    marginBottom: 6,
  },
  textArea: {
    height: 199,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    color: '#555555',
  },
  sectionContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 16,
  marginTop: -15,
},
scrollContainer: {
  flexGrow: 1,
  backgroundColor: '#FFFFFF',
  paddingBottom: 30,
},
addressText: { 
  fontSize: 18, 
  color: "#333", 
  marginBottom: 30, 
  textAlign: "center" 
},
address: { 
  fontSize: 18, 
  color: "#333" 
},
placeholder: { 
  fontSize: 16, 
  color: "gray" },
});