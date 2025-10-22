# Documentação da API - Blog

Esta documentação descreve todos os endpoints disponíveis na API do blog.

## Base URL
```
http://localhost:3000
```

## Autenticação
A API utiliza autenticação baseada em sessões. Para acessar endpoints protegidos, é necessário primeiro autenticar-se através do endpoint `/sessions`.

---

## 📋 **Usuários (Users)**

### 1. Criar Conta
**POST** `/accounts`

Cria uma nova conta de usuário.

**Body:**
```json
{
  "name": "string",
  "email": "string (email válido)",
  "password": "string"
}
```

**Respostas:**
- `201` - Usuário criado com sucesso
- `409` - Email já está em uso
- `400` - Dados de validação inválidos

**Exemplo de Resposta (201):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "avatar": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Autenticar Usuário
**POST** `/sessions`

Autentica um usuário e retorna os dados da sessão.

**Body:**
```json
{
  "email": "string (email válido)",
  "password": "string"
}
```

**Respostas:**
- `200` - Usuário autenticado com sucesso
- `401` - Credenciais inválidas
- `400` - Dados de validação inválidos

**Exemplo de Resposta (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "avatar": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Listar Todos os Usuários
**GET** `/users`

Retorna uma lista de todos os usuários cadastrados.

**Respostas:**
- `200` - Lista de usuários retornada com sucesso

**Exemplo de Resposta (200):**
```json
{
  "users": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "USER",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Buscar Usuário por ID
**GET** `/users/:id`

Retorna os dados de um usuário específico.

**Parâmetros:**
- `id` (string) - ID do usuário

**Respostas:**
- `200` - Usuário encontrado
- `404` - Usuário não encontrado

**Exemplo de Resposta (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "avatar": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Atualizar Usuário
**PUT** `/users/:id`

Atualiza os dados de um usuário específico.

**Parâmetros:**
- `id` (string) - ID do usuário

**Body:**
```json
{
  "name": "string (opcional)",
  "email": "string (email válido, opcional)",
  "password": "string (opcional)",
  "role": "string (opcional)",
  "avatar": "string (opcional)"
}
```

**Respostas:**
- `200` - Usuário atualizado com sucesso
- `404` - Usuário não encontrado
- `409` - Email já está em uso
- `400` - Dados de validação inválidos

**Exemplo de Resposta (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva Atualizado",
    "email": "joao.novo@email.com",
    "role": "ADMIN",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 6. Deletar Usuário
**DELETE** `/users/:id`

Remove um usuário do sistema.

**Parâmetros:**
- `id` (string) - ID do usuário

**Respostas:**
- `204` - Usuário deletado com sucesso
- `404` - Usuário não encontrado

---

## 📝 **Posts**

### 1. Criar Post
**POST** `/posts`

Cria um novo post no blog.

**Body:**
```json
{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "authorId": "string (UUID)",
  "categoryId": "string (UUID)"
}
```

**Respostas:**
- `201` - Post criado com sucesso
- `400` - Dados de validação inválidos

**Exemplo de Resposta (201):**
```json
{
  "post": {
    "id": "uuid",
    "title": "Título do Post",
    "content": "Conteúdo completo do post...",
    "excerpt": "Resumo do post...",
    "slug": "titulo-do-post",
    "publishedAt": null,
    "isArchived": false,
    "isFeatured": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "authorId": "uuid",
    "categoryId": "uuid"
  }
}
```

### 2. Listar Todos os Posts
**GET** `/posts`

Retorna uma lista de todos os posts.

**Respostas:**
- `200` - Lista de posts retornada com sucesso

**Exemplo de Resposta (200):**
```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "Título do Post",
      "content": "Conteúdo completo do post...",
      "excerpt": "Resumo do post...",
      "slug": "titulo-do-post",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "isArchived": false,
      "isFeatured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "authorId": "uuid",
      "categoryId": "uuid"
    }
  ]
}
```

### 3. Buscar Post por ID
**GET** `/posts/:id`

Retorna os dados de um post específico.

**Parâmetros:**
- `id` (string) - ID do post

**Respostas:**
- `200` - Post encontrado
- `404` - Post não encontrado

**Exemplo de Resposta (200):**
```json
{
  "post": {
    "id": "uuid",
    "title": "Título do Post",
    "content": "Conteúdo completo do post...",
    "excerpt": "Resumo do post...",
    "slug": "titulo-do-post",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "isArchived": false,
    "isFeatured": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "authorId": "uuid",
    "categoryId": "uuid"
  }
}
```

### 4. Atualizar Post
**PUT** `/posts/:id`

Atualiza os dados de um post específico.

**Parâmetros:**
- `id` (string) - ID do post

**Body:**
```json
{
  "title": "string (opcional)",
  "content": "string (opcional)",
  "excerpt": "string (opcional)",
  "categoryId": "string (opcional)"
}
```

**Respostas:**
- `200` - Post atualizado com sucesso
- `404` - Post não encontrado
- `400` - Dados de validação inválidos

**Exemplo de Resposta (200):**
```json
{
  "post": {
    "id": "uuid",
    "title": "Título Atualizado",
    "content": "Conteúdo atualizado...",
    "excerpt": "Resumo atualizado...",
    "slug": "titulo-atualizado",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "isArchived": false,
    "isFeatured": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "authorId": "uuid",
    "categoryId": "uuid"
  }
}
```

### 5. Deletar Post
**DELETE** `/posts/:id`

Remove um post do sistema.

**Parâmetros:**
- `id` (string) - ID do post

**Respostas:**
- `204` - Post deletado com sucesso
- `404` - Post não encontrado

---

## 🏷️ **Categorias**

### 1. Criar Categoria
**POST** `/categories`

Cria uma nova categoria.

**Body:**
```json
{
  "name": "string"
}
```

**Respostas:**
- `201` - Categoria criada com sucesso
- `400` - Dados de validação inválidos

**Exemplo de Resposta (201):**
```json
{
  "category": {
    "id": "uuid",
    "name": "Tecnologia",
    "slug": "tecnologia",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Listar Todas as Categorias
**GET** `/categories`

Retorna uma lista de todas as categorias.

**Respostas:**
- `200` - Lista de categorias retornada com sucesso

**Exemplo de Resposta (200):**
```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Tecnologia",
      "slug": "tecnologia",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Buscar Categoria por ID
**GET** `/categories/:id`

Retorna os dados de uma categoria específica.

**Parâmetros:**
- `id` (string) - ID da categoria

**Respostas:**
- `200` - Categoria encontrada
- `404` - Categoria não encontrada

**Exemplo de Resposta (200):**
```json
{
  "category": {
    "id": "uuid",
    "name": "Tecnologia",
    "slug": "tecnologia",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Atualizar Categoria
**PUT** `/categories/:id`

Atualiza os dados de uma categoria específica.

**Parâmetros:**
- `id` (string) - ID da categoria

**Body:**
```json
{
  "name": "string (opcional)"
}
```

**Respostas:**
- `200` - Categoria atualizada com sucesso
- `404` - Categoria não encontrada
- `400` - Dados de validação inválidos

**Exemplo de Resposta (200):**
```json
{
  "category": {
    "id": "uuid",
    "name": "Tecnologia Atualizada",
    "slug": "tecnologia-atualizada",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 5. Deletar Categoria
**DELETE** `/categories/:id`

Remove uma categoria do sistema.

**Parâmetros:**
- `id` (string) - ID da categoria

**Respostas:**
- `204` - Categoria deletada com sucesso
- `404` - Categoria não encontrada

---

## 📊 **Códigos de Status HTTP**

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Recurso deletado com sucesso |
| 400 | Bad Request - Dados de validação inválidos |
| 401 | Unauthorized - Credenciais inválidas |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email já em uso) |

---

## 🔧 **Validação de Dados**

A API utiliza o Zod para validação de dados. Todos os endpoints que recebem dados no body validam automaticamente:

- **Email**: Deve ser um formato de email válido
- **UUID**: IDs devem estar no formato UUID
- **Campos obrigatórios**: Devem estar presentes no body
- **Campos opcionais**: Podem ser omitidos ou enviados como `null`

---

## 📝 **Exemplos de Uso**

### Criar um usuário e um post

1. **Criar conta:**
```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

2. **Criar categoria:**
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tecnologia"
  }'
```

3. **Criar post:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Este é o conteúdo do meu primeiro post...",
    "excerpt": "Resumo do post",
    "authorId": "uuid-do-usuario",
    "categoryId": "uuid-da-categoria"
  }'
```

---

## 🚀 **Como Executar**

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados (PostgreSQL):
```bash
npx prisma migrate dev
```

3. Execute a aplicação:
```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`
