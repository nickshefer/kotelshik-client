import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchOrderById } from '../http/orderAPI';
import { Loader } from '../components/UI/loader/Loader';
import { FaWhatsapp } from 'react-icons/fa';
import { normalizePrice } from '../utils/normalizePrice';

export const OrderPage = () => {
  const { pathname } = useLocation();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const slug = pathname.match(/\d+/);
  useEffect(() => {
    fetchOrderById(slug).then(data => {
      setOrder(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={'container.lg'}>
      <Heading
        as={'h1'}
        mt={4}
        textAlign={'center'}
      >{`Заказ №${slug}`}</Heading>
      {loading ? (
        <Center mt={4}>
          <Loader size={'80px'} color={'#73956F'} />
        </Center>
      ) : (
        <Box mt={4} p={4} bg={'white'} rounded={'lg'} shadow={'md'}>
          <Box>
            <Heading fontSize={'lg'} as={'h3'}>
              Заказчик
            </Heading>
            <Text mt={2}>
              <Text as={'span'}>Имя:</Text>{' '}
              <Text fontWeight={'600'} as={'span'}>
                {order.user.name}
              </Text>
            </Text>
            <Text>
              <Text as={'span'}>Номер телефона:</Text>{' '}
              <Link
                fontWeight={'600'}
                href={`tel:+${order.user.phone}`}
              >{`+${order.user.phone}`}</Link>
              <Link href={`https://wa.me/${order.user.phone}`}>
                <IconButton size={'sm'} ml={4} colorScheme="green">
                  <FaWhatsapp size={25} color="white" />
                </IconButton>
              </Link>
            </Text>
          </Box>
          <Divider my={4} />
          <Box>
            <Heading fontSize={'lg'} as={'h3'} mb={4}>
              Товары
            </Heading>
            {order.products.map(product => (
              <Box key={product.id}>
                <Flex
                  gap={4}
                  w={'100%'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  fontWeight={'600'}
                  fontSize={'lg'}
                >
                  <Box flexGrow={1}>{product.name}</Box>
                  <Box
                    flex={'0 0 auto'}
                  >{`${product.order_product.quantity} шт`}</Box>
                  <Box flex={'0 0 20%'}>{`${normalizePrice(
                    product.price
                  )} ₽`}</Box>
                </Flex>
                <Divider my={2} />
              </Box>
            ))}
          </Box>
          <Flex
            fontWeight={'600'}
            fontSize={'lg'}
            justifyContent={'space-between'}
          >
            <Box>Итого</Box>
            <Box flex={'0 0 20%'} color={'blue.600'}>
              {`${normalizePrice(order.total)} ₽`}
            </Box>
          </Flex>
        </Box>
      )}
    </Container>
  );
};
