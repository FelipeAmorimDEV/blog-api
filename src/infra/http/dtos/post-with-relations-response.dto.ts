import { ApiProperty } from '@nestjs/swagger';

export class PostWithRelationsResponseDto {
  @ApiProperty({
    description: 'Dados do post',
    example: {
      id: 'uuid',
      title: 'Título do Post',
      content: 'Conteúdo do post...',
      excerpt: 'Resumo do post',
      slug: 'titulo-do-post',
      imagem: 'https://example.com/imagem.jpg',
      publishedAt: '2024-01-01T00:00:00.000Z',
      isArchived: false,
      isFeatured: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  })
  post!: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    imagem: string;
    publishedAt: Date | null;
    isArchived: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({
    description: 'Dados do autor do post',
    example: {
      id: 'uuid',
      name: 'João Silva',
      email: 'joao@example.com',
      role: 'user',
      avatar: 'https://example.com/avatar.jpg',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  })
  author!: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({
    description: 'Dados da categoria do post',
    example: {
      id: 'uuid',
      name: 'Tecnologia',
      slug: 'tecnologia',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  })
  category!: {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export class PostWithRelationsWrapperDto {
  @ApiProperty({
    description: 'Post com relacionamentos',
    type: PostWithRelationsResponseDto
  })
  postWithRelations!: PostWithRelationsResponseDto;
}

export class PostsWithRelationsListResponseDto {
  @ApiProperty({
    description: 'Lista de posts com relacionamentos',
    type: [PostWithRelationsResponseDto]
  })
  postsWithRelations!: PostWithRelationsResponseDto[];
}
