import React, { InputHTMLAttributes, memo, useCallback } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    ...otherProps
  } = props;

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  }, [onChange]);

  return (
    <div className={classnames(classes.inputWrapper, {}, [className])}>
      {placeholder && (
        <div className={classes.placeholder}>
          {`${placeholder} >`}
        </div>
      )}
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={handleOnChange}
        {...otherProps}
      />
    </div>
  );
});
