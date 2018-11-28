import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ValidationPipe } from './pipe/validate.pipe';
import { SuccessInterceptor } from './interceptor/success.interceptor';
import { ErrorsInterceptor } from './interceptor/error.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(new Reflector()),
    new SuccessInterceptor(),
    new ErrorsInterceptor());
  await app.listen(3333);
}
bootstrap();
