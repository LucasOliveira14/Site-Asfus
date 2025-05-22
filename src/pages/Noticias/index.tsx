import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { NoticiaCard } from './NoticiaCard';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - substituir por dados reais da API
const noticias = [
  {
    id: '1',
    titulo: 'Nova área de lazer inaugurada',
    resumo: 'Inauguração da nova área de lazer para associados com grande festa.',
    data: '2024-03-15',
    imagem: 'https://via.placeholder.com/300x200',
    categoria: 'Eventos',
  },
  {
    id: '2',
    titulo: 'Resultados da pesquisa de satisfação',
    resumo: 'Confira os resultados da última pesquisa de satisfação dos associados.',
    data: '2024-03-10',
    imagem: 'https://via.placeholder.com/300x200',
    categoria: 'Pesquisas',
  },
];

export function Noticias() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Notícias</Heading>
          {user?.role === 'admin' && (
            <Button
              as={RouterLink}
              to="/noticias/nova"
              colorScheme="brand"
            >
              Nova Notícia
            </Button>
          )}
        </Box>

        <InputGroup>
          <Input placeholder="Pesquisar notícias..." />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {noticias.map((noticia) => (
            <NoticiaCard key={noticia.id} noticia={noticia} />
          ))}
        </Grid>

        {noticias.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text>Nenhuma notícia encontrada.</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 