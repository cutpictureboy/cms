import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto, GetArticleDto, GetArticleListDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
  ) {}

  /**
   *
   *  获取文章列表
   * @param {GetArticleDto} param
   * @returns {Promise<Article>}
   * @memberof ArticleService
   */
  async createArticle(param: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(param);
    await this.articleRepository.save(article);
    return article;
  }

  /**
   * 获取文章列表
   *
   * @param {GetArticleListDto} param
   * @returns {Promise<{ result: Article[]; size: number; }>}
   * @memberof ArticleService
   */
  async getArticleList(param: GetArticleListDto): Promise<{ list: Article[]; size: number; }> {
    const { page } = param;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const [articles, size] = await this.articleRepository.findAndCount({
      skip,
      take: pageSize,
    });
    return {
      list: articles,
      size,
    };
  }

  /**
   *
   *  获取单个文章详情
   * @param {GetArticleDto} param
   * @returns {Promise<Article>}
   * @memberof ArticleService
   */
  async getArticle(param: GetArticleDto): Promise<Article> {
    const { id } = param;
    return this.articleRepository.findOne(id);
  }
}
