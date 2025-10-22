import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  name!: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Papel do usuário',
    example: 'USER',
  })
  role!: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
  })
  avatar!: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Data de última atualização do usuário',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date;
}

export class UsersListResponseDto {
  @ApiProperty({
    description: 'Lista de usuários',
    type: [UserResponseDto],
  })
  users!: UserResponseDto[];
}

export class UserResponseWrapperDto {
  @ApiProperty({
    description: 'Dados do usuário',
    type: UserResponseDto,
  })
  user!: UserResponseDto;
}
