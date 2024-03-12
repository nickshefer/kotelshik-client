import { Button, Center, Heading, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import PasswordInput from './PasswordInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { login, registration } from '../../http/userAPI';
import { Context } from '../layout/Providers';
import PhoneInput from './PhoneInput';
import NameInput from './NameInput';

export default function Auth() {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';

  async function Submit(values, actions) {
    try {
      let data;
      if (isLogin) {
        data = await login(values.phone, values.password);
      } else {
        data = await registration(values.name, values.phone, values.password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate('/orders', { replace: true });
      actions.setSubmitting(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <Center
      p={4}
      mt={20}
      border="2px solid"
      borderColor="blue.500"
      rounded="lg"
      flexDirection="column"
    >
      <Heading as="h2" textAlign="center" fontSize="3xl">
        {isLogin ? 'Авторизация' : 'Регистрация'}
      </Heading>
      <Formik
        initialValues={{ name: '', phone: '', password: '' }}
        onSubmit={Submit}
      >
        {props => (
          <Form style={{ width: '100%' }}>
            {!isLogin && <NameInput name={'name'} />}
            <PhoneInput name={'phone'} />
            <PasswordInput name={'password'} />

            <Center>
              <Button
                size={{ base: 'lg', md: 'md' }}
                mt={4}
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
      <Text mt={4} fontSize="lg">
        <Text as={'span'}>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</Text>{' '}
        <Text
          onClick={() =>
            isLogin
              ? navigate('/registration', { replace: true })
              : navigate('/login', { replace: true })
          }
          as={'span'}
          cursor="pointer"
          textDecoration="underline"
          color="blue.400"
          _hover={{ color: 'blue.600' }}
        >
          {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
        </Text>
      </Text>
    </Center>
  );
}
