import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';

describe('Posts (E2E)', () => {
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

    // Create test user with bcrypt hashed password
    const bcrypt = require('bcryptjs');
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

  describe('POST /posts', () => {
    it('should be able to create a post', async () => {
      const response = await request(app.getHttpServer())
        .post('/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'My First Post',
          content: 'This is the content of my first post.',
          categoryId: categoryId,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: expect.any(String),
        title: 'My First Post',
        content: 'This is the content of my first post.',
        excerpt: 'This is the content of my first post.',
      }));
    });

    it('should not be able to create a post with missing fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'My First Post',
          // missing content and categoryId
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('GET /posts', () => {
    it('should be able to list all posts', async () => {
      // Create test posts
      await prisma.post.createMany({
        data: [
          {
            id: 'post-1',
            title: 'First Post',
            content: 'Content 1',
            excerpt: 'Excerpt 1',
            slug: 'first-post',
            authorId: userId,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'post-2',
            title: 'Second Post',
            content: 'Content 2',
            excerpt: 'Excerpt 2',
            slug: 'second-post',
            authorId: userId,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/posts');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({
            id: 'post-1',
            title: 'First Post',
            content: 'Content 1',
            excerpt: 'Excerpt 1',
            slug: 'first-post',
            authorId: userId,
            categoryId: categoryId,
          }),
          expect.objectContaining({
            id: 'post-2',
            title: 'Second Post',
            content: 'Content 2',
            excerpt: 'Excerpt 2',
            slug: 'second-post',
            authorId: userId,
            categoryId: categoryId,
          }),
        ]),
      });
    });

    it('should return empty array when no posts exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        posts: [],
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('should be able to get a post by id', async () => {
      const post = await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'My Post',
          content: 'Post content',
          excerpt: 'Post excerpt',
          slug: 'my-post',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/posts/${post.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        post: {
          id: post.id,
          title: 'My Post',
          content: 'Post content',
          excerpt: 'Post excerpt',
          slug: 'my-post',
          imagem: '',
          publishedAt: null,
          isArchived: false,
          isFeatured: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          authorId: userId,
          categoryId: categoryId,
        },
      });
    });

    it('should return 404 when post does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /posts/:id', () => {
    it('should be able to update a post', async () => {
      const post = await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Original Title',
          content: 'Original content',
          excerpt: 'Original excerpt',
          slug: 'original-title',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .put(`/posts/${post.id}`)
        .send({
          title: 'Updated Title',
          content: 'Updated content',
        });

        console.log('=== DEBUG INFO ===');
console.log('User ID:', userId);
console.log('Response Status:', response.statusCode);
console.log('Response Body:', JSON.stringify(response.body, null, 2));
console.log('Request URL:', `/users/${userId}`);
console.log('==================');

      expect(response.statusCode).toBe(200);
      expect(response.body.post).toEqual(expect.objectContaining({
        id: post.id,
      }));
    });

    it('should return 404 when updating non-existent post', async () => {
      const response = await request(app.getHttpServer())
        .put('/posts/non-existent-id')
        .send({
          title: 'Updated Title',
        });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should be able to delete a post', async () => {
      const post = await prisma.post.create({
        data: {
          id: 'post-1',
          title: 'Post to Delete',
          content: 'Content',
          excerpt: 'Excerpt',
          slug: 'post-to-delete',
          authorId: userId,
          categoryId: categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .delete(`/posts/${post.id}`);

      expect(response.statusCode).toBe(204);

      // Verify post was deleted
      const deletedPost = await prisma.post.findUnique({
        where: { id: post.id },
      });
      expect(deletedPost).toBeNull();
    });

    it('should return 404 when deleting non-existent post', async () => {
      const response = await request(app.getHttpServer())
        .delete('/posts/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });
});
