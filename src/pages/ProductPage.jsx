import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageModal } from '../components/ImageModal';
import { Context } from '../components/layout/Providers';
import { normalizePrice } from '../utils/normalizePrice';
import { FaCartPlus } from 'react-icons/fa';
import { fetchOneProduct } from '../http/productAPI';
import { Loader } from '../components/UI/loader/Loader';

export const ProductPage = () => {
  const { product } = useContext(Context);
  const navigate = useNavigate();
  const [item, setItem] = useState({ info: [] });
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const clickBuyProduct = item => {
    product.addCartProduct(item);
    navigate('/cart');
  };

  useEffect(() => {
    fetchOneProduct(slug).then(data => {
      setItem(data);
      setLoading(false);
    });
  }, [slug]);
  if (loading)
    return (
      <Center h={'calc(100vh - 180px)'}>
        <Loader size={'80px'} color={'#73956F'} />
      </Center>
    );
  return (
    <Container maxW="container.lg">
      <Heading my={4} textAlign="center" as="h1">
        {item.name}
      </Heading>
      <Divider />
      <Flex
        mt={4}
        gap={4}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems={{ base: 'center' }}
      >
        <ImageModal src={process.env.REACT_APP_API_URL + item.img} />
        <Box>
          <UnorderedList>
            <ListItem>
              Модель: <strong>{item.model}</strong>
            </ListItem>
            <ListItem>
              Тип: <strong>{item.type.name}</strong>
            </ListItem>
            <ListItem>
              Производитель: <strong>{item.brand.name}</strong>
            </ListItem>
            <ListItem>
              Страна производства: <strong>{item.manufacture}</strong>
            </ListItem>
          </UnorderedList>
          <Divider mt={4} />
          <Text>
            Цена:{' '}
            <Text as={'span'} fontSize="3xl" textColor="blue.500">
              {`${normalizePrice(item.price)} ₽`}
            </Text>{' '}
          </Text>
          <ButtonGroup mt={4} w="100%" size={{ base: 'lg', md: 'md' }}>
            <Button
              onClick={() =>
                clickBuyProduct(product.products.find(e => e.slug === slug))
              }
              colorScheme="green"
              w="100%"
            >
              Купить
            </Button>
            <IconButton
              onClick={() => product.addCartProduct(item)}
              colorScheme="gray"
            >
              <FaCartPlus size={{ base: '40px', md: '30px' }} />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Flex>
      <Divider my={4} />
      <Text>{item.description}</Text>
      {item.info.length != 0 && (
        <>
          <Heading as="h6" my={4} fontSize="xl" textAlign="center">
            Технические характеристики
          </Heading>
          <Table size="sm" variant="striped" colorScheme="green">
            <Tbody>
              {item.info.map(i => (
                <Tr key={Date.now() * Math.random()}>
                  <Td textAlign={'left'}>{i.title}</Td>
                  <Td>{i.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Container>
  );
};
