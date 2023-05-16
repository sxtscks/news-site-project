import React from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
  <Flex direction="row" {...props} />
);
