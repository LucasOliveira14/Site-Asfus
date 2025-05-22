import {
  Box,
  Badge,
  Text,
  Stack,
  Icon,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  Button,
  HStack,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Reserva {
  id: string;
  espaco: string;
  data: string;
  horario: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  solicitante: string;
  descricao: string;
}

interface ReservaCardProps {
  reserva: Reserva;
}

export function ReservaCard({ reserva }: ReservaCardProps) {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovada':
        return 'green';
      case 'rejeitada':
        return 'red';
      default:
        return 'yellow';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aprovada':
        return 'Aprovada';
      case 'rejeitada':
        return 'Rejeitada';
      default:
        return 'Pendente';
    }
  };

  return (
    <LinkBox
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
      }}
    >
      <Box p={6}>
        <Stack spacing={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <Badge colorScheme={getStatusColor(reserva.status)}>
              {getStatusLabel(reserva.status)}
            </Badge>
            <Text fontWeight="bold" color="gray.600">
              {reserva.espaco}
            </Text>
          </Box>

          <Stack spacing={3}>
            <HStack>
              <Icon as={FaCalendarAlt} color="brand.500" />
              <Text>
                {format(new Date(reserva.data), "d 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaClock} color="brand.500" />
              <Text>{reserva.horario}</Text>
            </HStack>

            <HStack>
              <Icon as={FaUser} color="brand.500" />
              <Text>{reserva.solicitante}</Text>
            </HStack>

            <Text color="gray.600">{reserva.descricao}</Text>
          </Stack>

          {user?.role === 'admin' && reserva.status === 'pendente' && (
            <Stack direction="row" spacing={2} pt={2}>
              <Button
                leftIcon={<FaCheckCircle />}
                colorScheme="green"
                size="sm"
                flex={1}
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implementar aprovação
                }}
              >
                Aprovar
              </Button>
              <Button
                leftIcon={<FaTimesCircle />}
                colorScheme="red"
                size="sm"
                flex={1}
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implementar rejeição
                }}
              >
                Rejeitar
              </Button>
            </Stack>
          )}

          {reserva.status === 'aprovada' && (
            <Button
              as={RouterLink}
              to={`/reservas/${reserva.id}`}
              colorScheme="brand"
              variant="outline"
              size="sm"
              width="100%"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Implementar visualização detalhada
              }}
            >
              Ver Detalhes
            </Button>
          )}
        </Stack>
      </Box>
    </LinkBox>
  );
} 