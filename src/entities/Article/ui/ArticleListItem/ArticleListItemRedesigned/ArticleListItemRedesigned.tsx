import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/constants/articleConsts';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        fullWidth
        data-testid="ArticleListItem"
        className={classnames(cls.ArticleListItemRedesigned, {}, [
          className,
          cls[view],
        ])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="size_s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
          )}
          <HStack max justify="between">
            <AppLink
              target={target}
              to={generatePath(RoutePath.articleDetails, { id: article.id })}
            >
              <Button variant="outline">{t('Читать далее')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={generatePath(RoutePath.articleDetails, { id: article.id })}
      className={classnames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} border="round" padding="0">
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
