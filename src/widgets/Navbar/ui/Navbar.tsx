import React, { FC, useCallback, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleToggleModal = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={classnames(classes.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={handleToggleModal}
      >
        {t('Войти')}
      </Button>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isOpen} onClose={handleToggleModal}>
        Hello
      </Modal>
    </div>
  );
};
