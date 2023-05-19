import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import {
  Text as TextDeprecated,
  TextTheme,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import classes from './LoginForm.module.scss';
import { authActions, authReducer } from '../../model/slice/authSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
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
  const forceUpdate = useForceUpdate();

  const onUsernameChange = useCallback(
    (value: string) => {
      dispatch(authActions.setUsername(value));
    },
    [dispatch]
  );

  const onPasswordChange = useCallback(
    (value: string) => {
      dispatch(authActions.setPassword(value));
    },
    [dispatch]
  );

  const onLogin = useCallback(async () => {
    const result = await dispatch(
      loginByUsername({
        username,
        password,
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack
            gap="16"
            className={classnames(classes.loginForm, {}, [className])}
          >
            <Text title={t('Форма авторизации')} />
            {error && (
              <Text
                text={t('Вы ввели неверный логин или пароль')}
                variant="error"
              />
            )}
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
              className={classes.loginButton}
              onClick={onLogin}
              disabled={isLoading}
            >
              {t('Войти')}
            </Button>
          </VStack>
        }
        off={
          <div className={classnames(classes.loginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error && (
              <TextDeprecated
                text={t('Вы ввели неверный логин или пароль')}
                theme={TextTheme.ERROR}
              />
            )}
            <InputDeprecated
              onChange={onUsernameChange}
              type="text"
              placeholder={t('Введите username')}
              value={username}
            />
            <InputDeprecated
              onChange={onPasswordChange}
              type="text"
              placeholder={t('Введите пароль')}
              value={password}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={classes.loginButton}
              onClick={onLogin}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
