# Repositórios Prisma

Este diretório contém as implementações dos repositórios usando Prisma ORM.

## Repositórios Disponíveis

- **PrismaUsersRepository** - Implementação do repositório de usuários
- **PrismaCategoriesRepository** - Implementação do repositório de categorias  
- **PrismaPostsRepository** - Implementação do repositório de posts

## Como Usar

Os repositórios são injetados via Dependency Injection do NestJS:

```typescript
import { Inject } from '@nestjs/common'
import { UsersRepository } from '@/domain/application/repositories/users-repository'

export class SomeUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}
}
```

## Configuração

Os repositórios são configurados no `DatabaseModule` e exportados com tokens específicos:

- `'UsersRepository'` → PrismaUsersRepository
- `'CategoriesRepository'` → PrismaCategoriesRepository  
- `'PostsRepository'` → PrismaPostsRepository

## Schema do Banco

O schema do Prisma está localizado em `prisma/schema.prisma` e inclui:

- **User** - Usuários do sistema
- **Category** - Categorias dos posts
- **Post** - Posts do blog

## Migrações

Para aplicar as mudanças no banco de dados:

```bash
npx prisma migrate dev
```

