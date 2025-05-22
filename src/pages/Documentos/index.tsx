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
  SimpleGrid,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { DocumentoCard } from './DocumentoCard';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - substituir por dados reais da API
const documentos = [
  {
    id: '1',
    titulo: 'Estatuto 2024',
    descricao: 'Estatuto atualizado da ASFUS para o ano de 2024.',
    tipo: 'PDF',
    tamanho: '2.5 MB',
    dataUpload: '2024-01-20',
    categoria: 'Documentos Oficiais',
    acessoRestrito: 'associados',
    versao: '1.0',
  },
  {
    id: '2',
    titulo: 'Regulamento Interno',
    descricao: 'Regulamento interno atualizado com as novas diretrizes.',
    tipo: 'PDF',
    tamanho: '1.8 MB',
    dataUpload: '2024-01-15',
    categoria: 'Documentos Oficiais',
    acessoRestrito: 'todos',
    versao: '2.1',
  },
];

const categorias = [
  'Documentos Oficiais',
  'Atas de Reunião',
  'Relatórios',
  'Formulários',
  'Outros',
];

export function Documentos() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  const documentosDisponiveis = documentos.filter((documento) => {
    if (documento.acessoRestrito === 'associados' && !user?.isAssociate) {
      return false;
    }
    return true;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Documentos</Heading>
          {user?.role === 'admin' && (
            <Button
              as={RouterLink}
              to="/documentos/novo"
              colorScheme="brand"
            >
              Novo Documento
            </Button>
          )}
        </Box>

        <InputGroup>
          <Input placeholder="Pesquisar documentos..." />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {documentosDisponiveis.map((documento) => (
            <DocumentoCard key={documento.id} documento={documento} />
          ))}
        </SimpleGrid>

        {documentosDisponiveis.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text>Nenhum documento disponível.</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 