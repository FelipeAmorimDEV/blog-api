import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({
    description: 'ID único do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Título do post',
    example: 'Meu Primeiro Post',
  })
  title!: string;

  @ApiProperty({
    description: 'Conteúdo completo do post',
    example: 'Este é o conteúdo completo do post...',
  })
  content!: string;

  @ApiProperty({
    description: 'Resumo do post',
    example: 'Este é um resumo do post...',
  })
  excerpt!: string;

  @ApiProperty({
    description: 'Slug do post (URL amigável)',
    example: 'meu-primeiro-post',
  })
  slug!: string;

  @ApiProperty({
    description: 'URL da imagem do post',
    example: 'https://example.com/imagem-post.jpg',
  })
  imagem!: string;

  @ApiProperty({
    description: 'Data de publicação do post',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  publishedAt?: Date;

  @ApiProperty({
    description: 'Indica se o post está arquivado',
    example: false,
  })
  isArchived!: boolean;

  @ApiProperty({
    description: 'Indica se o post está em destaque',
    example: false,
  })
  isFeatured!: boolean;

  @ApiProperty({
    description: 'Data de criação do post',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Data de última atualização do post',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: 'ID do autor do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  authorId!: string;

  @ApiProperty({
    description: 'ID da categoria do post',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  categoryId!: string;
}

export class PostsListResponseDto {
  @ApiProperty({
    description: 'Lista de posts',
    type: [PostResponseDto],
  })
  posts!: PostResponseDto[];
}

export class PostResponseWrapperDto {
  @ApiProperty({
    description: 'Dados do post',
    type: PostResponseDto,
  })
  post!: PostResponseDto;
}
