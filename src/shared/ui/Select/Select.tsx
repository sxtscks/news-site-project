import React, { ChangeEvent, memo, useMemo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

export interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className, label, options, value, onChange, readonly,
  } = props;

  const optionList = useMemo(() => options?.map((opt) => (
    <option
      className={classes.option}
      value={opt.value}
      key={opt.value}
    >
      {opt.content}
    </option>
  )), [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classnames(classes.wrapper, {}, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}
      <select
        className={classes.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
    </div>
  );
});
