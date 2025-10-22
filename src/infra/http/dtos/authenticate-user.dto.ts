import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  password!: string;
}
