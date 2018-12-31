import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { camelCase, isArray } from 'lodash';

@Injectable()
export class UtilService {
  private readonly hmacKay = 's8s6s4d5a7a90cib7b5ds8x0s';

  /**
   * 生成hmac密钥
   * @param {String} str
   */
  public createHamc(str: string): string {
    const hash = crypto.createHmac('sha256', this.hmacKay);
    hash.update(str);
    return hash.digest('hex');
  }

  public isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  /**
   * 将JSON中的key转化成驼峰式
   * @param {String} str
   */
  public convertToCamelCase(obj) {
    let o;
    if (this.isObject(obj)) {
      o = {};
      for (const item in obj) {
        if (obj.hasOwnProperty(item)) {
          o[camelCase(item)] = obj[item];
        }
      }
    } else if (isArray(obj)) {
      o = [];
      for (const item of obj) {
        o.push(this.convertToCamelCase(item));
      }
    }
    return o;
  }

  /**
   * 将小数转化成百分比
   */
  public convertDecimalToPercentage(decimal: number | string) {
    if (typeof decimal !== 'number') {
      decimal = Number(decimal);
    }
    return (decimal * 100).toFixed(2) + '%';
  }
}