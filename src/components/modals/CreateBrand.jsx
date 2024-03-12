import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { createBrand } from '../../http/productAPI';
import { Context } from '../layout/Providers';
import { observer } from 'mobx-react-lite';

export const CreateBrand = observer(() => {
  const { product } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Submit = async (values, actions) => {
    try {
      const brand = await createBrand(values);
      alert(`Бренд '${brand.name}' добавлен`);
      product.setBrands([...product.brands, brand]);
      actions.setSubmitting(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const validateName = value => {
    let error;
    if (!value) {
      error = true;
    }
    return error;
  };

  return (
    <>
      <Button onClick={onOpen} w="100%" colorScheme="green">
        Добавить бренд
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить бренд</ModalHeader>

          <ModalBody>
            <Formik initialValues={{ name: '' }} onSubmit={Submit}>
              {props => (
                <Form>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <Input
                          type="text"
                          placeholder="Введите название бренда"
                          {...field}
                        />
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
                      Добавить
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
