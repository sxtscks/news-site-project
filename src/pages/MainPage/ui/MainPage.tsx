import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack/HStack/HStack';

const MainPage: FC = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Главная страница')}
      <HStack>
        <ListBox
          defaultValue="Выберите значение"
          items={[
            {
              value: '1',
              content: '123',
            },
            {
              value: '2',
              content: '245345234',
            },
            {
              value: '3',
              content: '00000',
              disabled: true,
            },
          ]}
          onChange={() => {}}
        />
      </HStack>
    </Page>
  );
};

export default MainPage;
