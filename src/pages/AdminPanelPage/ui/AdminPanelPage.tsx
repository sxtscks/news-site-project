import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanelPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>{t('Админка')}</Page>
  );
};

export default AdminPanelPage;
