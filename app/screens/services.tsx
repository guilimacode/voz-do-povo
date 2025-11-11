import { useRouter } from 'expo-router';
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ManualDeUso() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/menu")} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require('assets/images/logo.png')} style={styles.logo}/>
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>

        <View style={styles.logoContainer}>
            <Text style={styles.headerTitle}>Infraestrutura e Serviços Públicos</Text>
        </View>

        {/*Tópico 1 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Saneamento básico</Text>
        <Text style={styles.paragraph}>Problemas com água, esgoto, drenagem ou coleta de lixo.</Text>
        </View>

        {/*Tópico 2 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Infraestrutura viária</Text>
        <Text style={styles.paragraph}>Buracos, asfalto danificado, calçadas quebradas ou sinalização ruim.</Text>
        </View>
        
        {/*Tópico 3 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Educação</Text>
        <Text style={styles.paragraph}>Escolas, creches, infraestrutura ou falta de vagas.</Text>
        </View>

        {/*Tópico 4 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Iluminação pública</Text>
        <Text style={styles.paragraph}>Poste apagado, lâmpada queimada ou iluminação insuficiente em ruas.</Text>
        </View>

        {/*Tópico 5 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Energia elétrica</Text>
        <Text style={styles.paragraph}>Queda de energia, fios soltos ou problemas na rede elétrica.</Text>
        </View>

        {/*Tópico 6 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Segurança pública</Text>
        <Text style={styles.paragraph}>Falta de policiamento, áreas perigosas ou necessidade de monitoramento.</Text>
        </View>

        {/*Tópico 7 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Áreas verdes e lazer</Text>
        <Text style={styles.paragraph}>Praças, parques, quadras, playground, areninhas ou espaços abandonados</Text>
        </View>

        {/*Tópico 8 */}
        <View style={styles.sections}>
        <Text style={styles.sectionTitle}>Transporte público</Text>
        <Text style={styles.paragraph}>Ônibus, metrôs, trens, pontos de parada e estações</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057a3",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0057a3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
    zIndex: 10,
    elevation: 4,
  },

  backButton: {
    marginRight: 10,
  },

  backText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: -20,
    paddingBottom: 10,
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    borderStyle: 'solid',
  },

  logo: {
    width: 180,
    height: 110,
    marginLeft: 12,
    transform: [{ translateX: 75 }],
    marginBottom: -20,
  },

  headerTitle: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },

  scrollArea: {
    marginTop: 155,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: "#007b4b",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 6,
  },

  paragraph: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
    lineHeight: 22,
  },

  bold: {
    fontWeight: "bold",
    color: "#0057a3",
  },

  italic: {
    fontStyle: "italic",
  },

  list: {
    marginLeft: 10,
  },

  orderedList: {
    marginLeft: 10,
  },

  item: {
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 22,
  },

  subList: {
    marginLeft: 20,
    marginVertical: 4,
  },

  subItem: {
    fontSize: 14,
    lineHeight: 22,
  },
  sections:{
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    borderStyle: 'solid',
    marginVertical: 5,
  }
});
