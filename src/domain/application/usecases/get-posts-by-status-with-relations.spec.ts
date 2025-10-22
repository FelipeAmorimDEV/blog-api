import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetPostsByStatusWithRelationsUseCase } from "./get-posts-by-status-with-relations"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetPostsByStatusWithRelationsUseCase

describe('Get Posts By Status With Relations', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetPostsByStatusWithRelationsUseCase(inMemoryPostsRepository)
  })

  it('should be able to get all posts by status with relations (published and drafts)', async () => {
    const publishedPost = Post.create({
      title: 'Published Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'published-post',
      publishedAt: new Date(),
      imagem: 'imagem-1'
    })

    const draftPost = Post.create({
      title: 'Draft Post',
      content: 'Content 2',
      excerpt: 'Excerpt 2',
      authorId: new UniqueEntityID('2'),
      categoryId: new UniqueEntityID('2'),
      slug: 'draft-post',
      imagem: 'imagem-2'
    })

    await inMemoryPostsRepository.create(publishedPost)
    await inMemoryPostsRepository.create(draftPost)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.postsWithRelations).toHaveLength(2)
      expect(result.value.postsWithRelations[0]).toEqual(expect.objectContaining({
        post: expect.objectContaining({
          title: 'Published Post',
          content: 'Content 1',
          excerpt: 'Excerpt 1',
          slug: 'published-post'
        })
      }))
      
    }
  })

  it('should return empty array when no posts exist', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.postsWithRelations).toHaveLength(0)
      expect(result.value.postsWithRelations).toEqual([])
    }
  })
})
