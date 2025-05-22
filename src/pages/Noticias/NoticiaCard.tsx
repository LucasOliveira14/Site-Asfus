import {
  Box,
  Image,
  Text,
  Badge,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  data: string;
  imagem: string;
  categoria: string;
}

interface NoticiaCardProps {
  noticia: Noticia;
}

export function NoticiaCard({ noticia }: NoticiaCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <LinkBox
      as="article"
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
      <Image
        src={noticia.imagem}
        alt={noticia.titulo}
        objectFit="cover"
        w="100%"
        h="200px"
      />

      <Box p={6}>
        <Stack spacing={3}>
          <Badge colorScheme="brand" alignSelf="start">
            {noticia.categoria}
          </Badge>

          <LinkOverlay as={RouterLink} to={`/noticias/${noticia.id}`}>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              noOfLines={2}
            >
              {noticia.titulo}
            </Text>
          </LinkOverlay>

          <Text noOfLines={3} color="gray.600">
            {noticia.resumo}
          </Text>

          <Text fontSize="sm" color="gray.500">
            {format(new Date(noticia.data), "d 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </Text>
        </Stack>
      </Box>
    </LinkBox>
  );
} 