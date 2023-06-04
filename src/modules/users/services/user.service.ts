import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { EncryptionService } from '../../../common/services/encryption.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger;
  private readonly encryption: EncryptionService;

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {
    this.logger = new Logger(UserService.name);
    this.encryption = new EncryptionService();
  }

  async authenticate(input: LoginUserDto): Promise<{ token: string }> {
    try {
      const user = await this.repo.findOne({
        where: { username: input.username },
      });
      if (!user) {
        throw new NotFoundException("Couldn't find user");
      }
      if (!user.active) {
        throw new HttpException(
          "Couldn't login with given user",
          HttpStatus.FORBIDDEN,
          {
            cause: new Error('The user is not active'),
          },
        );
      }
      if (!this.encryption.comparePassword(input.password, user.password)) {
        throw new HttpException(
          "Couldn't login with given user",
          HttpStatus.UNAUTHORIZED,
          {
            cause: new Error('The password is incorrect'),
          },
        );
      }
      const token = this.jwtService.sign({ id: user.id });
      return { token };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't find the user",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async create(input: CreateUserDto): Promise<UserDto> {
    try {
      const user = this.repo.create(input);
      const errors = await validate(user);
      if (errors.length > 0) {
        this.logger.error(errors);
        throw new HttpException("Couldn't create User", HttpStatus.CONFLICT, {
          cause: new Error(`${errors}`),
        });
      } else {
        const saveUser = await this.repo.save(user);
        return plainToInstance(UserDto, saveUser);
      }
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't create User",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async findAll(options?: FindManyOptions<User>): Promise<UserDto[]> {
    try {
      const users = await this.repo.find({
        order: { createdAt: 'desc' },
        ...options,
      });
      return plainToInstance(UserDto, users) ?? [];
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't get users",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async findOne(id: string, options?: FindOneOptions<User>): Promise<UserDto> {
    try {
      const user = await this.repo.findOne({
        where: { id },
        ...options,
      });
      if (!user) {
        throw new NotFoundException("Couldn't find user");
      }
      return plainToInstance(UserDto, user);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't find the user",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }

  async update(id: string, input: UpdateUserDto): Promise<UserDto> {
    try {
      const updated = await this.repo.update({ id }, input);
      if (!updated.affected) {
        throw new NotFoundException("Couldn't update User");
      }
      const user = await this.repo.findOne({
        where: { id },
      });
      return plainToInstance(UserDto, user);
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't update User",
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
        throw new NotFoundException(`Couldn't remove User with id ${id}`);
      }
      return { response: `User with id ${id} was deleted` };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't remove User",
        error?.status || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(`${error}`),
        },
      );
    }
  }
}
