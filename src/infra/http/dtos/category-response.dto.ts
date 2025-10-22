import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Tecnologia',
  })
  name!: string;

  @ApiProperty({
    description: 'Slug da categoria (URL amigável)',
    example: 'tecnologia',
  })
  slug!: string;

  @ApiProperty({
    description: 'Data de criação da categoria',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Data de última atualização da categoria',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date;
}

export class CategoriesListResponseDto {
  @ApiProperty({
    description: 'Lista de categorias',
    type: [CategoryResponseDto],
  })
  categories!: CategoryResponseDto[];
}

export class CategoryResponseWrapperDto {
  @ApiProperty({
    description: 'Dados da categoria',
    type: CategoryResponseDto,
  })
  category!: CategoryResponseDto;
}
