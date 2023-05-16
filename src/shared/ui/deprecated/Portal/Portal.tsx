import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Portal: FC<PortalProps> = (props) => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};
