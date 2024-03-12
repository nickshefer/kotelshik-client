import { FormControl, Input } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function ManufactureInput() {
  const validateManufacture = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="manufacture" validate={validateManufacture}>
      {({ field, form }) => (
        <FormControl
          mt={4}
          isInvalid={form.errors.manufacture && form.touched.manufacture}
        >
          <Input
            type="text"
            placeholder="Введите страну производства"
            {...field}
          />
        </FormControl>
      )}
    </Field>
  );
}
