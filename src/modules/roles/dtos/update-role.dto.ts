import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto implements Readonly<UpdateRoleDto> {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
