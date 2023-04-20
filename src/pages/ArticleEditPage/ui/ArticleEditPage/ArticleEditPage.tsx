import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Page } from '@/widgets/Page/Page';

export interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const { id } = useParams<{id: string}>();
  const isEdit = !!id;

  return (
    <Page className={classnames('', {}, [className])}>
      {isEdit ? `${t('Редактирование статьи с ID = ')}${id}` : t('Создание новой статьи')}
    </Page>
  );
});

export default ArticleEditPage;
