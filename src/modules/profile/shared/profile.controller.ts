import {
  Body,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
  Get,
  Put,
  Res,
  Patch,
  Delete,
  Inject,
  StreamableFile as StealableFile,
} from '@nestjs/common';
import { Response, Express } from 'express';
import { plainToClass } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorator';
import { UserAuth } from 'src/common/decorators/user-auth.decorator';
import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';

import { ReadProfileDto, UpdateProfileDto } from 'src/modules/profile/dtos';
import {
  IUserServiceType,
  IUserService,
} from 'src/modules/users/interfaces/user-service.interface';
import { LoginUserDto } from 'src/modules/auth/dtos';

@ApiTags('Profile')
@JwtAuth(Rule.USER, Rule.ADMIN)
@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(
    @Inject(IUserServiceType)
    private readonly usersService: IUserService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ReadProfileDto })
  async profile(@UserAuth() { id }: LoginUserDto): Promise<ReadProfileDto> {
    const user = await this.usersService.findById(id);
    return plainToClass(ReadProfileDto, user);
  }

  @Get('photo')
  async getPhoto(
    @UserAuth() { id }: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StealableFile> {
    const { file, mimetype } = await this.usersService.getPhoto(id);
    res.set({ 'Content-Type': mimetype });
    return new StealableFile(file);
  }

  @Put()
  @ApiOkResponse({ type: ReadProfileDto })
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'profile' })),
  )
  async update(
    @UserAuth() { id }: LoginUserDto,
    @Body() updateProfile: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadProfileDto> {
    const result = await this.usersService.updateAndUpload(
      id,
      updateProfile,
      file?.path,
    );

    return plainToClass(ReadProfileDto, result);
  }

  @Patch()
  @ApiOkResponse({ type: ReadProfileDto })
  async disableAccount(@UserAuth() { id }: LoginUserDto) {
    const user = await this.usersService.disableOrActivate(id);
    return plainToClass(ReadProfileDto, user);
  }

  @Delete(':id/photo')
  @ApiNoContentResponse()
  async removePhoto(@UserAuth() { id }: LoginUserDto): Promise<void> {
    return await this.usersService.removePhoto(id);
  }
}
