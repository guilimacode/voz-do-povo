import { useRouter } from 'expo-router';
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ManualDeUso() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require('assets/images/logo_b.png')} style={styles.logo} />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sections}>
          <View style={styles.logoContainer}>
            <Text style={styles.headerTitle}>Manual de Uso</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Bem-vindo(a)</Text> ao Voz do Cidadão! Este aplicativo foi criado para facilitar a
            comunicação entre você e os serviços públicos da sua cidade. Aqui está um passo a passo de como usar cada
            parte do app:
          </Text>
        </View>

        <View style={styles.sections}>
          <Text style={styles.sectionTitle}>Página Inicial</Text>
          <Text style={styles.paragraph}>Na tela principal, você encontra:</Text>
          <View style={styles.list}>
            <Text style={styles.item}>• <Text style={styles.bold}>Busca por bairro:</Text> pesquise ocorrências ou sugestões feitas na sua região.</Text>
            <Text style={styles.item}>• <Text style={styles.bold}>Nova sugestão/reclamação:</Text> envie sua própria solicitação à prefeitura.</Text>
            <Text style={styles.item}>• <Text style={styles.bold}>Minhas Publicações:</Text> acompanhe tudo que você já enviou.</Text>
            <Text style={styles.item}>• <Text style={styles.bold}>Dúvidas Frequentes:</Text> acesse este manual quando quiser.</Text>
            <Text style={styles.item}>• <Text style={styles.bold}>Assistente Virtual:</Text> fale com o suporte ou peça ajuda diretamente pelo chat.</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text style={styles.sectionTitle}>Fazer uma nova sugestão ou reclamação</Text>
          <View style={styles.orderedList}>
            <Text style={styles.item}>1. Toque em “Fazer uma nova sugestão/reclamação”.</Text>
            <Text style={styles.item}>2. Preencha os campos:</Text>
            <View style={styles.subList}>
              <Text style={styles.subItem}>• <Text style={styles.bold}>Título:</Text> um resumo curto do problema.</Text>
              <Text style={styles.subItem}>• <Text style={styles.bold}>Tema:</Text> escolha a categoria (ex.: iluminação, segurança, saneamento).</Text>
              <Text style={styles.subItem}>• <Text style={styles.bold}>Nível:</Text> indique a gravidade (pouco urgente, urgente, emergência).</Text>
              <Text style={styles.subItem}>• <Text style={styles.bold}>Endereço:</Text> onde está acontecendo a situação.</Text>
              <Text style={styles.subItem}>• <Text style={styles.bold}>Nome:</Text> seu nome ou apelido.</Text>
            </View>
            <Text style={styles.item}>3. Escreva a descrição com o máximo de detalhes possível.</Text>
            <Text style={styles.item}>4. (Opcional) Adicione fotos ou vídeos.</Text>
            <Text style={styles.item}>5. Toque em “Publicar” para enviar.</Text>
            <Text style={styles.item}>💡 <Text style={styles.italic}>Dica:</Text> quanto mais detalhes você der, mais fácil será resolver o problema.</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text style={styles.sectionTitle}>Acompanhar suas publicações</Text>
          <Text style={styles.paragraph}>
            Na aba “Minhas Publicações”, você pode:
          </Text>
          <View style={styles.subList}>
            <Text style={styles.subItem}>• Ver tudo que já enviou</Text>
            <Text style={styles.subItem}>• Conferir a data, status e resposta da prefeitura</Text>
            <Text style={styles.subItem}>• Editar ou excluir publicações recentes.</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text style={styles.sectionTitle}>Explorar Infraestrutura e Serviços Públicos</Text>
          <Text style={styles.paragraph}>
            Aqui você encontra informações sobre:
          </Text>
          <View style={styles.subList}>
            <Text style={styles.subItem}>• Água, esgoto e coleta de lixo.</Text>
            <Text style={styles.subItem}>• Iluminação pública.</Text>
            <Text style={styles.subItem}>• Segurança e policiamento.</Text>
            <Text style={styles.subItem}>• Educação e áreas verdes.</Text>
            <Text style={styles.subItem}>• Calçadas, buracos e sinalização.</Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Assistente Virtual</Text>
          <Text style={styles.paragraph}>
            Use o chat para:
          </Text>
          <View style={styles.subList}>
            <Text style={styles.subItem}>• Tirar dúvidas rápidas.</Text>
            <Text style={styles.subItem}>• Solicitar contato com setores da prefeitura.</Text>
            <Text style={styles.subItem}>• Receber orientações sobre serviços públicos.</Text>
          </View>
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
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 10,
    zIndex: 10,
    elevation: 0,
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: 0,
    justifyContent: 'center',
  },

  backText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },

  headerTitle: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },

  scrollArea: {
    marginTop: 120,
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
  sections: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderStyle: 'solid',
    marginVertical: 5,
  }
});
