import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './ProfileCardDeprecated.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import {
  Text as TextDeprecated,
  TextAlign,
  TextTheme,
} from '@/shared/ui/deprecated/Text/Text';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      max
      className={classnames(classes.profileCard, {}, [classes.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify="center"
    max
    className={classnames(classes.profileCard, {}, [classes.loading])}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const { className, data, onChangeProfile, readonly } = props;
  const { t } = useTranslation('profile');
  const modes: Modes = {
    [classes.editing]: !readonly,
  };

  return (
    <VStack
      gap="16"
      max
      className={classnames(classes.profileCard, modes, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <AvatarDeprecated src={data?.avatar} size={100} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.firstname}
        placeholder={t('Имя')}
        onChange={(value) => onChangeProfile?.('firstname', value)}
        readonly={readonly}
        data-testId="ProfileCard.FirstnameInput"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Фамилия')}
        onChange={(value) => onChangeProfile?.('lastname', value)}
        readonly={readonly}
        data-testId="ProfileCard.LastnameInput"
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Логин')}
        onChange={(value) => onChangeProfile?.('username', value)}
        readonly={readonly}
        data-testId="ProfileCard.UsernameInput"
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t('Возраст')}
        onChange={(value) => onChangeProfile?.('age', value)}
        readonly={readonly}
        data-testId="ProfileCard.AgeInput"
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Город')}
        onChange={(value) => onChangeProfile?.('city', value)}
        readonly={readonly}
        data-testId="ProfileCard.CityInput"
      />
      <CurrencySelect
        value={data?.currency}
        onChange={(value) => onChangeProfile?.('currency', value)}
        readonly={readonly}
        data-testId="ProfileCard.CurrencyInput"
      />
      <CountrySelect
        value={data?.country}
        onChange={(value) => onChangeProfile?.('country', value)}
        readonly={readonly}
        data-testId="ProfileCard.CountryInput"
      />
    </VStack>
  );
});
