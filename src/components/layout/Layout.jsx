import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header/Header';
import { Footer } from './Footer';
import { Providers } from './Providers';

export const Layout = ({ children }) => {
  return (
    <Providers>
      <Flex flexDirection="column" minH="100vh">
        <Header />
        <Box pt={12} as="main" flexGrow="1">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Providers>
  );
};
