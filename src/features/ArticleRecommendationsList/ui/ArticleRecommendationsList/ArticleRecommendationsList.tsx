import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  Text as TextDeprecated,
  TextSize,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { useGetArticleRecsQuery } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');

    const { data: articles, isLoading, error } = useGetArticleRecsQuery(3);

    if (isLoading || error) return null;

    return (
      <VStack gap="8" className={classnames('', {}, [className])}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="size_l" title={t('Рекомендуем')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Рекомендуем')} />}
        />

        <ArticleList articles={articles ?? []} target="_blank" />
      </VStack>
    );
  }
);
