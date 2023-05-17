import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { Portal } from '../../redesigned/Portal/Portal';
import classes from './Modal.module.scss';

export interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
  const { className, isOpen, onClose, lazy, children } = props;

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  const modes: Modes = {
    [classes.opened]: isOpen,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div className={classnames(classes.Modal, modes, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={classes.content}>{children}</div>
      </div>
    </Portal>
  );
};
