# Smart To-Do List Frontend

Uma aplicação moderna de lista de tarefas inteligente construída com Next.js, React e TypeScript, que utiliza inteligência artificial para gerar tarefas automaticamente.

## 🚀 Funcionalidades

- **Gerenciamento de Tarefas**: Crie, edite, marque como concluída e delete tarefas
- **Geração de Tarefas com IA**: Descreva um objetivo e a IA criará uma lista de tarefas para você
- **Interface Moderna**: Design responsivo e intuitivo com Tailwind CSS
- **Estatísticas em Tempo Real**: Acompanhe o progresso com contadores de tarefas pendentes e concluídas

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

## 📋 Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/GustavoGalo/smart-to-do-list-frontend.git
cd smart-to-do-list-frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
# ou
NEXT_PUBLIC_API_BASE_URL="https://smart-to-do-list-backend.onrender.com/"
```

**Nota**: Certifique-se de que o backend da API esteja rodando na URL especificada. (local)

**Nota**: Caso utilize o url "https://smart-to-do-list-backend.onrender.com/", espere alguns minutos para que a api "acorde" pois ela "dorme" depois de 15 minutos de inatividade.

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### 5. Acesse a aplicação

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── providers.tsx      # Providers (React Query)
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes de UI (shadcn/ui)
├── hooks/                # Custom hooks para operações CRUD
├── lib/                  # Configurações (axios, utils)
└── types.ts              # Definições de tipos TypeScript
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🌐 API Endpoints

A aplicação se conecta a uma API backend que deve fornecer os seguintes endpoints:

- `GET /todo` - Lista todas as tarefas
- `POST /todo` - Cria uma nova tarefa
- `PUT /todo/:id` - Atualiza uma tarefa
- `DELETE /todo/:id` - Remove uma tarefa
- `POST /todo/generate` - Gera tarefas com IA
