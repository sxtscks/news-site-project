import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classnames } from 'shared/lib/classnames/classnames';
import { HStack } from '../Stack/HStack/HStack';
import classes from './ListBox.module.scss';
import { Button } from '../Button/Button';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps {
  items: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: <T extends string>(value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottom: classes.optionBottom,
  top: classes.optionTop,
};

export const ListBox = (props: ListBoxProps) => {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom',
    label,
  } = props;

  return (
    <HStack gap="4">
      {label && <span>{label}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classnames(classes.listBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={classes.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classnames(classes.options, {}, [mapDirectionClass[direction]])}
        >
          {items.map((person) => (
            <HListBox.Option
              key={person.value}
              value={person.value}
              disabled={person.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classnames(
                    classes.item,
                    {
                      [classes.active]: active,
                      [classes.disabled]: person.disabled,
                    },
                  )}
                >
                  {selected && '!!!'}
                  {person.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
