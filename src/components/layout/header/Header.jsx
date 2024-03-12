import {
  Box,
  Container,
  Flex,
  Image,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Burger } from '../../UI/burger/Burger';
import { ShopingCartIcon } from '../../UI/shopingCartIcon/ShopingCartIcon';
import { Context } from '../Providers';
import logo from '../../../assets/logo.svg';
import { MenuItems } from './MenuItems';
import { observer } from 'mobx-react-lite';
import { CgProfile } from 'react-icons/cg';

export const Header = observer(() => {
  const { product, user } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const header = useRef(null);
  useOutsideClick({ ref: header, handler: () => onClose() });
  const navigate = useNavigate();
  const amountProducts = product.cartProducts
    ? product.cartProducts.reduce((a, e) => (a += e.quantity), 0)
    : 0;
  const clickProfile = () => {
    if (user.isAuth) {
      navigate('/orders');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      ref={header}
      as="header"
      bg="gray.700"
      pos="fixed"
      w="100%"
      zIndex={11}
    >
      <Container maxW="container.lg">
        <Flex
          as="nav"
          align="center"
          gap={4}
          py={2}
          color="white"
          pos="relative"
        >
          <Link to="/">
            <Image w="150px" src={logo} alt="logo" />
          </Link>
          <Box
            bg="gray.700"
            pos={{ base: 'absolute', md: 'static' }}
            zIndex={11}
            borderTop={{ base: '1px solid', md: 'none' }}
            borderColor="gray.400"
            top={'46px'}
            left={-4}
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={{ md: 'flex-end' }}
            py={{ base: 4, md: 0 }}
            gap={4}
            width={{ base: 'calc(100% + 2rem)', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            opacity={{ base: !isOpen && 0, md: 1 }}
            visibility={{ base: !isOpen && 'hidden', md: 'visible' }}
            transition="all .2s ease-in-out"
          >
            <MenuItems onClose={onClose} />
          </Box>
          <ShopingCartIcon
            flex={{ base: '1 0 auto', md: '0 0 auto' }}
            ml="auto"
            amount={amountProducts}
            onClick={() => navigate('/cart')}
          />
          <CgProfile
            onClick={clickProfile}
            size={25}
            style={{ cursor: 'pointer' }}
          />
          <Burger
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            display={{ sm: 'block', md: 'none' }}
          />
        </Flex>
      </Container>
    </Box>
  );
});
