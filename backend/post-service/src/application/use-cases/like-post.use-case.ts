import { Injectable, Inject } from '@nestjs/common';
import { LikeRepository } from '../../domain/repositories/like.repository';

@Injectable()
export class LikePostUseCase {
  constructor(
    @Inject('LikeRepository') private readonly repo: LikeRepository
  ) {}

  async execute(userId: string, postId: string) {
    return this.repo.like(userId, postId);
  }
}
