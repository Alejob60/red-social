// src/domain/repositories/post.repository.ts
import { PostEntity } from '../entities/post.entity';

export abstract class PostRepository {
  abstract create(data: { authorId: string; content: string }): Promise<PostEntity>;
  abstract findAllExceptUser(authorId: string): Promise<PostEntity[]>;
}
