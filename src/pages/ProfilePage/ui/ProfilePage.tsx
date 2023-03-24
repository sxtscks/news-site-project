import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileValidateError,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidateProfileError,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
  useInitialEffect,
} from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

export interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const validateErrors = useSelector(getProfileValidateError);

  const validateErrorsTranslations = {
    [ValidateProfileError.SERVER_ERROR]: t('Ошибка с сервера'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректные имя или фамилия'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
    [ValidateProfileError.NO_DATA]: t('Отсутствуют данные'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeProfile = useCallback((name: string, value?: string | number) => {
    dispatch(profileActions.updateProfile({ [name]: value }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <Page className={classnames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map((error) => (
          <Text
            theme={TextTheme.ERROR}
            text={validateErrorsTranslations[error]}
            key={error}
          />
        ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeProfile={onChangeProfile}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
