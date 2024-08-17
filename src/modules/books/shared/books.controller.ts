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
  ReadBookDto,
  QueryParamsBookDto,
  CreateBookDto,
  UpdateBookDto,
} from 'src/modules/books/dtos';

import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';
import { UserAuth } from 'src/common/decorators/user-auth.decorator';
import { LoginUserDto } from 'src/modules/auth/dtos';
import { BooksService } from './books.service';

@ApiTags('Books')
@JwtAuth(Rule.USER, Rule.ADMIN)
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'books' })),
  )
  @ApiOkResponse({ type: ReadBookDto })
  async create(
    @UserAuth() { id, rule }: LoginUserDto,
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadBookDto> {
    const userId = rule === Rule.ADMIN ? createBookDto.userId || id : id;
    const book = await this.booksService.createAndUpload(
      { ...createBookDto, userId },
      file?.path,
    );

    return plainToClass(ReadBookDto, book);
  }

  @Get()
  @ApiOkResponse({ type: [ReadBookDto] })
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() queryParams: QueryParamsBookDto,
  ): Promise<ReadBookDto[]> {
    const { items, meta } = await this.booksService.findByPaginate(queryParams);

    res.setHeader('X-Total-Items', meta.totalItems);
    return plainToClass(ReadBookDto, items);
  }

  @Get('photo')
  async getPhoto(
    @Query('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StealableFile> {
    const { file, mimetype } = await this.booksService.getPhoto(id);
    res.set({ 'Content-Type': mimetype });
    return new StealableFile(file);
  }

  @Get(':id')
  @ApiOkResponse({ type: ReadBookDto })
  async findOne(@ParamId() id: string): Promise<ReadBookDto> {
    const book = await this.booksService.findById(id);
    return plainToClass(ReadBookDto, book);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', MulterMiddleware.getStorage({ folder: 'books' })),
  )
  @ApiOkResponse({ type: ReadBookDto })
  async update(
    @ParamId('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadBookDto> {
    const book = await this.booksService.updateAndUpload(
      id,
      updateBookDto,
      file?.path,
    );

    return plainToClass(ReadBookDto, book);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReadBookDto })
  async disableOrActivate(@ParamId() id: string): Promise<ReadBookDto> {
    const book = await this.booksService.disableOrActivate(id);
    return plainToClass(ReadBookDto, book);
  }

  @Delete('photo')
  @ApiNoContentResponse()
  async removePhoto(@Query('id') id: string): Promise<void> {
    await this.booksService.removePhoto(id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@ParamId() id: string): Promise<void> {
    await this.booksService.remove(id);
  }
}
