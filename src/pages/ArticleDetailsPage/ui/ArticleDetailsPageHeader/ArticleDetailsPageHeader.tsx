import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import { generatePath, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import {
  getCanEditArticle,
} from '../../model/selectors/article';

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
    <HStack
      max
      justify="between"
      className={classnames('', {}, [className])}
    >
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  );
});
