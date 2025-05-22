import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  VStack,
  Container,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface NoticiaFormData {
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  imagem: FileList;
}

interface NoticiaFormProps {
  noticia?: {
    id: string;
    titulo: string;
    resumo: string;
    conteudo: string;
    categoria: string;
    imagem: string;
  };
}

export function NoticiaForm({ noticia }: NoticiaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NoticiaFormData>({
    defaultValues: noticia
      ? {
          titulo: noticia.titulo,
          resumo: noticia.resumo,
          conteudo: noticia.conteudo,
          categoria: noticia.categoria,
        }
      : undefined,
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: NoticiaFormData) => {
    try {
      // TODO: Implementar integração com backend
      console.log('Dados do formulário:', data);
      
      toast({
        title: 'Sucesso!',
        description: noticia
          ? 'Notícia atualizada com sucesso!'
          : 'Notícia criada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/noticias');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a notícia.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.titulo}>
            <FormLabel>Título</FormLabel>
            <Input
              {...register('titulo', {
                required: 'O título é obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.titulo && errors.titulo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.categoria}>
            <FormLabel>Categoria</FormLabel>
            <Select
              {...register('categoria', {
                required: 'A categoria é obrigatória',
              })}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Eventos">Eventos</option>
              <option value="Notícias">Notícias</option>
              <option value="Comunicados">Comunicados</option>
              <option value="Pesquisas">Pesquisas</option>
            </Select>
            <FormErrorMessage>
              {errors.categoria && errors.categoria.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.resumo}>
            <FormLabel>Resumo</FormLabel>
            <Input
              {...register('resumo', {
                required: 'O resumo é obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.resumo && errors.resumo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.conteudo}>
            <FormLabel>Conteúdo</FormLabel>
            <Box border="1px" borderColor="gray.200" borderRadius="md">
              <ReactQuill
                theme="snow"
                value={watch('conteudo')}
                onChange={(value) => setValue('conteudo', value)}
              />
            </Box>
            <FormErrorMessage>
              {errors.conteudo && errors.conteudo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.imagem}>
            <FormLabel>Imagem de Capa</FormLabel>
            <Input
              type="file"
              accept="image/*"
              {...register('imagem', {
                required: !noticia && 'A imagem é obrigatória',
              })}
            />
            <FormErrorMessage>
              {errors.imagem && errors.imagem.message}
            </FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={4} width="100%" pt={4}>
            <Button
              onClick={() => navigate('/noticias')}
              variant="outline"
              flex={1}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
              flex={1}
            >
              {noticia ? 'Atualizar' : 'Criar'} Notícia
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
} 