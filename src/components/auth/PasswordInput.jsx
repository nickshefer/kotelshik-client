import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function PasswordInput({ name }) {
  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Введите пароль';
    } else if (!/\w{8,}/.test(value)) {
      error = 'Пароль должен содержать минимум 8 знаков';
    }
    return error;
  }
  return (
    <Field name={name} validate={validatePassword}>
      {({ field, form }) => (
        <FormControl
          mt={4}
          isInvalid={form.errors.password && form.touched.password}
        >
          <FormLabel>Пароль</FormLabel>
          <Input
            size={{ base: 'lg', md: 'md' }}
            {...field}
            placeholder="Введите пароль"
          />
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
