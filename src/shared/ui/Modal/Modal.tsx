import React, {
  FC,
  useCallback,
  useEffect,
} from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Portal } from 'shared/ui/Portal/Portal';
import classes from './Modal.module.scss';

export interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void
}
export const Modal: FC<ModalProps> = (props) => {
  const {
    className,
    isOpen,
    onClose,
    children,
  } = props;

  const modes: Record<string, boolean> = {
    [classes.opened]: isOpen,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Portal>
      <div className={classnames(classes.Modal, modes, [className])}>
        <div className={classes.overlay} onClick={closeHandler}>
          <div className={classes.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
