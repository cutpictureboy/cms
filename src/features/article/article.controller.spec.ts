import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Repository } from 'typeorm';
import { Article } from '../../entity/article.entity';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;
  let articleRepository: Repository<Article>;

  beforeEach(() => {
    articleRepository = new Repository<Article>();
    articleService = new ArticleService(articleRepository);
    articleController = new ArticleController(articleService);
  });

  describe('getArticleList', () => {
    it('should return an array of articles', async () => {
      const result = ['test'];
      jest.spyOn(articleService, 'getArticleList').mockImplementation(() => result);
      expect(await articleController.getArticleList({
        page: 1,
      })).toBe(result);
    });
  });
});
