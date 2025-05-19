import { Injectable, Inject } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class ListPostsUseCase {
  constructor(
    @Inject('PostRepository') private readonly repo: PostRepository
  ) {}

  async execute(userId: string) {
    return this.repo.findAllExceptUser(userId);
  }
}
