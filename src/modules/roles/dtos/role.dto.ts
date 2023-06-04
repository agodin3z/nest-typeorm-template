import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { UserDto } from '../../users/dtos/user.dto';

export class RoleDto implements Readonly<RoleDto> {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Type(() => UserDto)
  @Expose()
  users?: UserDto[];
}
