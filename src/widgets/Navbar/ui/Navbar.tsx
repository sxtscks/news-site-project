import React, { FC, useCallback, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className={classnames(classes.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={handleOpenModal}
      >
        {t('Войти')}
      </Button>
      <LoginModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};
