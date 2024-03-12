import { FormControl, Select } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { useContext } from 'react';
import { Context } from '../../layout/Providers';

export default function TypeSelect() {
  const { product } = useContext(Context);
  const validateSelectedType = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="typeId" validate={validateSelectedType}>
      {({ field, form }) => (
        <FormControl
          mt={4}
          isInvalid={form.errors.typeId && form.touched.typeId}
        >
          <Select {...field} placeholder="Выберите тип">
            {product.types.map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
}
