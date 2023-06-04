import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

import { RoleDto } from './../../roles/dtos/role.dto';

export class UserDto implements Readonly<UserDto> {
  @ApiProperty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @Expose()
  active: boolean;

  @ApiProperty()
  @IsString()
  @Expose()
  firstname: string;

  @ApiProperty()
  @IsString()
  @Expose()
  lastname: string;

  @ApiProperty()
  @IsString()
  @Expose()
  roleId: string;

  @ApiProperty()
  @Type(() => RoleDto)
  @Expose()
  role?: RoleDto;
}
