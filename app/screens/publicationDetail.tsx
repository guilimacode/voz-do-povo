import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getReportImageUrl } from '../../src/services/reportImageService';
import { getReportById, ReportDetail } from "../../src/services/reportService";

export default function PublicationDetailScreen() {
    const router = useRouter();
    const { reportId } = useLocalSearchParams<{ reportId: string }>();
    const [publication, setPublication] = useState<ReportDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!reportId) {
            console.error("Nenhum ID de publicação foi fornecido.");
            setIsLoading(false);
            return;
        }

        const fetchPublication = async () => {
            try {
                const data = await getReportById(reportId);
                setPublication(data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da publicação:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublication();
    }, [reportId]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Data indisponível';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatTheme = (theme: string) => {
        if (!theme) return '';
        const lowercased = theme.toLowerCase();
        return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
    };

    if (isLoading) {
        return (
            <View style={[styles.mainContainer, styles.centered]}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        );
    }

    if (!publication) {
        return (
            <View style={[styles.mainContainer, styles.centered]}>
                <Text style={styles.errorText}>Não foi possível carregar a publicação.</Text>
                <Button title="Voltar ao Menu" onPress={() => router.replace('/menu')} />
            </View>
        );
    }

    const publicationDate = publication.report.images?.[0]?.uploadedAt || new Date().toISOString();

    const formatAddress = () => {
        const { street, number, complement, city, state, zipCode } = publication.reportAddressRequest;
        const parts = [];
        if (street) parts.push(`${street}, ${number}`);
        if (complement) parts.push(complement);
        if (city) parts.push(city);
        if (state) parts.push(state.toUpperCase());
        return parts.join(' - ');
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo_b.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.concludeButtonContainer}>
                <Button title="Concluir" color='#297E33' onPress={() => router.replace('/menu')} />
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.publishedAt}>Publicado em: {formatDate(publicationDate)}</Text>

                    <Text style={styles.publicationTitle}>{publication.report.report}</Text>

                    <Text style={styles.detailText}><Text style={styles.bold}>Tema da reclamação:</Text> {formatTheme(publication.report.reportCategory)}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Endereço:</Text> {formatAddress()}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Nome:</Text> {publication.userRequest.name}</Text>

                    <View style={styles.complaintBox}>
                        <Text style={styles.complaintContentText}>
                            {publication.report.description || "Nenhuma descrição fornecida."}
                        </Text>
                    </View>

                    {publication.report.images && publication.report.images.length > 0 && (
                        <>
                            <View style={styles.divider} />
                            <Text style={styles.mediaTitle}>Mídia anexada</Text>
                            <View style={styles.mediaContainer}>
                                {publication.report.images.map((image, index) => (
                                    <Image key={image.id} source={{ uri: getReportImageUrl(publication.id, index) }} style={styles.mediaImage} />
                                ))}
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#174791',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    scrollContent: {
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
    concludeButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 16,
        backgroundColor: '#297E33',
        borderRadius: 5,
    },
    publishedAt: {
        textAlign: 'right',
        color: '#555',
        marginBottom: 20,
    },
    publicationTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#297E33',
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    complaintBox: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        minHeight: 100,
    },
    complaintText: {
        color: '#888',
        fontStyle: 'italic',
    },
    complaintContentText: {
        color: '#333',
        fontSize: 16,
        lineHeight: 22,
    },
    divider: {
        height: 2,
        backgroundColor: '#297E33',
        marginVertical: 25,
    },
    mediaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#297E33',
        marginBottom: 15,
    },
    mediaContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    mediaImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
    },
    errorText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    }
});