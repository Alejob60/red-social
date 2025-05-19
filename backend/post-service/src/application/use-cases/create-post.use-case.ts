import { Injectable, Inject } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('PostRepository') private readonly repo: PostRepository
  ) {}

  async execute(authorId: string, content: string) {
    return this.repo.create({ authorId, content });
  }
}
