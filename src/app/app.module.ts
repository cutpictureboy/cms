import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../features/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
