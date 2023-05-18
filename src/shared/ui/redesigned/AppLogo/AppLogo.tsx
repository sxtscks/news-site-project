import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classnames } from '@/shared/lib/classnames/classnames';
import { HStack } from '../Stack/HStack/HStack';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 60 }: AppLogoProps) => (
  <HStack
    max
    justify="center"
    className={classnames(cls.appLogoWrapper, {}, [className])}
  >
    <AppSvg className={cls.appLogo} width={size} height={size} color="black" />
    <div className={cls.gradientBig} />
    <div className={cls.gradientSmall} />
  </HStack>
));
