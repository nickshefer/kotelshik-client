import { Button, Container, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Context } from '../components/layout/Providers';
import { useNavigate } from 'react-router-dom';
import { OrdersUser } from '../components/OrdersUser';
import { OrdersAdmin } from '../components/OrdersAdmin';

export default function OrdersPage() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  function logOut() {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }
  return (
    <Container maxW={'container.lg'}>
      <Heading mt={4} as={'h1'} textAlign={'center'}>
        {user.user.role === 'ADMIN' ? 'Заказы' : 'Мои заказы'}
      </Heading>
      {user.user.role === 'ADMIN' ? <OrdersAdmin /> : <OrdersUser />}
      <Button mt={4} onClick={logOut}>
        Выйти
      </Button>
    </Container>
  );
}
