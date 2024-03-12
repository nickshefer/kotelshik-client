import { Center, Heading, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { CreateBrand } from './modals/CreateBrand';
import { CreateType } from './modals/CreateType';
import { CreateProduct } from './modals/createProduct/CreateProduct';
import { DeleteBrand } from './modals/DeleteBrand';
import { fetchBrands, fetchTypes } from '../http/productAPI';
import { Context } from './layout/Providers';
import { Loader } from './UI/loader/Loader';
import { DeleteType } from './modals/DeleteType';
import { observer } from 'mobx-react-lite';

export const AdminButtons = () => {
  const { product } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBrands().then(data => product.setBrands(data));
    fetchTypes().then(data => product.setTypes(data));
    setLoading(false);
  });
  return (
    <>
      <Heading mt={4} textAlign="center" as={'h1'}>
        Панель администратора
      </Heading>
      {loading ? (
        <Center h={'calc(100vh - 180px)'}>
          <Loader size={'80px'} color={'#73956F'} />
        </Center>
      ) : (
        <VStack
          mt={4}
          maxW={400}
          mx="auto"
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <CreateBrand />
          <CreateType />
          <CreateProduct />
          <DeleteBrand />
          <DeleteType />
        </VStack>
      )}
    </>
  );
};
