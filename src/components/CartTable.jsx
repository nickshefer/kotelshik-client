import {
  Box,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RemoveBtnCart } from './UI/removeBtnCart/RemoveBtnCart';
import { normalizePrice } from '../utils/normalizePrice';
import { Context } from './layout/Providers';
import { observer } from 'mobx-react-lite';

export const CartTable = observer(() => {
  const { product } = useContext(Context);
  return (
    <Table colorScheme="light">
      <Thead>
        <Tr>
          <Th paddingInline={{ base: 2, md: 6 }}>Изображение</Th>
          <Th paddingInline={{ base: 2, md: 6 }}>Название товара</Th>
          <Th paddingInline={{ base: 2, md: 6 }}>цена</Th>
        </Tr>
      </Thead>
      <Tbody>
        {product.cartProducts.map(i => (
          <Tr key={Date.now() * Math.random()}>
            <Td paddingInline={{ base: 2, md: 6 }}>
              <Box
                _hover={{ transform: 'scale(1.1)' }}
                transition="all .2s ease-in-out"
                display="flex"
                justifyContent="center"
              >
                <Link to={`/${i.slug}`}>
                  <Image src={process.env.REACT_APP_API_URL + i.img} w="80px" />
                </Link>
              </Box>
            </Td>
            <Td paddingInline={{ base: 2, md: 6 }}>
              {i.name}
              <NumberInput
                value={i.quantity}
                onChange={e => product.setCartProductQuantity(i, e)}
                mt={2}
                min={1}
                w={20}
                mx="auto"
                bg="white"
                rounded="lg"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td paddingInline={{ base: 2, md: 6 }} pos="relative">
              <RemoveBtnCart onClick={() => product.removeCartProduct(i)} />
              <Text
                style={{ textWrap: 'nowrap' }}
                textAlign="center"
                fontSize="lg"
                color="blue.500"
              >{`${normalizePrice(i.price)} ₽`}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
