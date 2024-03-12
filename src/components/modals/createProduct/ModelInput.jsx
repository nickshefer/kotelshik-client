import { FormControl, Input } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function ModelInput() {
  const validateModel = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="model" validate={validateModel}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={form.errors.model && form.touched.model}>
          <Input type="text" placeholder="Введите модель товара" {...field} />
        </FormControl>
      )}
    </Field>
  );
}
