import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classnames(classes.loginForm, {}, [className])}>
      <Input type="text" placeholder={t('Введите username')} />
      <Input type="text" placeholder={t('Введите пароль')} />
      <Button className={classes.loginButton}>
        {t('Войти')}
      </Button>
    </div>
  );
};
