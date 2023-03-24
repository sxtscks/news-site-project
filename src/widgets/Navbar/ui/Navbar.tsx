import React, { memo, useCallback, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAuthData = useSelector(getUserAuthData);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (userAuthData) {
    return (
      <header className={classnames(classes.navbar, {}, [className])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          onClick={onLogout}
        >
          {t('Выйти')}
        </Button>
      </header>
    );
  }

  return (
    <header className={classnames(classes.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={handleOpenModal}
      >
        {t('Войти')}
      </Button>
      {isOpen && <LoginModal isOpen={isOpen} onClose={handleCloseModal} />}
    </header>
  );
});
