export abstract class LikeRepository {
  abstract like(userId: string, postId: string): Promise<any>;
}
