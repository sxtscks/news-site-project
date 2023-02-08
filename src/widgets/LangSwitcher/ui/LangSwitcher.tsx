import React, {FC} from 'react';
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import {classnames} from "shared/lib/classnames/classnames";
import classes from "widgets/Navbar/ui/Navbar.module.scss";

export interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className}) => {

  const { t, i18n } = useTranslation();

  const onTranslate = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button
      className={classnames(classes.switcher, {}, [className])}
      onClick={onTranslate}
      theme={ThemeButton.CLEAR}
    >
      {t('Язык')}
    </Button>
  )
}