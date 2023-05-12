import React, { ChangeEvent, useMemo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

export interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props;

  const optionList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={classes.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options]
  );

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
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
};
