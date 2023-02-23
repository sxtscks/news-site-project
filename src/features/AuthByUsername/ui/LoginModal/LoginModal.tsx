import React, { FC } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classnames } from 'shared/lib/classnames/classnames';
import { LoginForm } from '../LoginForm/LoginForm';

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
      <LoginForm />
    </Modal>
  );
};
