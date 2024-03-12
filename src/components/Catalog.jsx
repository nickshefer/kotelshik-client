import React, { useContext, useEffect, useState } from 'react';
import { Context } from './layout/Providers';
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { CardProduct } from './CardProduct';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchProducts, fetchTypes } from '../http/productAPI';
import { Loader } from './UI/loader/Loader';

export const Catalog = observer(() => {
  const { product } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands().then(data => product.setBrands(data));
    fetchTypes().then(data => product.setTypes(data));
    fetchProducts(null, null, 1, 2).then(data => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
    setLoading(false);
  }, []);

  return (
    <Box as="section" mt={8}>
      <Heading textAlign="center" as="h2">
        Каталог
      </Heading>
      {loading ? (
        <Center h={'calc(100vh - 180px)'}>
          <Loader size={'80px'} color={'#73956F'} />
        </Center>
      ) : (
        <SimpleGrid mt={4} columns={[1, 2, 3]} gap={5}>
          {product.products.map(product => (
            <CardProduct key={product.id} item={product} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
});
