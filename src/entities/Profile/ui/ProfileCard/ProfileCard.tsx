import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import classes from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  readonly?: boolean;
  error?: string;
  onChangeProfile?: (name: string, value?: string | number) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { className, data, error, isLoading, onChangeProfile, readonly } =
    props;
  const { t } = useTranslation('profile');

  const modes: Modes = {
    [classes.editing]: !readonly,
  };

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classnames(classes.profileCard, {}, [
          className,
          classes.loading,
        ])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classnames(classes.profileCard, {}, [
          className,
          classes.error,
        ])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classnames(classes.profileCard, modes, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data?.avatar} size={100} />
        </HStack>
      )}
      <Input
        value={data?.firstname}
        placeholder={t('Имя')}
        onChange={(value) => onChangeProfile?.('firstname', value)}
        readonly={readonly}
        data-testId="ProfileCard.FirstnameInput"
      />
      <Input
        value={data?.lastname}
        placeholder={t('Фамилия')}
        onChange={(value) => onChangeProfile?.('lastname', value)}
        readonly={readonly}
        data-testId="ProfileCard.LastnameInput"
      />
      <Input
        value={data?.username}
        placeholder={t('Логин')}
        onChange={(value) => onChangeProfile?.('username', value)}
        readonly={readonly}
        data-testId="ProfileCard.UsernameInput"
      />
      <Input
        value={data?.age}
        placeholder={t('Возраст')}
        onChange={(value) => onChangeProfile?.('age', value)}
        readonly={readonly}
        data-testId="ProfileCard.AgeInput"
      />
      <Input
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
};
