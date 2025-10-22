import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('Admin Posts (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;
  let adminId: string;
  let categoryId: string;
  let authToken: string;
  let adminToken: string;

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
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();

    // Create test user with hashed password
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

    // Create test admin user
    const admin = await prisma.user.create({
      data: {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    adminId = admin.id;

    // Create test category
    const category = await prisma.category.create({
      data: {
        id: 'category-1',
        name: 'Technology',
        slug: 'technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    categoryId = category.id;

    // Authenticate regular user
    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john@example.com',
        password: '123456',
      });
    authToken = authResponse.body.token;

    // Authenticate admin user
    const adminAuthResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'admin@example.com',
        password: '123456',
      });
    adminToken = adminAuthResponse.body.token;
  });

  describe('GET /admin/posts/by-status', () => {
    it('should be able to get all posts by status (admin only)', async () => {
      // Create test posts (published and draft)
      await prisma.post.createMany({
        data: [
          {
            id: 'post-1',
            title: 'Published Post',
            content: 'Content 1',
            excerpt: 'Excerpt 1',
            slug: 'published-post',
            authorId: userId,
            categoryId: categoryId,
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'post-2',
            title: 'Draft Post',
            content: 'Content 2',
            excerpt: 'Excerpt 2',
            slug: 'draft-post',
            authorId: userId,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.posts).toHaveLength(2);
      expect(response.body.posts).toEqual([
        expect.objectContaining({
          id: 'post-1',
          title: 'Published Post',
          slug: 'published-post',
          publishedAt: expect.any(String),
        }),
        expect.objectContaining({
          id: 'post-2',
          title: 'Draft Post',
          slug: 'draft-post',
          publishedAt: null,
        }),
      ]);
    });

    it('should return 403 when accessed by non-admin user', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(403);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /admin/posts/by-status/with-relations', () => {
    it('should be able to get all posts by status with relations (admin only)', async () => {
      // Create test posts (published and draft)
      await prisma.post.createMany({
        data: [
          {
            id: 'post-1',
            title: 'Published Post',
            content: 'Content 1',
            excerpt: 'Excerpt 1',
            slug: 'published-post',
            authorId: userId,
            categoryId: categoryId,
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'post-2',
            title: 'Draft Post',
            content: 'Content 2',
            excerpt: 'Excerpt 2',
            slug: 'draft-post',
            authorId: userId,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status/with-relations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.posts).toHaveLength(2);
      expect(response.body.posts).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'post-1',
          title: 'Published Post',
          slug: 'published-post',
          publishedAt: expect.any(String),
          authorName: 'John Doe',
          categoryName: 'Technology',
        }),
        expect.objectContaining({
          id: 'post-2',
          title: 'Draft Post',
          slug: 'draft-post',
          publishedAt: null,
          authorName: 'John Doe',
          categoryName: 'Technology',
        }),
      ]));
    });

    it('should return 403 when accessed by non-admin user', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status/with-relations')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(403);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/posts/by-status/with-relations');

      expect(response.statusCode).toBe(401);
    });
  });
});
