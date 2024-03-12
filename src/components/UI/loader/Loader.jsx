import React from 'react';
import cs from './loader.module.css';
import { FiLoader } from 'react-icons/fi';

export const Loader = ({ size, color }) => {
  return (
    <div style={{ width: size, height: size }} className={cs.loader}>
      <FiLoader color={color} size={'100%'} />
    </div>
  );
};
