import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import {
  EditableProfileCard,
  profileReducer,
} from '@/features/EditableProfileCard';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

export interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id } = useParams();

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <Page className={classnames('', {}, [className])}>
        <VStack gap="16" max>
          <EditableProfileCard id={id ?? ''} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
