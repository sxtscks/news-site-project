import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage: FC = () => {
  const { t } = useTranslation('about');

  return <Page dataTestId="AboutPage">{t('О сайте')}</Page>;
};

export default AboutPage;
