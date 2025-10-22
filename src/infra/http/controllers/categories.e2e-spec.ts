import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';

describe('Categories (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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
    await prisma.category.deleteMany();

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

  describe('POST /categories', () => {
    it('should be able to create a category', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({
          name: 'Science',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.category).toEqual(expect.objectContaining({
        name: 'Science',
        slug: 'science',
      }));
    });

    it('should not be able to create a category with missing name', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('GET /categories', () => {
    it('should be able to list all categories', async () => {
      // Create additional test category (category-1 already exists from beforeEach)
      await prisma.category.create({
        data: {
          id: 'category-2',
          name: 'Science',
          slug: 'science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/categories');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        categories: expect.arrayContaining([
          expect.objectContaining({
            id: 'category-1',
            name: 'Technology',
            slug: 'technology',
          }),
          expect.objectContaining({
            id: 'category-2',
            name: 'Science',
            slug: 'science',
          }),
        ]),
      });
    });

    it('should return empty array when no categories exist', async () => {
      // Delete all categories first
      await prisma.category.deleteMany();
      
      const response = await request(app.getHttpServer())
        .get('/categories');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        categories: [],
      });
    });
  });

  describe('GET /categories/:id', () => {
    it('should be able to get a category by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/categories/${categoryId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        category: {
          id: categoryId,
          name: 'Technology',
          slug: 'technology',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });

    it('should return 404 when category does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/categories/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /categories/:id', () => {
    it('should be able to update a category', async () => {
      const response = await request(app.getHttpServer())
        .put(`/categories/${categoryId}`)
        .send({
          name: 'Updated Technology',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        category: expect.objectContaining({
          id: categoryId,
          name: 'Updated Technology',
          slug: 'updated-technology',
        }),
      });
    });

    it('should return 404 when updating non-existent category', async () => {
      const response = await request(app.getHttpServer())
        .put('/categories/non-existent-id')
        .send({
          name: 'Updated Name',
        });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /categories/:id', () => {
    it('should be able to delete a category', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/categories/${categoryId}`);

      expect(response.statusCode).toBe(204);

      // Verify category was deleted
      const deletedCategory = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      expect(deletedCategory).toBeNull();
    });

    it('should return 404 when deleting non-existent category', async () => {
      const response = await request(app.getHttpServer())
        .delete('/categories/non-existent-id');

      expect(response.statusCode).toBe(404);
    });
  });
});
