import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import { generatePath, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getCanEditArticle,
} from '../../model/selectors/article';
import classes from './ArticleDetailsPageHeader.module.scss';

export interface ArticleDetailsPageHeaderProps {
  className?: string;
  articleId: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('articles');
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(generatePath(RoutePath.articleEdit, { id: articleId }));
  }, [navigate, articleId]);

  return (
    <div
      className={classnames(classes.ArticleDetailsPageHeader, {}, [className])}
    >
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button
          className={classes.editButton}
          theme={ButtonTheme.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </div>
  );
});
