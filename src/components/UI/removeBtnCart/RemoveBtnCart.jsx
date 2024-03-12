import React from 'react';
import cs from './removeBtnCart.module.css';
export const RemoveBtnCart = ({ ...props }) => {
  return <button {...props} className={cs.btn}></button>;
};
