import { FC, lazy } from 'react';
import { LoginFormProps } from 'features/AuthByUsername/ui/LoginForm/LoginForm';

export const LoginFormLazy = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
