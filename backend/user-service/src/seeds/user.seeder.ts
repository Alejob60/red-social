import { DataSource } from 'typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<void> {
    const repo = this.dataSource.getRepository(UserEntity);

    const count = await repo.count();
    if (count > 0) {
      console.log('⚠️ Usuarios ya existen. Seeder no ejecutado.');
      return;
    }

    const users = [
      {
        firstname: 'Simone',
        lastname: 'King',
        birthdate: new Date('1990-03-15'),
        alias: 'simoneking',
        email: 'Simone.King@gmail.com',
        password: '123456',
      },
      {
        firstname: 'Edgardo',
        lastname: 'Ankunding',
        birthdate: new Date('1985-07-20'),
        alias: 'edgardo27',
        email: 'Edgardo_Ankunding27@hotmail.com',
        password: '123456',
      },
      {
        firstname: 'Yasmin',
        lastname: 'Metz',
        birthdate: new Date('1992-11-08'),
        alias: 'yasmin13',
        email: 'Yasmin_Metz13@gmail.com',
        password: '123456',
      },
      {
        firstname: 'Alessia',
        lastname: 'Ernser',
        birthdate: new Date('1989-05-30'),
        alias: 'alessia54',
        email: 'Alessia_Ernser54@hotmail.com',
        password: '123456',
      },
      {
        firstname: 'Tamia',
        lastname: 'Schuster',
        birthdate: new Date('1995-01-12'),
        alias: 'tamia',
        email: 'Tamia.Schuster@hotmail.com',
        password: '123456',
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = repo.create({ ...user, password: hashedPassword });
      await repo.save(newUser);
      console.log(`✅ Usuario creado: ${user.email}`);
    }
  }
}
