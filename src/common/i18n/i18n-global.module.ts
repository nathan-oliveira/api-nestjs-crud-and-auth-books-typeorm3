import { Module, Global } from '@nestjs/common';
import {
  I18nModule,
  AcceptLanguageResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { I18nGlobalService } from './i18n-global.service';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '..', '..', '/locales/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
    }),
  ],
  providers: [I18nGlobalService],
  exports: [I18nGlobalService],
})
export class I18nGlobalModule {}
