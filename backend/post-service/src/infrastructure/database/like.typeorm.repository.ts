import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../../domain/entities/like.entity';
import { LikeRepository } from '../../domain/repositories/like.repository';

@Injectable()
export class LikeRepositoryImpl extends LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly repo: Repository<LikeEntity>,
  ) {
    super();
  }

  async like(userId: string, postId: string) {
    const existing = await this.repo.findOne({ where: { userId, postId } });
    if (existing) return { message: 'Ya le diste like a este post.' };

    const like = this.repo.create({ userId, postId });
    await this.repo.save(like);
    return { message: 'Like registrado.' };
  }
}
