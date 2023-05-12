import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

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

  return (
    <Card fullWidth className={classnames('', {}, [className])}>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('Спасибо за оценку!') : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <Modal isOpen={isOpenModal} lazy>
        <VStack max gap="32">
          <Text title={feedbackTitle} />
          <Input
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
          <HStack max gap="16" justify="end">
            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
              {t('Закрыть')}
            </Button>
            <Button onClick={confirmHandle}>{t('Отправить')}</Button>
          </HStack>
        </VStack>
      </Modal>
    </Card>
  );
});
