import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddressModal({ visible, onClose, onConfirm }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [number, setNumber] = useState("");

  const handleConfirm = () => {

    //A ordem do código afeta na ordem da inserção
    const parts = [];
    if (street) parts.push(street);
    if (number) parts.push(number);
    if (neighborhood) parts.push(neighborhood);
    if (city) parts.push(city);
    if (state) parts.push(state.toUpperCase());
    if (reference) parts.push(` - Ref: ${reference}`);

    const fullAddress = parts.join(", ");

    if (!fullAddress) {
      Alert.alert("Atenção", "Por favor, preencha o endereço.");
      return;
    }

    onConfirm(fullAddress);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Endereço</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estado</Text>
              <Picker
                selectedValue={state}
                onValueChange={(itemValue) => setState(itemValue)}
                style={styles.picker}>
                
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
                <Picker.Item label="Rio Grande do Norte" value="rn" />
                <Picker.Item label="Rio Grande do Sul" value="rs" />
                <Picker.Item label="Rondônia" value="ro" />
                <Picker.Item label="Roraima" value="rr" />
                <Picker.Item label="Santa Catarina" value="sc" />
                <Picker.Item label="Sergipe" value="se" />
                <Picker.Item label="Tocantins" value="to" /> 
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a cidade"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o bairro"
                value={neighborhood}
                onChangeText={setNeighborhood}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rua</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a rua"
                value={street}
                onChangeText={setStreet}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o número"
                value={number}
                onChangeText={setNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Referência</Text>
              <TextInput
                style={styles.input}
                placeholder="Ponto de referência"
                value={reference}
                onChangeText={setReference}
              />
            </View>

            <View style={styles.buttonRow}>
              <Button title="Cancelar" color="#888" onPress={onClose} />
              <Button title="Confirmar" color="#297E33" onPress={handleConfirm} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "95%",
    maxHeight: "90%",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    color: "#297E33",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 8,
  },
  picker: {
    height: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
