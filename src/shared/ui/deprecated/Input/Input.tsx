import React, { InputHTMLAttributes, memo, useCallback } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    readonly,
    ...otherProps
  } = props;

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange]
  );

  const modes: Modes = {
    [classes.readonly]: readonly,
  };

  return (
    <div className={classnames(classes.inputWrapper, modes, [className])}>
      {placeholder && (
        <div className={classes.placeholder}>{`${placeholder} >`}</div>
      )}
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={handleOnChange}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  );
});
