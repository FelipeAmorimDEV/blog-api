import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetAllPostsUseCase } from "./get-all-posts"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetAllPostsUseCase

describe('Get All Posts', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetAllPostsUseCase(inMemoryPostsRepository)
  })

  it('should be able to get all posts', async () => {
    const post1 = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1'
    })

    const post2 = Post.create({
      title: 'Post 2',
      content: 'Content 2',
      excerpt: 'Excerpt 2',
      authorId: new UniqueEntityID('2'),
      categoryId: new UniqueEntityID('2'),
      slug: 'post-2'
    })

    await inMemoryPostsRepository.create(post1)
    await inMemoryPostsRepository.create(post2)

    const result = await sut.execute()

    expect(result.posts).toHaveLength(2)
    expect(result.posts).toEqual([post1, post2])
  })

  it('should return empty array when no posts exist', async () => {
    const result = await sut.execute()

    expect(result.posts).toHaveLength(0)
    expect(result.posts).toEqual([])
  })
})

