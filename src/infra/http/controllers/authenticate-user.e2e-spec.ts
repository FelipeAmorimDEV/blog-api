import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('Authenticate User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should be able to authenticate a user', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8);

    await prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john@example.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        avatar: '',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it('should not be able to authenticate with wrong email', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8);

    await prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'wrong@example.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should not be able to authenticate with wrong password', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8);

    await prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john@example.com',
        password: 'wrong-password',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should not be able to authenticate with missing fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john@example.com',
        // missing password
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});
