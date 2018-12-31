import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entity/article.entity';
import { Repository, Not } from 'typeorm';
import * as ArticleDto from './article.dto';
import { UtilService } from '../../common/util/util.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly utilService: UtilService,
  ) {}

  /**
   *
   *  获取文章列表
   * @param param ArticleDto.GetArticleDto
   * @returns Promise<Article>
   * @memberof ArticleService
   */
  async createArticle(param: ArticleDto.CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(param);
    article.hash = this.utilService.createHamc(article.title + new Date().valueOf());
    article.status = 'draft';
    await this.articleRepository.save(article);
    return article;
  }

  /**
   * 获取文章列表
   *
   * @param param ArticleDto.GetArticleListDto
   * @returns Promise<{ result: Article[]; size: number; }>
   * @memberof ArticleService
   */
  async getArticleList(param: ArticleDto.GetArticleListDto): Promise<{ list: Article[]; size: number; }> {
    const { page } = param;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const [articles, size] = await this.articleRepository.findAndCount({
      skip,
      take: pageSize,
      where: {
        status: 'published',
      },
    });
    return {
      list: articles,
      size,
    };
  }

  /**
   *
   *  获取单个文章详情
   * @param param ArticleDto.GetArticleDto
   * @returns Promise<Article>
   * @memberof ArticleService
   */
  async getArticle(param: ArticleDto.GetArticleDto): Promise<Article> {
    const { hash } = param;
    const article = await this.articleRepository.findOne({
      where: {
        hash,
      },
    });
    if (typeof article === 'undefined') {
      this.noArticleExist();
    }
    return article;
  }

  /**
   * 发布文章
   * @param param ArticleDto.GetArticleDto
   */
  async publishArticle(param: ArticleDto.GetArticleDto): Promise<void> {
    const { hash } = param;
    if (!this.isArticleExist(hash)) {
      this.noArticleExist();
    }
    await this.articleRepository.update({
      hash,
    }, {
      status: 'published',
    });
    return;
  }

  /**
   * 通过hash检测文章存不存在
   * @param hash 文章hash值
   */
  async isArticleExist(hash: string): Promise<boolean> {
    const article = await this.articleRepository.findOne({
      select: ['id'],
      where: {
        hash,
      },
    });
    return typeof article !== 'undefined';
  }

  /**
   * 当文章不存在时，抛出错误
   */
  noArticleExist() {
    throw new NotFoundException('the article does not exist');
  }
}
