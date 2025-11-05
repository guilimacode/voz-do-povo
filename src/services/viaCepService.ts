import axios from 'axios';

const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws',
});

export interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

export const getAddressByCep = async (cep: string): Promise<ViaCepResponse | null> => {
    try {
        const cleanedCep = cep.replace(/\D/g, '');
        const response = await viaCepApi.get<ViaCepResponse>(`/${cleanedCep}/json/`);
        if (response.data.erro) return null;
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar CEP no ViaCEP:", error);
        return null;
    }
};