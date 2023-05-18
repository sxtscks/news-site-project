import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesigned/Card';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text/Text';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" max>
      <Text
        variant="error"
        title={t('Произошла ошибка')}
        text={t('Попробуйте обновить страницу')}
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => (
  <Card padding="24" fullWidth>
    <VStack gap="32">
      <HStack max justify="center">
        <Skeleton border="100%" width={128} height={128} />
      </HStack>
      <HStack gap="32" max>
        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const { className, data, onChangeProfile, readonly } = props;
  const { t } = useTranslation('profile');

  return (
    <Card fullWidth padding="24" className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar src={data?.avatar} size={128} />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.firstname}
              label={t('Имя')}
              onChange={(value) => onChangeProfile?.('firstname', value)}
              readonly={readonly}
              data-testId="ProfileCard.FirstnameInput"
            />
            <Input
              value={data?.lastname}
              label={t('Фамилия')}
              onChange={(value) => onChangeProfile?.('lastname', value)}
              readonly={readonly}
              data-testId="ProfileCard.LastnameInput"
            />
            <Input
              value={data?.age}
              label={t('Возраст')}
              onChange={(value) => onChangeProfile?.('age', value)}
              readonly={readonly}
              data-testId="ProfileCard.AgeInput"
            />
            <Input
              value={data?.city}
              label={t('Город')}
              onChange={(value) => onChangeProfile?.('city', value)}
              readonly={readonly}
              data-testId="ProfileCard.CityInput"
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t('Логин')}
              onChange={(value) => onChangeProfile?.('username', value)}
              readonly={readonly}
              data-testId="ProfileCard.UsernameInput"
            />
            <Input
              value={data?.avatar}
              label={t('Ссылка на аватар')}
              onChange={(value) => onChangeProfile?.('avatar', value)}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={(value) => onChangeProfile?.('currency', value)}
              readonly={readonly}
              data-testId="ProfileCard.CurrencyInput"
            />
            <CountrySelect
              value={data?.country}
              onChange={(value) => onChangeProfile?.('country', value)}
              readonly={readonly}
              data-testId="ProfileCard.CountryInput"
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
