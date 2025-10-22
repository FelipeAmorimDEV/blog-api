import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetPostBySlugWithRelationsUseCase } from "./get-post-by-slug-with-relations"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetPostBySlugWithRelationsUseCase

describe('Get Post By Slug With Relations', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetPostBySlugWithRelationsUseCase(inMemoryPostsRepository)
  })

  it('should be able to get a post by slug with relations', async () => {
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

    const result = await sut.execute({ slug: 'post-1' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.postWithRelations.post).toEqual(expect.objectContaining({
      
        title: 'Post 1',
        content: 'Content 1',
        excerpt: 'Excerpt 1',
        slug: 'post-1'
      }))
    }
     
  })

  it('should not be able to get a post with non-existent slug', async () => {
    const result = await sut.execute({ slug: 'non-existent-slug' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual({ message: 'Post não encontrado' })
  })
})
