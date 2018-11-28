import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class Article {

  @PrimaryGeneratedColumn({
    comment: '文章ID',
  })
  id: number;

  @Column({
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'longtext',
    comment: '文章内容',
  })
  content: string;

  @Column({
    comment: '文章标签',
  })
  tag: string;

  @CreateDateColumn()
  createAt;

  @UpdateDateColumn()
  updateAt;

  @VersionColumn()
  version;
}