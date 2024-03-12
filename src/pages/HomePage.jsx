import { Container } from '@chakra-ui/react';
import React from 'react';
import { Hero } from '../components/Hero';
import { Catalog } from '../components/Catalog';

export const HomePage = () => {
  return (
    <Container maxW="container.lg">
      <Hero />
      <Catalog />
    </Container>
  );
};
