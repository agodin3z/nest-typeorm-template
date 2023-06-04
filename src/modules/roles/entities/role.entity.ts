import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ParanoidEntity } from '../../../common/entities/paranoid.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'roles' })
export class Role extends ParanoidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[];
}
