import {
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import BrandSelect from './BrandSelect';
import TypeSelect from './TypeSelect';
import NameInput from './NameInput';
import ModelInput from './ModelInput';
import ManufactureInput from './ManufactureInput';
import SlugInput from './SlugInput';
import PriceInput from './PriceInput';
import PictureInput from './PictureInput';
import InfoInputs from './InfoInputs';
import DescriptionTextarea from './DescriptionTextarea';
import { createProduct } from '../../../http/productAPI';
import { Context } from '../../layout/Providers';

export const CreateProduct = observer(() => {
  const { product } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = number => {
    setInfo(info.filter(i => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const initialValues = {
    typeId: '',
    brandId: '',
    name: '',
    model: '',
    manufacture: '',
    slug: '',
    description: '',
    price: 0,
  };

  async function Submit(values, actions) {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('manufacture', values.manufacture);
      formData.append('slug', values.slug);
      formData.append('model', values.model);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('img', file);
      formData.append('brandId', values.brandId);
      formData.append('typeId', values.typeId);
      formData.append('info', JSON.stringify(info));
      const newProduct = await createProduct(formData);
      alert(`Товар '${newProduct.name}' добавлен`);
      product.setProducts([...product.products, newProduct]);
      actions.setSubmitting(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <>
      <Button onClick={onOpen} w="100%" colorScheme="green">
        Добавить Товар
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить товар</ModalHeader>

          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={Submit}>
              {props => (
                <Form>
                  <BrandSelect />
                  <TypeSelect />
                  <NameInput />
                  <ModelInput />
                  <ManufactureInput />
                  <SlugInput />
                  <PriceInput />
                  <PictureInput file={file} setFile={setFile} />
                  <DescriptionTextarea />
                  <InfoInputs
                    info={info}
                    addInfo={addInfo}
                    removeInfo={removeInfo}
                    changeInfo={changeInfo}
                  />

                  <Flex justifyContent={'flex-end'}>
                    <ButtonGroup my={4} size={{ base: 'lg', md: 'md' }}>
                      <Button colorScheme="red" onClick={onClose}>
                        Закрыть
                      </Button>
                      <Button
                        onSubmit={Submit}
                        colorScheme="green"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Добавить
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
