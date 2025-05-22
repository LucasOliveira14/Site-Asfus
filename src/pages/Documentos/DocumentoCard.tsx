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
} from '@chakra-ui/react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFile, FaDownload } from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Documento {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  dataUpload: string;
  categoria: string;
  acessoRestrito: string;
  versao: string;
}

interface DocumentoCardProps {
  documento: Documento;
}

export function DocumentoCard({ documento }: DocumentoCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getFileIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'pdf':
        return FaFilePdf;
      case 'doc':
      case 'docx':
        return FaFileWord;
      case 'xls':
      case 'xlsx':
        return FaFileExcel;
      default:
        return FaFile;
    }
  };

  const getAcessoLabel = (acesso: string) => {
    switch (acesso) {
      case 'associados':
        return 'Apenas Associados';
      case 'funcionarios':
        return 'Funcionários';
      default:
        return 'Público';
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
            <Icon
              as={getFileIcon(documento.tipo)}
              color="brand.500"
              boxSize={6}
            />
            <Badge colorScheme="brand">{documento.categoria}</Badge>
            <Badge variant="outline">
              {getAcessoLabel(documento.acessoRestrito)}
            </Badge>
          </Box>

          <Stack spacing={2}>
            <LinkOverlay href={`/documentos/${documento.id}`}>
              <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                {documento.titulo}
              </Text>
            </LinkOverlay>

            <Text fontSize="sm" color="gray.500">
              Versão {documento.versao}
            </Text>

            <Text noOfLines={2} color="gray.600">
              {documento.descricao}
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              {format(new Date(documento.dataUpload), "d 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Tamanho: {documento.tamanho}
            </Text>
          </Stack>

          <Button
            leftIcon={<FaDownload />}
            colorScheme="brand"
            variant="outline"
            size="sm"
            width="100%"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implementar download do documento
            }}
          >
            Download
          </Button>
        </Stack>
      </Box>
    </LinkBox>
  );
} 