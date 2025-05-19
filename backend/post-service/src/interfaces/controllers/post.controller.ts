import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { ListPostsUseCase } from '../../application/use-cases/list-posts.use-case';
import { LikePostUseCase } from '../../application/use-cases/like-post.use-case';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly listPostsUseCase: ListPostsUseCase,
    private readonly likePostUseCase: LikePostUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: any) {
    const authorId = req.user.userId; // Asegúrate que userId es lo que viene en el JWT
    return await this.createPostUseCase.execute(authorId, dto.content);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const authorId = req.user.userId;
    return await this.listPostsUseCase.execute(authorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/like')
  async like(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.userId;
    return await this.likePostUseCase.execute(postId, userId);
  }
}
