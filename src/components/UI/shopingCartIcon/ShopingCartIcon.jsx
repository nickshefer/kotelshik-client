import { Box } from '@chakra-ui/react';
import React from 'react';
import cs from './shopingCartIcon.module.css';
import { RiShoppingCartLine } from 'react-icons/ri';

export const ShopingCartIcon = ({ amount, onClick, ...props }) => {
  return (
    <Box className={cs.cart} {...props}>
      <RiShoppingCartLine onClick={onClick} size={25} className={cs.icon} />
      {amount ? <div className={cs.badge}>{amount}</div> : ''}
    </Box>
  );
};
