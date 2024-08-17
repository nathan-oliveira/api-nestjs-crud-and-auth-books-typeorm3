import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { I18nGlobalService } from 'src/common/i18n/i18n-global.service';
import { IUserService } from 'src/modules/users/interfaces/user-service.interface';
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
} from 'src/common/base/utils/storage-local';

import { convertToHash } from 'src/common/utils/bcrypt';

@Injectable()
export class UsersService
  extends BaseService<UserEntity>
  implements IUserService
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
        this.i18n.translate('user.usernameAlreadyExists'),
        HttpStatus.CONFLICT,
      );
    }

    if (user.email === email) {
      throw new HttpException(
        this.i18n.translate('user.emailAlreadyExists'),
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
      if (!user)
        throw new NotFoundException(this.i18n.translate('user.userNotFound'));
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
