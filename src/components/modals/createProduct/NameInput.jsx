import { FormControl, Input } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function NameInput() {
  const validateName = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="name" validate={validateName}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={form.errors.name && form.touched.name}>
          <Input
            type="text"
            placeholder="Введите полное название товара"
            {...field}
          />
        </FormControl>
      )}
    </Field>
  );
}
