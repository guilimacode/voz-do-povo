# Voz do Povo

Este é o aplicativo móvel do projeto 'Voz do Povo', um canal para registro e visualização de denúncias, conectando o cidadão aos órgãos governamentais.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **React Native**
* **Expo**
* **TypeScript**

## Pré-requisitos

Para rodar o projeto, você vai precisar de:
* **Node.js** (versão 18 ou superior)
* O aplicativo **Expo Go** instalado no seu celular (Android/iOS)
* **Servidor Backend:** Este aplicativo atua como o cliente (frontend) e consome a API REST fornecida pelo backend. Sua execução é, portanto, um requisito obrigatório. Clone e configure o servidor: **[voz-do-povo-api](https://github.com/rayssakesia/voz-do-povo-api)**.

## Executando o Projeto

Siga os passos abaixo para executar o aplicativo no seu ambiente local.

**1. Clone o repositório:**
```bash
git clone https://github.com/guilimacode/voz-do-povo.git
```

**2. Acesse a pasta do projeto:**
```bash
cd voz-do-povo
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Inicie o servidor de desenvolvimento:**
```bash
npx expo start
```

**5. Abra no seu celular:**
Após o comando anterior, um QR Code aparecerá no seu terminal.
* Abra o app **Expo Go** no seu celular.
* Use a opção "Scan QR Code" para ler o código do terminal.
* O aplicativo "Voz do Povo" será carregado no seu dispositivo.

> Seu computador e seu celular precisam estar conectados na mesma rede Wi-Fi.