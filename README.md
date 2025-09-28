# api

Projeto Node.js com Express, TypeScript e Docker, gerado via script.

## Pré-requisitos

- Node.js (v20+)
- NPM
- Docker e Docker Compose (Opcional, recomendado)

## Instalação

As dependências já foram instaladas pelo script inicial. Caso precise reinstalar:
```bash
npm install
```

## Executando o Projeto

### Com Docker (Recomendado)
Para iniciar o ambiente de desenvolvimento:
```bash
docker compose up --build
```

### Localmente
Para iniciar o servidor em modo de desenvolvimento com hot-reload:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.
O endpoint de verificação de status está em `http://localhost:3333/health`.
