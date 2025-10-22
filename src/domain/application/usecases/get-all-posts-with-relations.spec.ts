import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetAllPostsWithRelationsUseCase } from "./get-all-posts-with-relations"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetAllPostsWithRelationsUseCase

describe('Get All Posts With Relations', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetAllPostsWithRelationsUseCase(inMemoryPostsRepository)
  })

  it('should be able to get all posts with relations', async () => {
    const post1 = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1',
      imagem: 'imagem-1'
    })

    const post2 = Post.create({
      title: 'Post 2',
      content: 'Content 2',
      excerpt: 'Excerpt 2',
      authorId: new UniqueEntityID('2'),
      categoryId: new UniqueEntityID('2'),
      slug: 'post-2',
      imagem: 'imagem-2'
    })

    await inMemoryPostsRepository.create(post1)
    await inMemoryPostsRepository.create(post2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.postsWithRelations).toHaveLength(2)
   
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
