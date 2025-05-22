import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f0ff',
      100: '#b3d1ff',
      200: '#80b3ff',
      300: '#4d94ff',
      400: '#1a75ff',
      500: '#0052cc',
      600: '#003d99',
      700: '#002966',
      800: '#001433',
      900: '#000000',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme; 