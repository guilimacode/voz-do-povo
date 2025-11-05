import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoToMenu = () => {
    router.replace('/menu');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image
          source={require('../assets/images/logo_b.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleGoToMenu}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/screens/register')}>
          <Text style={styles.linkText}>Não possui conta ainda? Registre-se</Text>
        </TouchableOpacity>
      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#174791',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  logo: {
    width: '100%',
    height: 80,
    marginBottom: 70,
  },
  input: {
    width: '85%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    width: 168,
    height: 51,
    backgroundColor: '#297E33',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 15,
  },
});