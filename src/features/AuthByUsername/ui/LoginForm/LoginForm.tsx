import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
  getLoginState,
} from '../../model/selectors/getLoginState/getLoginState';
import classes from './LoginForm.module.scss';
import { authActions } from '../../model/slice/authSlice';
import {
  loginByUsername,
} from '../../model/services/loginByUsername/loginByUsername';

export interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loginForm = useSelector(getLoginState);

  const {
    username, password, isLoading, error,
  } = loginForm;

  const onUsernameChange = useCallback((value: string) => {
    dispatch(authActions.setUsername(value));
  }, [dispatch]);

  const onPasswordChange = useCallback((value: string) => {
    dispatch(authActions.setPassword(value));
  }, [dispatch]);

  const onLogin = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classnames(classes.loginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
      <Input
        onChange={onUsernameChange}
        type="text"
        placeholder={t('Введите username')}
        value={username}
      />
      <Input
        onChange={onPasswordChange}
        type="text"
        placeholder={t('Введите пароль')}
        value={password}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        className={classes.loginButton}
        onClick={onLogin}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});
