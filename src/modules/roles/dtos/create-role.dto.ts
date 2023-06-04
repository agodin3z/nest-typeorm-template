import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserDto } from '../../users/dtos/user.dto';

export class CreateRoleDto implements Readonly<CreateRoleDto> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @Type(() => UserDto)
  users?: UserDto[];

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
