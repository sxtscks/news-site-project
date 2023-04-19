import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classnames } from 'shared/lib/classnames/classnames';
import { HStack } from '../../../Stack/HStack/HStack';
import classes from './ListBox.module.scss';
import popupClasses from '../../styles/popup.module.scss';
import { Button } from '../../../Button/Button';
import { DropdownDirection } from '../../../../types/ui';
import { mapDirectionClass } from '../../styles/constants';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

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

export const ListBox = (props: ListBoxProps) => {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottomRight',
    label,
  } = props;

  return (
    <HStack gap="4">
      {label && <span>{label}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classnames(popupClasses.popup, {}, [className])}
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
                      [popupClasses.active]: active,
                      [popupClasses.disabled]: person.disabled,
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
