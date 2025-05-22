import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { EnqueteCard } from './EnqueteCard';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - substituir por dados reais da API
const enquetes = [
  {
    id: '1',
    titulo: 'Pesquisa de Satisfação 2024',
    descricao: 'Queremos saber sua opinião sobre os serviços da ASFUS.',
    dataInicio: '2024-03-01',
    dataFim: '2024-03-31',
    tipo: 'multiple_choice',
    status: 'active',
    participantes: 45,
    acessoRestrito: 'associados',
  },
  {
    id: '2',
    titulo: 'Sugestões para Eventos',
    descricao: 'Ajude-nos a planejar os próximos eventos da associação.',
    dataInicio: '2024-03-10',
    dataFim: '2024-03-25',
    tipo: 'text',
    status: 'active',
    participantes: 30,
    acessoRestrito: 'todos',
  },
];

export function Enquetes() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  const enquetesDisponiveis = enquetes.filter((enquete) => {
    if (enquete.acessoRestrito === 'associados' && !user?.isAssociate) {
      return false;
    }
    return true;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Enquetes</Heading>
          {user?.role === 'admin' && (
            <Button
              as={RouterLink}
              to="/enquetes/nova"
              colorScheme="brand"
            >
              Nova Enquete
            </Button>
          )}
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {enquetesDisponiveis.map((enquete) => (
            <EnqueteCard key={enquete.id} enquete={enquete} />
          ))}
        </Grid>

        {enquetesDisponiveis.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text>Nenhuma enquete disponível no momento.</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 