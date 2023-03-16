import React, { FC, memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('articles');

  if (!id) {
    return (
      <div className={classnames('', {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={classnames('', {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
