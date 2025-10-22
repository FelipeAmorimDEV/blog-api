import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Meu Primeiro Post',
  })
  title!: string;

  @ApiProperty({
    description: 'Conteúdo completo do post',
    example: 'Este é o conteúdo completo do meu primeiro post...',
  })
  content!: string;

  @ApiProperty({
    description: 'ID da categoria do post',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  categoryId!: string;

  @ApiProperty({
    description: 'URL da imagem do post',
    example: 'https://example.com/imagem-post.jpg',
    required: false,
  })
  imagem?: string;
}
