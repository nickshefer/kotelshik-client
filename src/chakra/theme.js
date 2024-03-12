import { extendTheme } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['th', 'td']);

const Table = helpers.defineMultiStyleConfig({
  baseStyle: {
    th: {
      textAlign: 'center',
    },
    td: {
      textAlign: 'center',
    },
  },
});

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: 'gray.50',
      },
    },
  },
  components: {
    // Button: {
    //   // 1. We can update the base styles
    //   baseStyle: {
    //     fontWeight: 'bold', // Normally, it is "semibold"
    //   },
    // },
    Table,
  },
});
