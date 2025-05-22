import {
  Box,
  Badge,
  Text,
  Progress,
  Stack,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaClipboardList, FaFileAlt, FaStar } from 'react-icons/fa';

interface Enquete {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  tipo: 'multiple_choice' | 'text' | 'rating';
  status: 'active' | 'finished';
  participantes: number;
  acessoRestrito: 'todos' | 'associados' | 'funcionarios';
}

interface EnqueteCardProps {
  enquete: Enquete;
}

export function EnqueteCard({ enquete }: EnqueteCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'multiple_choice':
        return FaClipboardList;
      case 'rating':
        return FaStar;
      default:
        return FaFileAlt;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'green' : 'gray';
  };

  const getAcessoLabel = (acesso: string) => {
    switch (acesso) {
      case 'associados':
        return 'Apenas Associados';
      case 'funcionarios':
        return 'Funcionários';
      default:
        return 'Todos';
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
            <Icon as={getTipoIcon(enquete.tipo)} color="brand.500" boxSize={5} />
            <Badge colorScheme={getStatusColor(enquete.status)}>
              {enquete.status === 'active' ? 'Em Andamento' : 'Finalizada'}
            </Badge>
            <Badge variant="outline" colorScheme="brand">
              {getAcessoLabel(enquete.acessoRestrito)}
            </Badge>
          </Box>

          <LinkOverlay as={RouterLink} to={`/enquetes/${enquete.id}`}>
            <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
              {enquete.titulo}
            </Text>
          </LinkOverlay>

          <Text noOfLines={2} color="gray.600">
            {enquete.descricao}
          </Text>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>
              {`${format(new Date(enquete.dataInicio), "d 'de' MMMM", {
                locale: ptBR,
              })} - ${format(new Date(enquete.dataFim), "d 'de' MMMM", {
                locale: ptBR,
              })}`}
            </Text>
            <Progress
              value={50}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
            />
          </Box>

          <Text fontSize="sm" color="gray.500">
            {enquete.participantes} participantes
          </Text>
        </Stack>
      </Box>
    </LinkBox>
  );
} 