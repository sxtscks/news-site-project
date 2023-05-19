import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';

export interface SettingsPageProps {
  className?: string;
}

const SettingsPage: FC<SettingsPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap="16">
        <Text title={t('Настройки пользователя')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
};

export default SettingsPage;
