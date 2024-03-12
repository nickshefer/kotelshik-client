import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaCartPlus, FaTrash } from 'react-icons/fa';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { normalizePrice } from '../utils/normalizePrice';
import { Context } from './layout/Providers';
import { deleteOneProduct } from '../http/productAPI';

export const CardProduct = ({ item }) => {
  const { product, user } = useContext(Context);
  const navigate = useNavigate();

  const clickDeleteButton = async (e, item) => {
    try {
      e.stopPropagation();
      const response = await deleteOneProduct(String(item.id));
      product.setProducts([...product.products.filter(e => e !== item)]);
      alert(response);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const clickBuyProduct = (e, item) => {
    e.stopPropagation();
    product.addCartProduct(item);
    navigate('/cart');
  };

  const clickAddCartProduct = (e, item) => {
    e.stopPropagation();
    product.addCartProduct(item);
  };

  return (
    <Card
      onClick={() => navigate(`/${item.slug}`)}
      maxW="sm"
      cursor="pointer"
      _hover={{ transform: 'scale(1.02)' }}
      transition="all .2s ease-in-out"
      pos={'relative'}
    >
      {user.isAuth && user.user.role === 'ADMIN' && (
        <IconButton
          pos={'absolute'}
          right={0}
          onClick={e => clickDeleteButton(e, item)}
          colorScheme="red"
        >
          <FaTrash size={25} />
        </IconButton>
      )}
      <CardBody pb={0} display={'flex'} flexDirection={'column'}>
        <Image
          src={process.env.REACT_APP_API_URL + item.img}
          alt={item.slug}
          w={'100%'}
          borderRadius="lg"
        />
        <Stack mt="4" spacing="3" flexGrow={'1'}>
          <Heading size="md" flexGrow={'1'}>
            {item.name}
          </Heading>
          <Text color="blue.600" fontSize="2xl">
            {`${normalizePrice(item.price)} ₽`}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="flex-end">
        <ButtonGroup spacing="2" size={{ base: 'lg', md: 'md' }}>
          <IconButton
            onClick={e => clickAddCartProduct(e, item)}
            colorScheme="gray"
          >
            <FaCartPlus size={25} />
          </IconButton>
          <Button onClick={e => clickBuyProduct(e, item)} colorScheme="green">
            Купить
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
