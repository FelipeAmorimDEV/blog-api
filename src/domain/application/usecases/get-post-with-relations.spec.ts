import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetPostWithRelationsUseCase } from "./get-post-with-relations"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetPostWithRelationsUseCase

describe('Get Post With Relations', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetPostWithRelationsUseCase(inMemoryPostsRepository)
  })

  it('should be able to get a post by id with relations', async () => {
    const post = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1',
      imagem: 'imagem-1'
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({ id: post.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.postWithRelations.post).toEqual(expect.objectContaining({
        title: 'Post 1',
      }))
     
    }
  })

  it('should not be able to get a post with non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual({ message: 'Post não encontrado' })
  })
})
