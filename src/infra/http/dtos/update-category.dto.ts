import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Tecnologia Atualizada',
    required: false,
  })
  name?: string;
}
