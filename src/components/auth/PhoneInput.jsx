import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function PhoneInput({ name }) {
  function validatePhone(value) {
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
  }

  return (
    <Field name={name} validate={validatePhone}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={form.errors.phone && form.touched.phone}>
          <FormLabel>Номер телефона</FormLabel>
          <InputGroup size={{ base: 'lg', md: 'md' }}>
            <InputLeftAddon>+</InputLeftAddon>
            <Input {...field} placeholder="7 XXX XXX XX XX" />
          </InputGroup>

          <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
