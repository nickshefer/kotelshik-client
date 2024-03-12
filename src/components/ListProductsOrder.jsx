import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Context } from './layout/Providers';
import { normalizePrice } from '../utils/normalizePrice';

export const ListProductsOrder = () => {
  const { product } = useContext(Context);
  const sum = product.cartProducts.reduce((sum, e) => (sum += e.price), 0);
  const totalQuantity = product.cartProducts.reduce(
    (sum, e) => (sum += e.quantity),
    0
  );
  return (
    <Box flex={'0 0 30%'} color={'white'}>
      <Box rounded={'lg'} p={4} bg="gray.800">
        <VStack alignItems={'flex-start'}>
          <Heading w={'100%'} as={'h2'} textAlign={'center'} fontSize={'xl'}>
            Товары в заказе
          </Heading>
          {product.cartProducts.map(e => {
            return (
              <Box
                pb={2}
                w={'100%'}
                key={e.id}
                borderBottom={'1px solid'}
                borderColor={'gray.600'}
              >
                <Text>{e.name}</Text>
                <Box fontWeight={'500'}>{`${e.quantity} x ${normalizePrice(
                  e.price
                )} ₽`}</Box>
              </Box>
            );
          })}
          <Heading
            mt={4}
            w={'100%'}
            as={'h2'}
            textAlign={'center'}
            fontSize={'xl'}
          >
            Итого
          </Heading>
          <Flex fontWeight={'500'} w={'100%'} justifyContent={'space-between'}>
            <Box>{`${totalQuantity} шт.`}</Box>
            <Box>{`${normalizePrice(sum)} ₽`}</Box>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
