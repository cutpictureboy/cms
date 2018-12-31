import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../features/article/article.module';
import { UtilModule } from '../common/util/util.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticleModule,
    UtilModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
