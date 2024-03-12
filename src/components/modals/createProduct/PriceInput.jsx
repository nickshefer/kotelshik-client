import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function PriceInput() {
  const validatePrice = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="price" validate={validatePrice}>
      {({ field, form }) => (
        <FormControl
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={4}
          isInvalid={form.errors.price && form.touched.price}
        >
          <FormLabel>Введите цену</FormLabel>
          <NumberInput min={0}>
            <NumberInputField {...field} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}
    </Field>
  );
}
