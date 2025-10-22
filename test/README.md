# Testes End-to-End

Este diretório contém os testes end-to-end da aplicação usando Vitest e Supertest.

## Configuração

Os testes E2E estão configurados para:
- Usar um banco de dados de teste isolado (schema único por execução)
- Limpar dados entre testes
- Testar toda a stack da aplicação (HTTP → Use Cases → Repositórios → Banco)

## Executando os Testes

```bash
# Executar todos os testes E2E
npm run test:e2e

# Executar com watch mode
npx vitest --config ./vitest.config.e2e.mjs --watch

# Executar testes específicos
npx vitest --config ./vitest.config.e2e.mjs create-account.e2e-spec.ts
```

## Estrutura dos Testes

### Testes de Conta de Usuário (`create-account.e2e-spec.ts`)
- ✅ Criar conta com sucesso
- ✅ Falhar ao criar conta com email duplicado
- ✅ Falhar com email inválido
- ✅ Falhar com campos obrigatórios ausentes

### Testes de Autenticação (`authenticate-user.e2e-spec.ts`)
- ✅ Autenticar usuário com credenciais válidas
- ✅ Falhar com email incorreto
- ✅ Falhar com senha incorreta
- ✅ Falhar com campos ausentes

### Testes de Posts (`posts.e2e-spec.ts`)
- ✅ Criar post
- ✅ Listar todos os posts
- ✅ Buscar post por ID
- ✅ Atualizar post
- ✅ Deletar post
- ✅ Tratamento de erros (404, validação)

### Testes de Categorias (`categories.e2e-spec.ts`)
- ✅ Criar categoria
- ✅ Listar todas as categorias
- ✅ Validação de campos obrigatórios

## Configuração do Banco de Teste

Os testes usam:
- Schema único por execução (evita conflitos)
- Limpeza automática entre testes
- Migrações aplicadas automaticamente
- Desconexão e limpeza após execução

## Variáveis de Ambiente

Certifique-se de ter a variável `DATABASE_URL` configurada para o banco de teste:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog_test"
```

## Cobertura

Os testes cobrem:
- ✅ Validação de entrada (Zod)
- ✅ Lógica de negócio (Use Cases)
- ✅ Persistência de dados (Repositórios)
- ✅ Respostas HTTP (Presenters)
- ✅ Tratamento de erros
- ✅ Códigos de status HTTP
