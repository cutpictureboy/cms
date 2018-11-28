export class ListVo<T> {
  readonly size: number;
  readonly list: T[];

  constructor(partial: Partial<ListVo<T>>) {
    Object.assign(this, partial);
  }
}