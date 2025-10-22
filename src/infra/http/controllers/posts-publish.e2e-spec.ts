import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('Posts Publish (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;
  let categoryId: string;
  let authToken: string;

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

    // Authenticate user to get token
    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john@example.com',
        password: '123456',
      });

    authToken = authResponse.body.token;
  });

  describe('PATCH /posts/:id/publish', () => {
    it('should be able to publish a draft post', async () => {
      // Create test post
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Draft Post',
          content: 'This is a draft post.',
          excerpt: 'A brief excerpt',
          slug: 'draft-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .patch('/posts/post-1/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: 'post-1',
        title: 'Draft Post',
        publishedAt: expect.any(String),
      }));
    });

    it('should be able to unpublish a published post', async () => {
      // Create test post with publishedAt
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Published Post',
          content: 'This is a published post.',
          excerpt: 'A brief excerpt',
          slug: 'published-post',
          authorId: userId,
          categoryId: categoryId,
          publishedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .patch('/posts/post-1/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: 'post-1',
        title: 'Published Post',
        publishedAt: null,
      }));
    });

    it('should return 404 when post is not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/posts/non-existent-id/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .patch('/posts/post-1/publish');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PATCH /posts/slug/:slug/publish', () => {
    it('should be able to publish a draft post by slug', async () => {
      // Create test post
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Draft Post',
          content: 'This is a draft post.',
          excerpt: 'A brief excerpt',
          slug: 'draft-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .patch('/posts/slug/draft-post/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: 'post-1',
        title: 'Draft Post',
        slug: 'draft-post',
        publishedAt: expect.any(String),
      }));
    });

    it('should be able to unpublish a published post by slug', async () => {
      // Create test post with publishedAt
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Published Post',
          content: 'This is a published post.',
          excerpt: 'A brief excerpt',
          slug: 'published-post',
          authorId: userId,
          categoryId: categoryId,
          publishedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .patch('/posts/slug/published-post/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: 'post-1',
        title: 'Published Post',
        slug: 'published-post',
        publishedAt: null,
      }));
    });

    it('should return 404 when post is not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/posts/slug/non-existent-slug/publish')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .patch('/posts/slug/draft-post/publish');

      expect(response.statusCode).toBe(401);
    });
  });
});
