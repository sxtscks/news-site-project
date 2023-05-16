import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ListBox } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

export interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.USA, content: 'США' },
  { value: Country.ITALY, content: 'Италия' },
  { value: Country.RUSSIA, content: 'Россия' },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classnames('', {}, [className])}
      items={options}
      value={value}
      defaultValue={t('Укажите страну')}
      label={t('Укажите страну')}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
