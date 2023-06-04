import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';

import { Role } from './../../modules/roles/entities/role.entity';

export default class RolesSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const newRoles = await dataSource.createEntityManager().create(Role, [
      {
        name: 'root',
        createdBy: 'seed',
        users: [
          {
            password: 'Root1234',
            active: true,
            username: 'root',
            firstname: 'Root',
            lastname: 'User',
            email: 'root.us3r@yopmail.com',
            createdBy: 'seed',
          },
        ],
      },
    ]);
    await dataSource.createEntityManager().save<Role>(newRoles);
  }
}
