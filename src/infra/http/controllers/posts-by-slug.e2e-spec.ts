import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';

describe('Posts By Slug (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;
  let categoryId: string;

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

    // Create test user
    const user = await prisma.user.create({
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
  });

  describe('GET /posts/slug/:slug', () => {
    it('should be able to get a post by slug', async () => {
      // Create test post
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'My First Post',
          content: 'This is the content of my first post.',
          excerpt: 'A brief excerpt of the post',
          slug: 'my-first-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/posts/slug/my-first-post');

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: 'post-1',
        title: 'My First Post',
        content: 'This is the content of my first post.',
        excerpt: 'A brief excerpt of the post',
        slug: 'my-first-post',
      }));
    });

    it('should return 404 when post is not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/slug/non-existent-slug');

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });

  describe('GET /posts/slug/:slug/with-relations', () => {
    it('should be able to get a post by slug with relations', async () => {
      // Create test post
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'My First Post',
          content: 'This is the content of my first post.',
          excerpt: 'A brief excerpt of the post',
          slug: 'my-first-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/posts/slug/my-first-post/with-relations');

      expect(response.statusCode).toBe(200);
      expect(response.body.postWithRelations).toEqual(expect.objectContaining({
        post: expect.objectContaining({
          id: 'post-1',
          title: 'My First Post',
          content: 'This is the content of my first post.',
          excerpt: 'A brief excerpt of the post',
          slug: 'my-first-post',
        }),
        author: expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
        }),
        category: expect.objectContaining({
          name: 'Technology',
          slug: 'technology',
        }),
      }));
    });

    it('should return 404 when post is not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/slug/non-existent-slug/with-relations');

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });

  describe('GET /posts/:id/with-relations', () => {
    it('should be able to get a post by id with relations', async () => {
      // Create test post
      await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'My First Post',
          content: 'This is the content of my first post.',
          excerpt: 'A brief excerpt of the post',
          slug: 'my-first-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/posts/post-1/with-relations');

      expect(response.statusCode).toBe(200);
      expect(response.body.postWithRelations).toEqual(expect.objectContaining({
        post: expect.objectContaining({
          id: 'post-1',
          title: 'My First Post',
          content: 'This is the content of my first post.',
          excerpt: 'A brief excerpt of the post',
          slug: 'my-first-post',
        }),
        author: expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
        }),
        category: expect.objectContaining({
          name: 'Technology',
          slug: 'technology',
        }),
      }));
    });

    it('should return 404 when post is not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/non-existent-id/with-relations');

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });
});
