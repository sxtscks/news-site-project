import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames, Modes } from 'shared/lib/classnames/classnames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { useSelector } from 'react-redux';
import { getProfileReadonly } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import classes from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  onChangeProfile?: (name: string, value?: string | number) => void
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const {
    className, data, error, isLoading, onChangeProfile,
  } = props;
  const { t } = useTranslation('profile');

  const readonly = useSelector(getProfileReadonly);

  const modes: Modes = {
    [classes.editing]: !readonly,
  };

  if (isLoading) {
    return (
      <div
        className={classnames(classes.profileCard, {}, [className, classes.loading])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={classnames(classes.profileCard, {}, [className, classes.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classnames(classes.profileCard, modes, [className])}>
      <div className={classes.profileInfo}>
        {data?.avatar && (
          <div className={classes.avatarWrapper}>
            <Avatar src={data?.avatar} size={100} />
          </div>
        )}
        <Input
          value={data?.firstname}
          placeholder={t('Имя')}
          onChange={(value) => onChangeProfile?.('firstname', value)}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Фамилия')}
          onChange={(value) => onChangeProfile?.('lastname', value)}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Логин')}
          onChange={(value) => onChangeProfile?.('username', value)}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('Возраст')}
          onChange={(value) => onChangeProfile?.('age', value)}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('Город')}
          onChange={(value) => onChangeProfile?.('city', value)}
          readonly={readonly}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={(value) => onChangeProfile?.('currency', value)}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          onChange={(value) => onChangeProfile?.('country', value)}
          readonly={readonly}
        />
      </div>
    </div>
  );
};