import { Box } from '@chakra-ui/react';
import React from 'react';
import cs from './burger.module.css';

export const Burger = ({ isOpen, onClose, onOpen, ...props }) => {
  return (
    <Box
      {...props}
      onClick={() => (isOpen ? onClose() : onOpen())}
      className={isOpen ? [cs.burger, cs.active].join(' ') : cs.burger}
    >
      <span className={cs.span}></span>
    </Box>
  );
};
