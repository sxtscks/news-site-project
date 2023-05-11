import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Page } from '@/widgets/Page';
import classes from './NotFoundPage.module.scss';

export interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Page
      dataTestId="NotFoundPage"
      className={classnames(classes.container, {}, [className])}
    >
      {t('Страница не найдена')}
    </Page>
  );
};
