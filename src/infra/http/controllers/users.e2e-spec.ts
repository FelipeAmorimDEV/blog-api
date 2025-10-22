import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('Users (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;

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

    // Create test user
    const hashedPassword = await bcrypt.hash('123456', 8);
    const user = await prisma.user.create({
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
    userId = user.id;
  });

  describe('GET /users', () => {
    it('should be able to list all users', async () => {
      // Create additional test user
      const hashedPassword = await bcrypt.hash('123456', 8);
      await prisma.user.create({
        data: {
          id: 'user-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: hashedPassword,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/users');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        users: expect.arrayContaining([
          expect.objectContaining({
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            avatar: '',
          }),
          expect.objectContaining({
            id: 'user-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: 'user',
            avatar: '',
          }),
        ]),
      });
    });

    it('should return empty array when no users exist', async () => {
      await prisma.user.deleteMany();

      const response = await request(app.getHttpServer())
        .get('/users');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        users: [],
      });
    });
  });

  describe('GET /users/:id', () => {
    it('should be able to get a user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        user: {
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          avatar: '',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });

    it('should return 404 when user does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('should be able to update a user', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          name: 'John Updated',
          email: 'john.updated@example.com',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: userId,
          name: 'John Updated',
          email: 'john.updated@example.com',
          role: 'user',
          avatar: '',
        }),
      });
    });

    it('should be able to update user password', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          password: 'newpassword123',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        }),
      });
    });

    it('should be able to update user role', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          role: 'admin',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
        }),
      });
    });

    it('should be able to update user avatar', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          avatar: 'https://example.com/avatar.jpg',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          avatar: 'https://example.com/avatar.jpg',
        }),
      });
    });

    it('should return 404 when updating non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .put('/users/non-existent-id')
        .send({
          name: 'Updated Name',
        });

      expect(response.statusCode).toBe(404);
    });

    it('should return 409 when email is already in use', async () => {
      // Create another user
      const hashedPassword = await bcrypt.hash('123456', 8);
      await prisma.user.create({
        data: {
          id: 'user-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: hashedPassword,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          email: 'jane@example.com',
        });

      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe('Email already in use');
    });

    it('should not be able to update with invalid email', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          email: 'invalid-email',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should be able to delete a user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${userId}`);

      expect(response.statusCode).toBe(204);

      // Verify user was deleted
      const deletedUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      expect(deletedUser).toBeNull();
    });

    it('should return 404 when deleting non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .delete('/users/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });
});
