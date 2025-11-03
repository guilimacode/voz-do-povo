import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo_b.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <TouchableOpacity style={styles.newPostButton} onPress={() => router.push('/screens/publish')}>
                    <Text style={styles.newPostButtonText}>Fazer uma nova denúncia</Text>
                    <View style={styles.plusIconContainer}>
                        <Text style={styles.plusIcon}>+</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.gridContainer}>
                    <View style={styles.gridRow}>
                        <TouchableOpacity style={[styles.card, { marginRight: 8 }]}>
                            <Image
                                source={require('../assets/images/infraestrutura.png')}
                                style={styles.cardImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { marginLeft: 8 }]}>
                            <Image
                                source={require('../assets/images/assistente.png')}
                                style={styles.cardImage}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.gridRow, { marginBottom: 0 }]}>
                        <TouchableOpacity style={[styles.card, { marginRight: 8 }]}>
                            <Image
                                source={require('../assets/images/pub.png')}
                                style={styles.cardImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { marginLeft: 8 }]}>
                            <Image
                                source={require('../assets/images/manual.jpg')}
                                style={styles.cardImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#174791',
    },
    header: {
        backgroundColor: '#174791',
        paddingTop: 60,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 230,
        height: 73,
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 24,
        paddingBottom: 24,
    },
    newPostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#297E33',
        borderRadius: 10,
        marginHorizontal: 14,
        paddingVertical: 18,
        paddingHorizontal: 15,
        marginBottom: 30,
    },
    newPostButtonText: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    plusIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        color: '#297E33',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    gridContainer: {
        paddingHorizontal: 16,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
    },
    card: {
        flex: 1,
        height: 220,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
