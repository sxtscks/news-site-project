import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';

export interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation('articles');

  return (
    <div className={classnames('', {}, [className])} />
  );
};

export default memo(ArticlesPage);
