import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';

import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleDto } from '../dtos/role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { RoleService } from '../services/role.service';

@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOkResponse({ type: RoleDto })
  @ApiOperation({ summary: 'Create an role' })
  create(@Body() createBody: CreateRoleDto): Promise<RoleDto> {
    return this.service.create(createBody);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiOkResponse({ type: RoleDto })
  @ApiOperation({ summary: 'Get all roles' })
  findAll(@Query('filter') filter?: string): Promise<RoleDto[]> {
    let options = {};
    if (filter) {
      options = { ...JSON.parse(filter ?? '{}') };
    }
    return this.service.findAll(options);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: RoleDto })
  @ApiOperation({ summary: 'Get an role' })
  findOne(
    @Param('id') id: string,
    @Query('filter') filter?: string,
  ): Promise<RoleDto> {
    let options = {};
    if (filter) {
      options = { ...JSON.parse(filter ?? '{}') };
    }
    return this.service.findOne(id, options);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: RoleDto })
  @ApiOperation({ summary: 'Update an role' })
  update(
    @Param('id') id: string,
    @Body() updateBody: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.service.update(id, updateBody);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: '' })
  @ApiOperation({ summary: 'Delete an role' })
  remove(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }
}
