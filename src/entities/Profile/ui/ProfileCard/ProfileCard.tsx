import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { useSelector } from 'react-redux';
import {
  getProfileData,
} from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import {
  getProfileError,
} from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import {
  getProfileIsLoading,
} from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './ProfileCard.module.scss';

export interface ProfileCardProps {
  className?: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
  const { t } = useTranslation('profile');

  const data = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classnames(classes.profileCard, {}, [className])}>
      <div className={classes.header}>
        <Text title={t('Профиль')} />
        <Button className={classes.editButton} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={classes.profileInfo}>
        <Input
          value={data?.firstname}
          placeholder={t('Имя')}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Фамилия')}
        />
      </div>
    </div>
  );
};
