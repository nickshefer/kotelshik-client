import { Container, Flex, HStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { PlacingForm } from '../components/PlacingForm';
import { ListProductsOrder } from '../components/ListProductsOrder';

export const PlacingOrderPage = () => {
  return (
    <Container maxW={'container.lg'}>
      <Heading as={'h1'} textAlign={'center'} mt={4}>
        Оформление заказа
      </Heading>
      <Flex gap={4} mt={4} flexDirection={{ base: 'column', md: 'row' }}>
        <ListProductsOrder />
        <PlacingForm />
      </Flex>
    </Container>
  );
};
