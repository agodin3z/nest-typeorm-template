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

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('auth')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Log in' })
  login(@Body() body: any): Promise<{ token: string }> {
    return this.service.authenticate(body);
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Create an user' })
  create(@Body() createBody: CreateUserDto): Promise<UserDto> {
    return this.service.create(createBody);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Get all users' })
  findAll(@Query('filter') filter?: string): Promise<UserDto[]> {
    let options = {};
    if (filter) {
      options = { ...JSON.parse(filter ?? '{}') };
    }
    return this.service.findAll(options);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Get an user' })
  findOne(
    @Param('id') id: string,
    @Query('filter') filter?: string,
  ): Promise<UserDto> {
    let options = {};
    if (filter) {
      options = { ...JSON.parse(filter ?? '{}') };
    }
    return this.service.findOne(id, options);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Update an user' })
  update(
    @Param('id') id: string,
    @Body() updateBody: UpdateUserDto,
  ): Promise<UserDto> {
    return this.service.update(id, updateBody);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: '' })
  @ApiOperation({ summary: 'Delete an user' })
  remove(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }
}
