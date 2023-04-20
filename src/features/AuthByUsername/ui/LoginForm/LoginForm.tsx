import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import {
  DynamicModuleLoader, ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import classes from './LoginForm.module.scss';
import { authActions, authReducer } from '../../model/slice/authSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducerList = {
  auth: authReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onUsernameChange = useCallback((value: string) => {
    dispatch(authActions.setUsername(value));
  }, [dispatch]);

  const onPasswordChange = useCallback((value: string) => {
    dispatch(authActions.setPassword(value));
  }, [dispatch]);

  const onLogin = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount
    >
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
