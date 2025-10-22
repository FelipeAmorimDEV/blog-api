import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';

describe('Posts With Relations (E2E)', () => {
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

  describe('GET /posts-with-relations', () => {
    it('should be able to list all posts with relations', async () => {
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
        .get('/posts-with-relations');

      expect(response.statusCode).toBe(200);
      expect(response.body.postsWithRelations).toHaveLength(2);
      expect(response.body.postsWithRelations[0]).toEqual(expect.objectContaining({
        post: expect.objectContaining({
          id: 'post-1',
          title: 'First Post',
          content: 'Content 1',
          excerpt: 'Excerpt 1',
          slug: 'first-post',
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

    it('should return empty array when no posts exist', async () => {
      // Delete all posts first
      await prisma.post.deleteMany();
      
      const response = await request(app.getHttpServer())
        .get('/posts-with-relations');

      expect(response.statusCode).toBe(200);
      expect(response.body.postsWithRelations).toEqual([]);
    });
  });
});
