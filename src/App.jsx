import React, { useContext, useEffect, useState } from 'react';
import { AppRouter } from './components/AppRouter';
import { Context } from './components/layout/Providers';
import { Loader } from './components/UI/loader/Loader';
import { Center } from '@chakra-ui/react';
import { check } from './http/userAPI';

export const App = () => {
  const { product, user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      product.setCartProducts(JSON.parse(cartProducts));
    }
    check()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(e => console.log(e.response.data.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Center h={'calc(100vh - 180px)'}>
        <Loader size={'80px'} color={'#73956F'} />
      </Center>
    );
  }
  return <AppRouter />;
};
