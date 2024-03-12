import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProductStore from '../../store/ProductStore';
import UserStore from '../../store/UserStore';
import { theme } from '../../chakra/theme';
import OrderStore from '../../store/OrderStore';

export const Context = createContext(null);

export const Providers = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Context.Provider
        value={{
          product: new ProductStore(),
          user: new UserStore(),
          order: new OrderStore(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </Context.Provider>
    </ChakraProvider>
  );
};
