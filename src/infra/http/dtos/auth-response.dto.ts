import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT para autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token!: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
    type: 'object',
  })
  user!: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
