import { Container } from '@chakra-ui/react';
import React from 'react';
import { AdminButtons } from '../components/AdminButtons';

export const AdminPage = () => {
  return (
    <Container maxW="container.lg">
      <AdminButtons />
    </Container>
  );
};
