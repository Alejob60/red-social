import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class PostRepositoryImpl extends PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
  ) {
    super();
  }

  async create(data: { authorId: string; content: string }): Promise<PostEntity> {
    const post = this.repo.create({
      authorId: data.authorId,
      content: data.content,
    });
    return await this.repo.save(post);
  }

  async findAllExceptUser(authorId: string): Promise<PostEntity[]> {
    return await this.repo.find({
      where: { authorId: Not(authorId) },
      order: { createdAt: 'DESC' },
      relations: ['likes'], 
    });
  }
}
