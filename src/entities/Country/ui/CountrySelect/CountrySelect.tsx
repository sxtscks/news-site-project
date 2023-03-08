import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

export interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void;
  readonly?: boolean
}

const options = [
  { value: Country.USA, content: 'США' },
  { value: Country.ITALY, content: 'Италия' },
  { value: Country.RUSSIA, content: 'Россия' },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className, value, onChange, readonly,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      className={classnames('', {}, [className])}
      label={t('Страна')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
