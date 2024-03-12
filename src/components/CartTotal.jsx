import { Button, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { normalizePrice } from '../utils/normalizePrice';
import { Context } from './layout/Providers';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

export const CartTotal = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate();
  const sum = product.cartProducts.reduce(
    (sum, e) => (sum += e.price * e.quantity),
    0
  );
  return (
    <VStack mt={4}>
      <Text fontSize="xl">
        Итого:{' '}
        <Text display="inline" as="b" color="blue.500" fontSize="2xl">
          {`${normalizePrice(sum)} ₽`}
        </Text>
      </Text>
      <Button colorScheme="green" onClick={() => navigate('/placing')}>
        Оформить заказ
      </Button>
      <Button onClick={() => navigate('/')} colorScheme="blue">
        На главную
      </Button>
    </VStack>
  );
});
