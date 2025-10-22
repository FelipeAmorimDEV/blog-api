import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';

describe('Create Account (E2E)', () => {
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

  it('should be able to create an account', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        user: {
          id: expect.any(String),
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          avatar: '',
          createdAt: expect.any(String),
          updatedAt: undefined,
        },
      });
  });

  it('should not be able to create an account with same email', async () => {
    await prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed-password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('User with same email already exists');
  });

  it('should not be able to create an account with invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        password: '123456',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('should not be able to create an account with missing fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'John Doe',
        // missing email and password
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});