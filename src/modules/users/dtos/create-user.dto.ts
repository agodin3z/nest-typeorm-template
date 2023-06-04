import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Readonly<CreateUserDto> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
