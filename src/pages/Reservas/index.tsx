import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
  HStack,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { ReservaCard } from './ReservaCard';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

// Mock data - substituir por dados reais da API
const reservas = [
  {
    id: '1',
    espaco: 'Salão de Festas',
    data: '2024-03-20',
    horario: '14:00 - 18:00',
    status: 'pendente',
    solicitante: 'João Silva',
    descricao: 'Aniversário',
  },
  {
    id: '2',
    espaco: 'Quadra Poliesportiva',
    data: '2024-03-22',
    horario: '09:00 - 11:00',
    status: 'aprovada',
    solicitante: 'Maria Santos',
    descricao: 'Torneio de Vôlei',
  },
];

const espacos = [
  'Salão de Festas',
  'Quadra Poliesportiva',
  'Churrasqueira',
  'Sala de Jogos',
];

export function Reservas() {
  const { user } = useAuth();
  const [filtroEspaco, setFiltroEspaco] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtroEspaco && reserva.espaco !== filtroEspaco) {
      return false;
    }
    if (filtroStatus && reserva.status !== filtroStatus) {
      return false;
    }
    return true;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Reservas</Heading>
          <Button
            as={RouterLink}
            to="/reservas/nova"
            colorScheme="brand"
          >
            Nova Reserva
          </Button>
        </Box>

        <HStack spacing={4}>
          <Select
            placeholder="Filtrar por espaço"
            value={filtroEspaco}
            onChange={(e) => setFiltroEspaco(e.target.value)}
          >
            {espacos.map((espaco) => (
              <option key={espaco} value={espaco}>
                {espaco}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Filtrar por status"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="aprovada">Aprovada</option>
            <option value="rejeitada">Rejeitada</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {reservasFiltradas.map((reserva) => (
            <ReservaCard key={reserva.id} reserva={reserva} />
          ))}
        </SimpleGrid>

        {reservasFiltradas.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text>Nenhuma reserva encontrada.</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 