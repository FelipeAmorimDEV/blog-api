import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Título Atualizado',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Conteúdo completo do post',
    example: 'Conteúdo atualizado...',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: 'Resumo do post',
    example: 'Resumo atualizado...',
    required: false,
  })
  excerpt?: string;

  @ApiProperty({
    description: 'ID da categoria do post',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'URL da imagem do post',
    example: 'https://example.com/imagem-post-atualizada.jpg',
    required: false,
  })
  imagem?: string;

  @ApiProperty({
    description: 'Data de publicação do post (null para despublicar)',
    example: '2024-01-15T10:30:00.000Z',
    required: false,
  })
  publishedAt?: string | null;
}
