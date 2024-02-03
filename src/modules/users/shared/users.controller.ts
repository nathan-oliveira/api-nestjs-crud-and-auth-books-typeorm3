import {
  Inject,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  UploadedFile,
  Res,
  Query,
  StreamableFile as StealableFile,
} from '@nestjs/common';

import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { Response, Express } from 'express';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorator';
import { ParamId } from 'src/common/decorators/param-id.decorator';

import {
  ReadUserDto,
  QueryParamsUserDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/modules/users/dtos';

import { IUserUseCasesType, IUserUseCases } from '../usecases/user.use-cases';
import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';

@ApiTags('Users')
@JwtAuth(Rule.USER, Rule.ADMIN)
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    @Inject(IUserUseCasesType)
    private readonly usersService: IUserUseCases,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'profile' })),
  )
  @ApiOkResponse({ type: ReadUserDto })
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadUserDto> {
    const user = await this.usersService.createAndUpload(
      createUserDto,
      file?.path,
    );

    return plainToClass(ReadUserDto, user);
  }

  @Get()
  @ApiOkResponse({ type: [ReadUserDto] })
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() queryParams: QueryParamsUserDto,
  ): Promise<ReadUserDto[]> {
    const { items, meta } = await this.usersService.findByPaginate(queryParams);

    res.setHeader('X-Total-Items', meta.totalItems);
    return plainToClass(ReadUserDto, items);
  }

  @Get('photo')
  async getPhoto(
    @Query('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StealableFile> {
    const { file, mimetype } = await this.usersService.getPhoto(id);
    res.set({ 'Content-Type': mimetype });
    return new StealableFile(file);
  }

  @Get(':id')
  @ApiOkResponse({ type: ReadUserDto })
  async findOne(@ParamId() id: string): Promise<ReadUserDto> {
    const user = await this.usersService.findById(id);
    return plainToClass(ReadUserDto, user);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'profile' })),
  )
  @ApiOkResponse({ type: ReadUserDto })
  async update(
    @ParamId('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadUserDto> {
    const user = await this.usersService.updateAndUpload(
      id,
      updateUserDto,
      file?.path,
    );

    return plainToClass(ReadUserDto, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReadUserDto })
  async disableOrActivate(@ParamId() id: string): Promise<ReadUserDto> {
    const user = await this.usersService.disableOrActivate(id);
    return plainToClass(ReadUserDto, user);
  }

  @Delete('photo')
  @ApiNoContentResponse()
  async removePhoto(@Query('id') id: string): Promise<void> {
    await this.usersService.removePhoto(id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@ParamId() id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
