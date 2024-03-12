import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function NameInput({ name }) {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Введите имя';
    }
    return error;
  }

  return (
    <Field name={name} validate={validateName}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={form.errors.name && form.touched.name}>
          <FormLabel>Имя</FormLabel>
          <Input
            size={{ base: 'lg', md: 'md' }}
            {...field}
            placeholder="Введите имя"
          />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
