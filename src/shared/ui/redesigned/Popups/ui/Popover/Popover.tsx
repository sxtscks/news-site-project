import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/constants';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const { className, trigger, direction = 'bottomRight', children } = props;

  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <HPopover
      className={classnames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classnames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
