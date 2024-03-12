import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

export default function SlugInput() {
  const validateSlug = value => {
    let error;
    if (!value) {
      error = true;
    } else if (!/[a-z]+/.test(value)) {
      error = 'Буквы должны быть маленькими и латинскими';
    } else if (!/^[a-z]+(-[a-z]+)*$/.test(value)) {
      error = 'Слова должны разделяться дефисами';
    }
    return error;
  };
  return (
    <Field name="slug" validate={validateSlug}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={form.errors.slug && form.touched.slug}>
          <InputGroup>
            <InputLeftAddon>https://mysite.ru/</InputLeftAddon>
            <Input {...field} placeholder="nobby-smart" />
          </InputGroup>
          <FormErrorMessage>{form.errors.slug}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
