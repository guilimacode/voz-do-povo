import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function App() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const respostas: Record<string, string> = {
    "1": "Opção 1 selecionada: Enel",
    "2": "Opção 2 selecionada: Cagece",
    "3": "Opção 3 selecionada: Secretaria da Prefeitura"
  };

  useEffect(() => {
    const mensagemInicial: Message = {
      id: Date.now().toString(),
      text: "Olá! Bem vindo a chat de assistência virtual. Qual canal de atendimento deseja se comunicar:\n1 - Enel\n2- Cagece\n3- Secretaria da Prefeitura",
      sender: "bot",
    };
    setMessages([mensagemInicial]);
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const reply =
        respostas[trimmed] ||
        "Desculpe, não entendi. Por favor digite conforme as opções indicadas";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/menu")} style={{ paddingRight: 3, backgroundColor: "#FFFFFF", borderRadius: 50, marginRight: 60 }}
          >
            <Image
              source={require("../../assets/images/icone_voltar.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Assistente Virtual</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            placeholder="Digite algo..."
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#FFFFFF"
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
  messagesList: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#509cf4ff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#117202ff",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#FFFFFF"
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: -30,
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#0078fe",
    marginLeft: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
