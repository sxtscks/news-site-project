import { Menu } from '@headlessui/react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from '../../../../types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import classes from './Dropdown.module.scss';
import popupClasses from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/constants';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}
export interface DropdownProps {
  className?: string;
  items: DropdownItem[]
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
  const {
    className, items, trigger, direction = 'bottomRight',
  } = props;

  return (
    <Menu as="div" className={classnames(popupClasses.popup, {}, [className])}>
      <Menu.Button className={popupClasses.trigger}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classnames(classes.menu, {}, [mapDirectionClass[direction]])}>
        {items.map((item) => {
          const content = ({ active }: {active: boolean}) => (
            <button
              type="button"
              disabled={item.disabled}
              className={classnames(classes.item, { [popupClasses.active]: active })}
              onClick={item.onClick}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
