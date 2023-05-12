import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { classnames } from '@/shared/lib/classnames/classnames';

export interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const onTranslate = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classnames('', {}, [className])}
      onClick={onTranslate}
      theme={ButtonTheme.CLEAR}
    >
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  );
});
