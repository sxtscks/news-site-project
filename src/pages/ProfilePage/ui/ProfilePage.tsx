import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

export interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classnames('', {}, [className])}>
        {t('profile page')}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
