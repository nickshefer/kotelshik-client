import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '../layout/Providers';
import {
  Button,
  ButtonGroup,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { deleteOneBrand } from '../../http/productAPI';

export const DeleteBrand = observer(() => {
  const { product } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Submit = async (values, actions) => {
    try {
      const response = await deleteOneBrand(values.id);
      alert(response);
      product.setBrands([...product.brands.filter(e => e.id != values.id)]);
      actions.setSubmitting(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const validateId = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };
  return (
    <>
      <Button onClick={onOpen} w="100%" colorScheme="red">
        Удалить бренд
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить бренд</ModalHeader>

          <ModalBody>
            <Formik initialValues={{ id: '' }} onSubmit={Submit}>
              {props => (
                <Form>
                  <Field name="id" validate={validateId}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.id && form.touched.id}
                      >
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
                  <ButtonGroup my={4}>
                    <Button colorScheme="red" onClick={onClose}>
                      Закрыть
                    </Button>
                    <Button
                      isLoading={props.isSubmitting}
                      type="submit"
                      onSubmit={Submit}
                      colorScheme="green"
                    >
                      Удалить
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
