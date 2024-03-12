import { FormControl, Select } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { useContext } from 'react';
import { Context } from '../../layout/Providers';

export default function BrandSelect() {
  const { product } = useContext(Context);
  const validateSelectedBrand = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <Field name="brandId" validate={validateSelectedBrand}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.brandId && form.touched.brandId}>
          <Select {...field} placeholder="Выберите бренд">
            {product.brands.map(e => (
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
