import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva Atualizado',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.novo@email.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'novaSenha123',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Papel do usuário',
    example: 'ADMIN',
    required: false,
  })
  role?: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;
}
