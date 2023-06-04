import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParanoidEntity } from '../../../common/entities/paranoid.entity';
import { Role } from './../../roles/entities/role.entity';

@Entity({ name: 'users' })
export class User extends ParanoidEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, unique: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @Column({ name: 'roleId' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
