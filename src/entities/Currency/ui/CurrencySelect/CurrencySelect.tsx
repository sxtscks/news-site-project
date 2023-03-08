import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';

export interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void;
  readonly?: boolean
}

const options = [
  { value: Currency.USD, content: 'Доллары' },
  { value: Currency.EUR, content: 'Евро' },
  { value: Currency.RUB, content: 'Рубли' },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className, value, onChange, readonly,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      className={classnames('', {}, [className])}
      label={t('Валюта')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
