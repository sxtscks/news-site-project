import React, { ReactNode } from 'react';
import { Popover as PopoverComponent } from '@headlessui/react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Popover.module.scss';
import { DropdownDirection } from '../../../../types/ui';
import { mapDirectionClass } from '../../styles/constants';
import popupClasses from '../../styles/popup.module.scss';

export interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const {
    className, trigger, children, direction = 'bottomRight',
  } = props;

  return (
    <PopoverComponent className={classnames(popupClasses.popup, {}, [className])}>
      <PopoverComponent.Button className={popupClasses.trigger}>
        {trigger}
      </PopoverComponent.Button>

      <PopoverComponent.Panel
        className={classnames(classes.panel, {}, [mapDirectionClass[direction]])}
      >
        {children}
      </PopoverComponent.Panel>
    </PopoverComponent>
  );
};
