import { PostEntity } from '../../domain/entities/post.entity';
import { DataSource } from 'typeorm';

export class PostSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<void> {
    const repo = this.dataSource.getRepository(PostEntity);
    const count = await repo.count();
    if (count > 0) return;

    const posts = [
      {
        authorId: 'c97a4d4a-4fb9-4dec-91fa-5a8026646cc4',
        content: 'Soy user4 y amo programar en NestJS.',
      },
      {
        authorId: 'c9d5746c-74b3-4c31-b877-e221b82ead2f',
        content: 'Publicación de user5, ¡vamos con todo en Periferia!',
      },
      {
        authorId: '33f1ac85-fb03-4768-be37-eabd9b004dab',
        content: 'Hola, soy user1 y esta es mi primera publicación.',
      },
      {
        authorId: '82804549-a731-454f-afe9-9e3aa99496b6',
        content: 'Saludos desde user2. Encantado de estar aquí.',
      },
      {
        authorId: '406fcc3c-0fe2-4252-8604-1e2f7b402cc7',
        content: 'User3 reportándose con un nuevo post.',
      },
    ];

    for (const { authorId, content } of posts) {
      const post = repo.create({ authorId, content });
      await repo.save(post);
      console.log(`Post creado para autor ${authorId}: "${content}"`);
    }
  }
}
