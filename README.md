# Verzel Challenge

Desafio técnico - Aplicação de gerenciamento de filmes com integração à API do TMDb.

## Estrutura

- `packages/frontend/` - React + Vite + shadcn/ui
- `packages/backend/` - NestJS + Prisma + PostgreSQL

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- API Key do TMDb

## Configuração

### 1. Variáveis de Ambiente

**Backend** (`packages/backend/.env`):
```env
DATABASE_URL="postgresql://admin:password@localhost:5432/verzel-db?schema=public"
JWT_AUTH_SECRET="seu-secret-jwt-auth-aqui"
JWT_REFRESH_SECRET="seu-secret-jwt-refresh-aqui"
TMDB_API_KEY="sua-api-key-do-tmdb-aqui"
```

**Frontend** (`packages/frontend/.env`):
```env
VITE_API_URL=http://localhost:3000
```

### 2. Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar banco de dados
cd packages/backend
docker-compose up -d

# Executar migrações
npx prisma generate
npx prisma migrate dev

# Iniciar aplicação (raiz do projeto)
npm run dev:all
```

- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`

## Tecnologias

**Backend:** NestJS, TypeScript, Prisma, PostgreSQL, JWT, Swagger
**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui