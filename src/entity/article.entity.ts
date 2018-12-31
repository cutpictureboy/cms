import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Article {

  @Exclude()
  @PrimaryGeneratedColumn({
    comment: '文章ID',
  })
  id: number;

  @Column({
    comment: '文章标题',
  })
  title: string;

  @Column({
    comment: '文章HASH值',
  })
  hash: string;

  @Column({
    type: 'longtext',
    comment: '文章内容',
  })
  content: string;

  @Column({
    comment: '文章标签',
  })
  tag: string;

  @Exclude()
  @Column({
    type: 'enum',
    comment: '文章状态',
    enum: ['draft', 'published'],
    default: 'draft',
  })
  status: 'draft' | 'published';

  @Exclude()
  @CreateDateColumn()
  createAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updateAt: Date;

  @Exclude()
  @VersionColumn()
  version: number;
}