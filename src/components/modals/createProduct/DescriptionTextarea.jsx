import { Textarea } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function DescriptionTextarea() {
  const validateTextarea = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="description" validate={validateTextarea}>
      {({ field, form }) => (
        <Textarea
          mt={4}
          {...field}
          placeholder="Введите описание товара"
          isInvalid={form.errors.description && form.touched.description}
        />
      )}
    </Field>
  );
}
