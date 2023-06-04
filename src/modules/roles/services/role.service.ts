import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleDto } from '../dtos/role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  private readonly logger: Logger;

  constructor(@InjectRepository(Role) private readonly repo: Repository<Role>) {
    this.logger = new Logger(RoleService.name);
  }

  async create(input: CreateRoleDto): Promise<RoleDto> {
    try {
      const role = this.repo.create(input);
      const errors = await validate(role);
      if (errors.length > 0) {
        throw new HttpException("Couldn't create Role", HttpStatus.CONFLICT, {
          cause: new Error(`${errors}`),
        });
      } else {
        const saveRole = await this.repo.save(role);
        return plainToInstance(RoleDto, saveRole);
      }
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't create Role",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async findAll(options?: FindManyOptions<Role>): Promise<RoleDto[]> {
    try {
      const roles = await this.repo.find({
        order: { createdAt: 'desc' },
        ...options,
      });
      return plainToInstance(RoleDto, roles) ?? [];
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't get roles",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async findOne(id: string, options?: FindOneOptions<Role>): Promise<RoleDto> {
    try {
      const role = await this.repo.findOne({
        where: { id },
        ...options,
      });
      if (!role) {
        throw new NotFoundException("Couldn't find role");
      }
      return plainToInstance(RoleDto, role);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't find the role",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async update(id: string, input: UpdateRoleDto): Promise<RoleDto> {
    try {
      const updated = await this.repo.update({ id }, input);
      if (!updated.affected) {
        throw new NotFoundException("Couldn't update Role");
      }
      const role = await this.repo.findOne({
        where: { id },
      });
      return plainToInstance(RoleDto, role);
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't update Role",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const countryRemoved = await this.repo.softDelete({ id });
      if (!countryRemoved.affected) {
        throw new NotFoundException(`Couldn't remove Role with id ${id}`);
      }
      return { response: `Role with id ${id} was deleted` };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't remove Role",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }
}
