import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onConfirm?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onConfirm,
    rate = 0,
  } = props;
  const { t } = useTranslation();

  const [isOpenModal, setOpenModal] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = (selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount);
    if (hasFeedback) {
      setOpenModal(true);
    } else {
      onConfirm?.(selectedStarsCount);
    }
  };

  const confirmHandle = () => {
    setOpenModal(false);
    onConfirm?.(starsCount, feedback);
  };

  const cancelHandle = () => {
    setOpenModal(false);
    onCancel?.(starsCount);
  };

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
          off={
            <TextDeprecated
              title={starsCount ? t('Спасибо за оценку!') : title}
            />
          }
        />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <Modal isOpen={isOpenModal} lazy>
        <VStack max gap="32">
          {modalContent}
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <HStack max gap="16" justify="end">
                <Button onClick={cancelHandle}>{t('Закрыть')}</Button>
                <Button onClick={confirmHandle}>{t('Отправить')}</Button>
              </HStack>
            }
            off={
              <HStack max gap="16" justify="end">
                <ButtonDeprecated
                  onClick={cancelHandle}
                  theme={ButtonTheme.OUTLINE_RED}
                >
                  {t('Закрыть')}
                </ButtonDeprecated>
                <ButtonDeprecated onClick={confirmHandle}>
                  {t('Отправить')}
                </ButtonDeprecated>
              </HStack>
            }
          />
        </VStack>
      </Modal>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card fullWidth padding="24" border="round" className={className}>
          {content}
        </Card>
      }
      off={
        <CardDeprecated fullWidth className={className}>
          {content}
        </CardDeprecated>
      }
    />
  );
});
