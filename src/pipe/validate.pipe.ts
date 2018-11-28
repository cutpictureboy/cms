import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metadata || !this.toValidate(metatype)) {
      return value;
    } else {
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        const error = errors[0];
        const keys = Object.keys(error.constraints);
        const message = keys.length > 0 ? error.constraints[keys[0]] : '参数错误';
        throw new BadRequestException(message);
      }
      return object;
    }
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => {
      return metatype === type;
    });
  }
}
