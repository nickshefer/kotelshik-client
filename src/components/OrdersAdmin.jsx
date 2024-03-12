import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from './layout/Providers';
import { fetchAllOrders } from '../http/orderAPI';
import { Loader } from './UI/loader/Loader';
import { normalizeDate } from '../utils/normalizeDate';
import { normalizePrice } from '../utils/normalizePrice';
import { useNavigate } from 'react-router-dom';

export const OrdersAdmin = () => {
  const { order } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllOrders().then(data => {
      order.setOrders(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <Center mt={4}>
        <Loader size={'80px'} color={'#73956F'} />
      </Center>
    );
  }
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
      {order.orders.map(e => (
        <Box
          onClick={() => navigate(`/orders/${e.id}`)}
          key={e.id}
          bg={'white'}
          p={4}
          rounded={'lg'}
          shadow={'md'}
          cursor={'pointer'}
          _hover={{ transform: 'scale(1.02)' }}
          transition="all .2s ease-in-out"
        >
          <Heading
            as={'h5'}
            fontWeight={'400'}
            textAlign={'center'}
            fontSize={'lg'}
          >{`Заказ №${e.id}`}</Heading>
          <Text>
            Сумма: <Text as={'b'}>{normalizePrice(e.total)} ₽</Text>
          </Text>
          <Text>
            Дата: <Text as={'b'}>{normalizeDate(e.createdAt).day}</Text>
          </Text>
          <Text>
            Время: <Text as={'b'}>{normalizeDate(e.createdAt).time}</Text>
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
