# 📝 Blog API

Uma API RESTful robusta para gerenciamento de blog, construída com NestJS, seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD).

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários e E2E
- **[Docker](https://www.docker.com/)** - Containerização

## 📋 Funcionalidades

### 👥 Usuários
- ✅ Criar conta de usuário
- ✅ Autenticação com JWT
- ✅ Listar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Atualizar dados do usuário
- ✅ Deletar usuário
- ✅ Sistema de roles (USER/ADMIN)

### 📝 Posts
- ✅ Criar posts
- ✅ Listar todos os posts
- ✅ Buscar post por ID
- ✅ Atualizar posts
- ✅ Deletar posts
- ✅ Geração automática de slug
- ✅ Sistema de categorias
- ✅ Posts em destaque (featured)
- ✅ Arquivamento de posts

### 🏷️ Categorias
- ✅ Criar categorias
- ✅ Listar todas as categorias
- ✅ Buscar categoria por ID
- ✅ Atualizar categorias
- ✅ Deletar categorias
- ✅ Geração automática de slug

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**:

```
src/
├── core/                    # Camada de núcleo (compartilhada)
│   ├── entities/           # Entidades base, Value Objects
│   ├── errors/             # Erros customizados
│   ├── events/             # Domain Events
│   ├── repositories/       # Interfaces de repositórios
│   └── utils/              # Utilitários (slugify, etc)
├── domain/                  # Camada de domínio
│   ├── application/        # Casos de uso e repositórios
│   │   ├── repositories/   # Interfaces dos repositórios
│   │   └── usecases/       # Casos de uso da aplicação
│   └── enterprise/         # Entidades de negócio
│       └── entities/       # Entidades do domínio
└── infra/                   # Camada de infraestrutura
    ├── auth/               # Autenticação e autorização
    ├── database/           # Prisma e repositórios
    │   └── repositories/   # Implementações dos repositórios
    └── http/               # Controllers, DTOs e Pipes
        ├── controllers/    # Controllers HTTP
        ├── dtos/           # Data Transfer Objects
        └── pipes/          # Pipes de validação
```

### Conceitos Aplicados

- **Entities**: Entidades de domínio com identidade única
- **Value Objects**: Objetos de valor imutáveis
- **Use Cases**: Casos de uso isolados e testáveis
- **Repository Pattern**: Abstração da camada de dados
- **Domain Events**: Comunicação entre agregados
- **Dependency Injection**: Inversão de controle

## 🔧 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- NPM ou Yarn

## ⚙️ Instalação

1. **Clone o repositório:**
```bash
git clone [<url-do-repositorio>](https://github.com/FelipeAmorimDEV/blog-api.git)
cd blog-api
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:docker@localhost:5432/blog-api?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura"

# Application
PORT=3000
```

4. **Inicie o banco de dados com Docker:**
```bash
docker-compose up -d
```

5. **Execute as migrations:**
```bash
npx prisma migrate dev
```

6. **Inicie a aplicação:**
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

## 🗄️ Banco de Dados

### Modelos

**User (Usuário)**
- id (UUID)
- name (string)
- email (string, único)
- password (string, hash bcrypt)
- role (string, padrão: "user")
- avatar (string, opcional)
- createdAt (DateTime)
- updatedAt (DateTime)

**Post (Postagem)**
- id (UUID)
- title (string)
- content (string)
- excerpt (string)
- slug (string, único)
- imagem (string)
- publishedAt (DateTime, opcional)
- isArchived (boolean)
- isFeatured (boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
- authorId (UUID)
- categoryId (UUID)

**Category (Categoria)**
- id (UUID)
- name (string)
- slug (string, único)
- createdAt (DateTime)
- updatedAt (DateTime)

### Comandos Prisma Úteis

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name nome-da-migration

# Visualizar banco de dados
npx prisma studio

# Reset do banco de dados
npx prisma migrate reset
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### 👥 Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/accounts` | Criar nova conta | Não |
| POST | `/sessions` | Autenticar usuário | Não |
| GET | `/users` | Listar usuários | Não |
| GET | `/users/:id` | Buscar usuário por ID | Não |
| PUT | `/users/:id` | Atualizar usuário | Sim |
| DELETE | `/users/:id` | Deletar usuário | Sim |

### 📝 Posts

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/posts` | Criar post | Sim |
| GET | `/posts` | Listar posts | Não |
| GET | `/posts/:id` | Buscar post por ID | Não |
| PUT | `/posts/:id` | Atualizar post | Sim |
| DELETE | `/posts/:id` | Deletar post | Sim |

### 🏷️ Categorias

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/categories` | Criar categoria | Sim |
| GET | `/categories` | Listar categorias | Não |
| GET | `/categories/:id` | Buscar categoria por ID | Não |
| PUT | `/categories/:id` | Atualizar categoria | Sim |
| DELETE | `/categories/:id` | Deletar categoria | Sim |

Para documentação detalhada dos endpoints, consulte [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. 

### Como autenticar:

1. **Crie uma conta:**
```bash
POST /accounts
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

2. **Faça login:**
```bash
POST /sessions
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

3. **Use o token retornado:**
```bash
Authorization: Bearer <seu-token-jwt>
```

## 🧪 Testes

O projeto utiliza Vitest para testes unitários e E2E.

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov

# Executar testes E2E
npm run test:e2e
```

### Estrutura de Testes

```
test/
├── repositories/           # Repositórios in-memory para testes
│   ├── in-memory-users-repository.ts
│   ├── in-memory-posts-repository.ts
│   └── in-memory-categories-repository.ts
└── setup-e2e.ts           # Configuração dos testes E2E
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo desenvolvimento com watch
npm run start:debug        # Inicia em modo debug

# Build e Produção
npm run build              # Compila o projeto
npm run start:prod         # Inicia em modo produção

# Qualidade de Código
npm run format             # Formata código com Prettier
npm run lint               # Executa ESLint

# Testes
npm test                   # Executa testes
npm run test:watch         # Testes em modo watch
npm run test:cov           # Testes com cobertura
npm run test:e2e           # Testes E2E
```

## 📦 Dependências Principais

### Produção
- `@nestjs/common` - Core do NestJS
- `@nestjs/jwt` - Autenticação JWT
- `@nestjs/passport` - Integração com Passport
- `@prisma/client` - Cliente Prisma ORM
- `bcryptjs` - Hash de senhas
- `zod` - Validação de schemas

### Desenvolvimento
- `@nestjs/testing` - Utilitários de teste
- `vitest` - Framework de testes
- `prisma` - CLI do Prisma
- `typescript` - Compilador TypeScript

## 🌟 Boas Práticas Implementadas

- ✅ Clean Architecture e DDD
- ✅ SOLID Principles
- ✅ Repository Pattern
- ✅ Dependency Injection
- ✅ Domain Events
- ✅ Value Objects
- ✅ Validação com Zod
- ✅ Tratamento de erros customizado
- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Geração automática de slugs
- ✅ Testes unitários e E2E
- ✅ Docker para desenvolvimento
- ✅ Migrations com Prisma

## 📝 Exemplos de Uso

### Criar um post completo

```bash
# 1. Criar conta
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'

# 2. Fazer login
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "senha123"
  }'

# 3. Criar categoria
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "name": "Tecnologia"
  }'

# 4. Criar post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Este é o conteúdo do meu primeiro post...",
    "excerpt": "Resumo do post",
    "authorId": "<uuid-do-usuario>",
    "categoryId": "<uuid-da-categoria>"
  }'
```

## 🔄 Fluxo de Desenvolvimento

1. **Criar feature branch**
```bash
git checkout -b feature/nova-funcionalidade
```

2. **Implementar seguindo Clean Architecture**
   - Criar entidade no domínio (`src/domain/enterprise/entities`)
   - Criar caso de uso (`src/domain/application/usecases`)
   - Criar repositório (`src/domain/application/repositories`)
   - Implementar repositório Prisma (`src/infra/database/repositories`)
   - Criar controller (`src/infra/http/controllers`)
   - Criar DTOs (`src/infra/http/dtos`)

3. **Escrever testes**
```bash
npm run test:watch
```

4. **Commit e push**
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
```bash
# Verifique se o container está rodando
docker ps

# Reinicie o container
docker-compose restart

# Verifique os logs
docker-compose logs postgres
```

### Erro ao executar migrations
```bash
# Reset o banco de dados
npx prisma migrate reset

# Execute novamente
npx prisma migrate dev
```

### Porta já em uso
```bash
# Encontre o processo usando a porta
lsof -i :3000

# Ou altere a porta no .env
PORT=3001
```

## 📄 Licença

Este projeto é licenciado sob a licença UNLICENSED - veja o arquivo package.json para detalhes.

## 👨‍💻 Autor

Felipe Amorim

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!


