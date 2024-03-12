import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Context } from './layout/Providers';
import { createOrder } from '../http/orderAPI';
import { useNavigate } from 'react-router-dom';

export const PlacingForm = () => {
  const { product, user } = useContext(Context);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

  const productsInCart = product.cartProducts.map(e => ({
    id: e.id,
    quantity: e.quantity,
  }));
  const sum = product.cartProducts.reduce((sum, e) => (sum += e.price), 0);

  const initialValues = {
    name: '',
    phone: '',
    password: '',
  };

  const submitFirst = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('total', sum);
      formData.append('products', JSON.stringify(productsInCart));
      const res = await createOrder(formData);
      if (res === 'Придумайте пароль') {
        setIsPassword(true);
        actions.setSubmitting(false);
        return;
      }
      alert(`Заказ №${res.id} успешно создан`);
      product.setCartProducts([]);
      actions.setSubmitting(false);
      navigate('/', { replace: true });
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const submitWithPassword = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('total', sum);
      formData.append('password', values.password);
      formData.append('products', JSON.stringify(productsInCart));
      const order = await createOrder(formData);
      alert(`Заказ №${order.id} успешно создан`);
      product.setCartProducts([]);
      actions.setSubmitting(false);
      navigate('/', { replace: true });
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const validateName = value => {
    let err;
    if (!value) err = 'Введите имя';
    return err;
  };
  const validatePhone = value => {
    let error;
    if (!value) {
      error = 'Введите номер телефона';
    } else if (!/^7/.test(value)) {
      error = 'Должен начинаться с цифры 7';
    } else if (!/^7\d{10}/.test(value)) {
      error = 'Должен иметь 11 цифр';
    } else if (/^7\d{11,}/.test(value)) {
      error = 'Должен иметь 11 цифр';
    }
    return error;
  };
  const validatePassword = value => {
    let error;
    if (!value) {
      error = 'Введите пароль';
    } else if (!/\w{8,}/.test(value)) {
      error = 'Пароль должен содержать минимум 8 знаков';
    }
    return error;
  };
  return (
    <Box flexGrow={1} bg={'gray.800'} rounded={'lg'} p={4} color={'white'}>
      <Heading w={'100%'} as={'h2'} textAlign={'center'} fontSize={'xl'}>
        Контактные данные
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={isPassword ? submitWithPassword : submitFirst}
      >
        {props => (
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel>Имя</FormLabel>
                  <Input
                    size={{ base: 'lg', md: 'md' }}
                    type="text"
                    placeholder="Введите имя"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone" validate={validatePhone}>
              {({ field, form }) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <FormLabel>Номер телефона</FormLabel>
                  <InputGroup size={{ base: 'lg', md: 'md' }}>
                    <InputLeftAddon bg={'transparent'}>+</InputLeftAddon>
                    <Input {...field} placeholder="7 XXX XXX XX XX" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {isPassword && (
              <Field name={'password'} validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Придумайте пароль</FormLabel>
                    <Input
                      size={{ base: 'lg', md: 'md' }}
                      {...field}
                      placeholder="Введите пароль"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    <FormHelperText>
                      Это нужно для просмотра заказов
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            )}
            <Text mt={4} fontSize={'sm'}>
              В настоящее время на нашем сайте нет возможности онлайн оплаты
              заказа. После нажатия кнопки «Оформить» мы забронируем товары из
              вашей корзины за указанным номером телефона и перезвоним Вам для
              уточнения деталей.
            </Text>
            <Flex justifyContent={'flex-end'}>
              <Button
                size={{ base: 'lg', md: 'md' }}
                isLoading={props.isSubmitting}
                type="submit"
                onSubmit={isPassword ? submitWithPassword : submitFirst}
                colorScheme="green"
              >
                Оформить
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
