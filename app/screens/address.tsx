import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddressScreen() {
  const router = useRouter();

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [number, setNumber] = useState("");

  const handleConfirm = () => {
    const parts = [];
    if (number) parts.push(number);
    if (neighborhood) parts.push(neighborhood);
    if (street) parts.push(street);
    if (city) parts.push(city);
    if (state) parts.push(state.toUpperCase());
    if (reference) parts.push(`Ref: ${reference}`);

    const fullAddress = parts.join(", ");

    if (!fullAddress) {
      Alert.alert("Atenção", "Por favor, preencha o endereço.");
      return;
    }

    Alert.alert("Endereço confirmado!", fullAddress, [
  {
    text: "OK",
    onPress: () => {
      router.replace({
        pathname: "/",
        params: { address: fullAddress },
      });
    },
  },
]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Button title="Cancelar" color='#297E33' onPress={() => router.back()} />
          <View style={{ flex: 1 }} />
          <View style={styles.publishBtn}>
            <Button title="Confirmar" color='#297E33' onPress= {handleConfirm} />
          </View>
        </View>
      </View>

      {/* Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Endereço</Text>

        {/* Estado */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estado</Text>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o estado" value="" />
              <Picker.Item label="Acre" value="ac" />
              <Picker.Item label="Alagoas" value="al" />
              <Picker.Item label="Amapá" value="ap" />
              <Picker.Item label="Amazonas" value="am" />
              <Picker.Item label="Bahia" value="ba" />
              <Picker.Item label="Ceará" value="ce" />
              <Picker.Item label="Distrito Federal" value="df" />
              <Picker.Item label="Espírito Santo" value="es" />
              <Picker.Item label="Goiás" value="go" />
              <Picker.Item label="Maranhão" value="ma" />
              <Picker.Item label="Mato Grosso" value="mt" />
              <Picker.Item label="Mato Grosso do Sul" value="ms" />
              <Picker.Item label="Minas Gerais" value="mg" />
              <Picker.Item label="Pará" value="pa" />
              <Picker.Item label="Paraíba" value="pb" />
              <Picker.Item label="Paraná" value="pr" />
              <Picker.Item label="Pernambuco" value="pe" />
              <Picker.Item label="Piauí" value="pi" />
              <Picker.Item label="Rio de Janeiro" value="rj" />
              <Picker.Item label="Rio Grande do Norte" value="rn" />
              <Picker.Item label="Rio Grande do Sul" value="rs" />
              <Picker.Item label="Rondônia" value="ro" />
              <Picker.Item label="Roraima" value="rr" />
              <Picker.Item label="Santa Catarina" value="sc" />
              <Picker.Item label="São Paulo" value="sp" />
              <Picker.Item label="Sergipe" value="se" />
              <Picker.Item label="Tocantins" value="to" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade"
            maxLength={30}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o bairro"
            maxLength={30}
            value={city}
            onChangeText={setNeighborhood}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rua</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a rua"
            maxLength={30}
            value={street}
            onChangeText={setStreet}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o número"
            maxLength={30}
            value={street}
            onChangeText={setStreet}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Referência</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite um ponto de referência"
            maxLength={30}
            value={reference}
            onChangeText={setReference}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#174791",
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  publishBtn: {
    backgroundColor: "#297E33",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: -10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 15,
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
  },
  label: {
    color: "#297E33",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    fontSize: 16,
    color: "#555555",
  },
  picker: {
    height: 50,
    color: "#555555",
  },
});
