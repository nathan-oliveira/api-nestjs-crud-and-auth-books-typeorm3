import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserUseCases } from 'src/modules/users/usecases/user.use-cases';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { BaseService } from 'src/common/base/base.service';

import {
  ReadUserDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/modules/users/dtos';

import { ReadPhotoDto } from 'src/common/base/dtos/read-photo.dto';

import {
  removeImageStorage,
  updateImageStorage,
} from 'src/common/base/utils/storage';

import { convertToHash } from 'src/common/utils/bcrypt';

@Injectable()
export class UsersService
  extends BaseService<UserEntity>
  implements IUserUseCases
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository, { filters: ['name', 'email', 'username'] });
  }

  async findUserByUserName(username: string): Promise<ReadUserDto> {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async verifyExistUser(data: CreateUserDto | UpdateUserDto): Promise<void> {
    const { email, username } = data;

    const user = await this.repository.findOne({
      where: [{ email }, { username }],
    });

    if (!user) return;

    if (user.username === username) {
      throw new HttpException(
        'Username entered is already in use.',
        HttpStatus.CONFLICT,
      );
    }

    if (user.email === email) {
      throw new HttpException(
        'The email provided is already in use.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async createAndUpload(
    createUserDto: CreateUserDto,
    imagePath: string,
  ): Promise<ReadUserDto> {
    try {
      await this.verifyExistUser(createUserDto);

      const password = await convertToHash(createUserDto.password);
      return await this.create({
        ...createUserDto,
        password,
        photo: imagePath,
      });
    } catch (error) {
      removeImageStorage(imagePath);
      throw error;
    }
  }

  async updateAndUpload(
    id: string,
    updateUserDto: UpdateUserDto,
    imagePath: string,
  ): Promise<ReadUserDto> {
    try {
      const user = await this.repository.preload({ ...updateUserDto, id });
      if (!user) throw new NotFoundException('Register not found.');
      if (imagePath) user.photo = updateImageStorage(imagePath, user.photo);

      const password = await convertToHash(updateUserDto.password);
      if (password) user.password = password;
      return await this.repository.save(user);
    } catch (error) {
      removeImageStorage(imagePath);
      throw error;
    }
  }

  async removePhoto(id: string): Promise<void> {
    await this.destroyImage(id, 'photo');
  }

  async getPhoto(id: string): Promise<ReadPhotoDto> {
    return await this.renderImage(id, 'photo');
  }
}
