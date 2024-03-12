import React, { useContext } from 'react';
import { adminLinks, navLinks } from '../../../consts/navLinks';
import { MenuItem } from './MenuItem';
import { observer } from 'mobx-react-lite';
import { Context } from '../Providers';

export const MenuItems = observer(({ onClose }) => {
  const { user } = useContext(Context);
  return (
    <>
      {navLinks.map(e => (
        <MenuItem key={e.path} to={e.path} onClick={onClose}>
          {e.title}
        </MenuItem>
      ))}
      {user.user?.role === 'ADMIN' &&
        adminLinks.map(e => (
          <MenuItem key={e.path} to={e.path} onClick={onClose}>
            {e.title}
          </MenuItem>
        ))}
    </>
  );
});
