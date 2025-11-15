import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  KeyboardEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function App() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const inputMarginAboveKeyboard = 50;

  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showEvent = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showSub = Keyboard.addListener(showEvent, (event: KeyboardEvent) => {
      Animated.timing(keyboardOffset, {
        toValue: event.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Mensagens iniciais
  useEffect(() => {
    const mensagemInicial: Message = {
      id: Date.now().toString(),
      text: "Olá! Bem vindo ao chat de assistência virtual. Qual canal de atendimento deseja se comunicar:\n1 - Enel\n2 - Cagece\n3 - Secretaria da Prefeitura",
      sender: "bot",
    };
    setMessages([mensagemInicial]);
  }, []);

  const respostas: Record<string, string> = {
    "1": "Opção 1 selecionada: Enel",
    "2": "Opção 2 selecionada: Cagece",
    "3": "Opção 3 selecionada: Secretaria da Prefeitura"
  };

  const sendMessage = () => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const reply = respostas[trimmed] || "Desculpe, não entendi. Por favor digite conforme as opções indicadas";
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "bot",
      };
      setMessages(prev => [...prev, botMessage]);
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

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/menu")} style={styles.backButton}>
          <Image
            source={require("../../assets/images/icone_voltar.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Assistente Virtual</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor:   '#fcf6e9ff'}}
      />

      <Animated.View style={[styles.inputContainer, { marginBottom: Animated.add(keyboardOffset, inputMarginAboveKeyboard) }]}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Digite algo..."
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: '#174791',
  },
  backButton: {
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    marginRight: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
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
