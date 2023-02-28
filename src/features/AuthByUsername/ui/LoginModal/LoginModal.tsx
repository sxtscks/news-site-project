import React, { FC, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classnames } from 'shared/lib/classnames/classnames';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

export interface LoginModalProps {
  className?: string
  isOpen?: boolean;
  onClose?: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  const { className, isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
      className={classnames('', {}, [className])}
    >
      <Suspense fallback={<Loader />}>
        <LoginFormLazy />
      </Suspense>
    </Modal>
  );
};
