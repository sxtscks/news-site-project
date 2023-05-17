import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { EditableProfileCard } from '@/features/EditableProfileCard';

export interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id } = useParams();

  return (
    <Page dataTestId="ProfilePage" className={classnames('', {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id ?? ''} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
