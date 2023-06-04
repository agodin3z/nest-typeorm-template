import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto implements Readonly<UpdateUserDto> {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  roleId?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
