import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '@/domain/enterprise/entities/user';

export interface JwtPayload {
  sub: string; // user ID
  email: string;
  name: string;
  role: string;
}

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: NestJwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token);
  }
}
