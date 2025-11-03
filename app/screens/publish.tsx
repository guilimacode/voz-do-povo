import { Picker } from '@react-native-picker/picker';
import AddressModal from 'app/screens/address';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function App() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [address, setAddress] = useState("");
  const router = useRouter();
  const [showAddressModal, setShowAddressModal] = useState(false);


  const handleNavigate = () => {
    router.push({
      pathname: '/screens/imageAdd',
      params: {
        title,
        theme,
        name,
        anonymous: anonymous ? 'true' : 'false',
        complaint,
        address,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Button title="Cancelar" color='#297E33' onPress={() => router.push("/menu")} />
          <View style={{ flex: 1 }} />
          <View style={styles.publishBtn}>
            <Button title="Adicionar Imagens" color='#297E33' onPress={handleNavigate} />
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Nova publicação</Text>

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
            <Text style={styles.address} onPress={() => setShowAddressModal(true)}>{address}</Text>
          ) : (
            <Text style={styles.placeholder} onPress={() => setShowAddressModal(true)}>Nenhum endereço cadastrado.</Text>
          )}
        </View>
        <AddressModal
          visible={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          onConfirm={(fullAddress) => {
            setAddress(fullAddress);
            setShowAddressModal(false);
          }} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={[styles.input, anonymous && styles.inputDisabled]}
            placeholder="Digite seu nome"
            maxLength={30}
            value={name}
            onChangeText={setName}
            editable={!anonymous}
          />
          <View style={styles.switchContainer}>
            <Switch value={anonymous} onValueChange={setAnonymous} />
            <Text style={styles.switchLabel}>Permanecer anônimo</Text>
          </View>
        </View>

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
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
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
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
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
    color: "gray"
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#999',
    opacity: 0.7,
  },
});
