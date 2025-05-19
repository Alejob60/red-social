import { UserRepository } from '../../domain/repositories/user.repository';

export class GetMyProfileUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    // Omitimos la contraseña
    const { password, ...safeData } = user;
    return safeData;
  }
}
