import { Picker } from '@react-native-picker/picker';
import AddressModal from 'app/screens/address';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { publishReport, PublishReportData } from '../../src/services/reportService';

export default function App() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState(null);
  const router = useRouter();
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handlePublishAndNavigate = async () => {
    if (!title || !theme || !email || !addressDetails || (!anonymous && !name)) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email Inválido", "Por favor, insira um endereço de email válido.");
      return;
    }

    const body: PublishReportData = {
      userRequest: {
        name: anonymous ? "Usuário Anônimo" : name,
        email: email,
      },
      reportAddressRequest: {
        number: addressDetails.number,
        zipCode: addressDetails.zipCode,
        street: addressDetails.street,
        complement: addressDetails.complement,
        city: addressDetails.city,
        state: addressDetails.state.toUpperCase(),
        country: "Brasil"
      },
      report: {
        report: title,
        description: complaint,
        reportCategory: theme.toUpperCase(),
      }
    };

    try {
      const responseData = await publishReport(body);
      router.push({ pathname: '/screens/imageAdd', params: { reportId: responseData.id } });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      Alert.alert("Erro na Publicação", errorMessage);
      console.error("Erro ao publicar:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Button title="Cancelar" color='#297E33' onPress={() => router.push("/menu")} />
          <View style={{ flex: 1 }} />
          <View style={styles.publishBtn}>
            <Button title="Avançar" color='#297E33' onPress={handlePublishAndNavigate} />
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Nova publicação</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Título
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título aqui..."
            maxLength={30}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Tema
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Picker
            selectedValue={theme}
            style={styles.picker}
            onValueChange={(itemValue) => setTheme(itemValue)}
          >
            <Picker.Item label="Selecione um tema" value="" />
            <Picker.Item label="Limpeza" value="LIMPEZA" />
            <Picker.Item label="Meio Ambiente" value="MEIO AMBIENTE" />
            <Picker.Item label="Infraestrutura" value="INFRAESTRUTURA" />
            <Picker.Item label="Transporte" value="TRANSPORTE" />
            <Picker.Item label="Mobilidade" value="MOBILIDADE" />
            <Picker.Item label="Serviços" value="SERVIÇOS" />
            <Picker.Item label="Água" value="ÁGUA" />
            <Picker.Item label="Energia Elétrica" value="ENERGIA ELÉTRICA" />
            <Picker.Item label="Saneamento Básico" value="SANEAMENTO BÁSICO" />
            <Picker.Item label="Pertubação do Sossego" value="PERTUBAÇÃO DO SOSSEGO" />
            <Picker.Item label="Segurança" value="SEGURANÇA" />
            <Picker.Item label="Animais e Zoonoses" value="ANIMAIS E ZOONOSES" />
          </Picker>
        </View>

        <View style={styles.inputGroup} >
          <Text style={styles.label}>Endereço<Text style={styles.asterisk}> *</Text></Text>
          {address ? (
            <Text style={styles.address} onPress={() => setShowAddressModal(true)}>{address}</Text>
          ) : (
            <Text style={styles.placeholder} onPress={() => setShowAddressModal(true)}>Nenhum endereço cadastrado. Clique aqui para adicionar</Text>
          )}
        </View>
        <AddressModal
          visible={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          onConfirm={(fullAddress, details) => {
            setAddress(fullAddress);
            setAddressDetails(details);
            setShowAddressModal(false);
          }} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email<Text style={styles.asterisk}> *</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nome
            {!anonymous && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TextInput
            style={[styles.input, anonymous && styles.inputDisabled]}
            placeholder={anonymous ? "" : "Digite seu nome"}
            maxLength={30}
            value={name}
            onChangeText={setName}
            editable={!anonymous}
          />
          <View style={styles.switchContainer}>
            <Switch value={anonymous} onValueChange={(value) => setAnonymous(value)} />
            <Text style={styles.switchLabel}>Permanecer anônimo</Text>
          </View>
        </View>

        <View style={styles.textAreaGroup}>
          <Text style={styles.counter}>{complaint.length}/250</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Descreva sua reclamação aqui..."
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
  asterisk: {
    color: 'red',
    fontSize: 16,
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
