import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../components/layout/Providers';
import { Container, Heading } from '@chakra-ui/react';

import { CartTable } from '../components/CartTable';
import { CartTotal } from '../components/CartTotal';
import { CartEmpty } from '../components/CartEmpty';

export const CartPage = observer(() => {
  const { product } = useContext(Context);

  // useEffect(() => {
  //   product.setCartProducts(
  //     JSON.parse(sessionStorage.getItem('cartItems')) || []
  //   );
  // }, []);
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center" my={4} as="h1">
        Корзина
      </Heading>
      {product.cartProducts.length !== 0 ? (
        <>
          <CartTable />
          <CartTotal />
        </>
      ) : (
        <CartEmpty />
      )}
    </Container>
  );
});
