import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';

export interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const onTranslate = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Button variant="clear" onClick={onTranslate}>
          {t('Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={classnames('', {}, [className])}
          onClick={onTranslate}
          theme={ButtonTheme.CLEAR}
        >
          {t('Язык')}
        </ButtonDeprecated>
      }
    />
  );
});
