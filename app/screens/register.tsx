import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log({ email, password, confirmPassword });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <Image
                    source={require('../../assets/images/logo_b.png')}
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

                <TextInput
                    style={styles.input}
                    placeholder="Confirmação de senha"
                    placeholderTextColor="#888"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Criar conta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.linkText}>Já possui conta? Faça o login</Text>
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
    registerButton: {
        width: 168,
        height: 51,
        backgroundColor: '#297E33',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 20,
    },
    registerButtonText: {
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