import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const ImageModal = ({ src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        w="250px"
        borderRadius={8}
        border="2px"
        borderColor={'gray.200'}
        src={src}
        onClick={onOpen}
        cursor="pointer"
        _hover={{ shadow: 'md' }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image w={'100%'} src={src} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
