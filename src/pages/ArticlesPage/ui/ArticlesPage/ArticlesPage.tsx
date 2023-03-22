import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { ArticleList, ArticleView } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';

export interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation('articles');

  return (
    <div className={classnames('', {}, [className])}>
      <ArticleList
        view={ArticleView.BIG}
        articles={[
          {
            id: '1',
            user: {
              id: '1',
              username: 'admin',
              avatar: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            },
            title: 'Javascript new ttewrgd sg dsftdf sdfger',
            subtitle: 'Что нового в JS за 2022',
            img: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
            blocks: [],
          },
          {
            id: '2',
            user: {
              id: '1',
              username: 'admin',
              avatar: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            },
            title: 'Javascript new ttewrgd sg dsftdf sdfger',
            subtitle: 'Что нового в JS за 2022',
            img: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
            blocks: [],
          },
          {
            id: '3',
            user: {
              id: '1',
              username: 'admin',
              avatar: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            },
            title: 'Javascript new ttewrgd sg dsftdf sdfger',
            subtitle: 'Что нового в JS за 2022',
            img: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
            blocks: [],
          },
          {
            id: '4',
            user: {
              id: '1',
              username: 'admin',
              avatar: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            },
            title: 'Javascript new ttewrgd sg dsftdf sdfger',
            subtitle: 'Что нового в JS за 2022',
            img: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
            blocks: [],
          },
          {
            id: '5',
            user: {
              id: '1',
              username: 'admin',
              avatar: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            },
            title: 'Javascript new ttewrgd sg dsftdf sdfger',
            subtitle: 'Что нового в JS за 2022',
            img: 'https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
            blocks: [],
          },
        ]}
      />
    </div>
  );
};

export default memo(ArticlesPage);
