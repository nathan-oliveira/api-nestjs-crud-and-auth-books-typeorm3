import {
  Body,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
  Get,
  Put,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request, Express } from 'express';
import { plainToClass } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorator';
import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';

import { UsersService } from 'src/modules/users/shared/users.service';
import { ReadProfileDto, UpdateProfileDto } from 'src/modules/profile/dtos';

@ApiTags('Profile')
@JwtAuth(Rule.USER, Rule.ADMIN)
@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: ReadProfileDto })
  async profile(@Req() req: Request): Promise<ReadProfileDto> {
    const { id } = <any>req.user;
    const user = await this.usersService.findById(id);
    return plainToClass(ReadProfileDto, user);
  }

  @Put()
  @ApiOkResponse({ type: ReadProfileDto })
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'profile' })),
  )
  async update(
    @Req() req: Request,
    @Body() updateProfile: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadProfileDto> {
    const { id } = <any>req.user;

    const result = await this.usersService.updateAndUpload(
      id,
      updateProfile,
      file?.path,
    );

    return plainToClass(ReadProfileDto, result);
  }

  @Patch()
  @ApiOkResponse({ type: ReadProfileDto })
  async disableAccount(@Req() req: Request) {
    const { id } = <any>req.user;
    const user = await this.usersService.disableOrActivate(id);
    return plainToClass(ReadProfileDto, user);
  }

  @Delete(':id/photo')
  @ApiNoContentResponse()
  async removePhoto(@Req() req: Request): Promise<void> {
    const { id } = <any>req.user;
    return await this.usersService.removePhoto(id);
  }
}
