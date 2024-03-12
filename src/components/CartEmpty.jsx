import { Box, Button, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CartEmpty = () => {
  const navigate = useNavigate();
  return (
    <Center mt={4}>
      <Box>
        <Text textAlign="center" fontSize="lg">
          Пусто...
        </Text>
        <Button onClick={() => navigate('/')} colorScheme="blue" mt={4}>
          На главную
        </Button>
      </Box>
    </Center>
  );
};
