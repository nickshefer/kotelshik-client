import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const MenuItem = ({ children, ...props }) => (
  <Box fontSize="lg">
    <Link {...props}>{children}</Link>
  </Box>
);
