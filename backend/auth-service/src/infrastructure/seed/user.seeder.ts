import { DataSource } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(UserEntity);
  const count = await repo.count();
  if (count > 0) return;

  const users = [
    {
      firstName: 'Simone',
      lastName: 'King',
      birthDate: new Date('1990-03-15'),
      alias: 'simonek',
      email: 'Simone.King@gmail.com',
      password: await bcrypt.hash('123456', 10),
    },
    {
      firstName: 'Edgardo',
      lastName: 'Ankunding',
      birthDate: new Date('1985-06-30'),
      alias: 'edank',
      email: 'Edgardo_Ankunding27@hotmail.com',
      password: await bcrypt.hash('123456', 10),
    },
    {
      firstName: 'Yasmin',
      lastName: 'Metz',
      birthDate: new Date('1993-12-12'),
      alias: 'yasmetz',
      email: 'Yasmin_Metz13@gmail.com',
      password: await bcrypt.hash('123456', 10),
    },
    {
      firstName: 'Alessia',
      lastName: 'Ernser',
      birthDate: new Date('1997-08-22'),
      alias: 'alessia',
      email: 'Alessia_Ernser54@hotmail.com',
      password: await bcrypt.hash('123456', 10),
    },
    {
      firstName: 'Tamia',
      lastName: 'Schuster',
      birthDate: new Date('1988-11-10'),
      alias: 'tschuster',
      email: 'Tamia.Schuster@hotmail.com',
      password: await bcrypt.hash('123456', 10),
    },
  ];

  for (const user of users) {
    const newUser = repo.create(user);
    await repo.save(newUser);
    console.log(`✅ Usuario creado: ${newUser.email}`);
  }
}