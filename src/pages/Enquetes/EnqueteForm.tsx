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
  RadioGroup,
  Radio,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Pergunta {
  tipo: 'multiple_choice' | 'text' | 'rating';
  texto: string;
  opcoes?: string[];
}

interface EnqueteFormData {
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  acessoRestrito: 'todos' | 'associados' | 'funcionarios';
  perguntas: Pergunta[];
}

interface EnqueteFormProps {
  enquete?: {
    id: string;
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    acessoRestrito: string;
    perguntas: Pergunta[];
  };
}

export function EnqueteForm({ enquete }: EnqueteFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EnqueteFormData>({
    defaultValues: enquete || {
      perguntas: [{ tipo: 'multiple_choice', texto: '', opcoes: [''] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'perguntas',
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: EnqueteFormData) => {
    try {
      // TODO: Implementar integração com backend
      console.log('Dados do formulário:', data);
      
      toast({
        title: 'Sucesso!',
        description: enquete
          ? 'Enquete atualizada com sucesso!'
          : 'Enquete criada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/enquetes');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a enquete.',
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

          <FormControl isInvalid={!!errors.descricao}>
            <FormLabel>Descrição</FormLabel>
            <Input
              {...register('descricao', {
                required: 'A descrição é obrigatória',
              })}
            />
            <FormErrorMessage>
              {errors.descricao && errors.descricao.message}
            </FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={4} width="100%">
            <FormControl isInvalid={!!errors.dataInicio}>
              <FormLabel>Data de Início</FormLabel>
              <Input
                type="date"
                {...register('dataInicio', {
                  required: 'A data de início é obrigatória',
                })}
              />
              <FormErrorMessage>
                {errors.dataInicio && errors.dataInicio.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.dataFim}>
              <FormLabel>Data de Término</FormLabel>
              <Input
                type="date"
                {...register('dataFim', {
                  required: 'A data de término é obrigatória',
                })}
              />
              <FormErrorMessage>
                {errors.dataFim && errors.dataFim.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={!!errors.acessoRestrito}>
            <FormLabel>Acesso Restrito</FormLabel>
            <Select
              {...register('acessoRestrito', {
                required: 'O tipo de acesso é obrigatório',
              })}
            >
              <option value="todos">Todos</option>
              <option value="associados">Apenas Associados</option>
              <option value="funcionarios">Funcionários</option>
            </Select>
            <FormErrorMessage>
              {errors.acessoRestrito && errors.acessoRestrito.message}
            </FormErrorMessage>
          </FormControl>

          <Box width="100%">
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Perguntas
            </Text>
            <VStack spacing={6} align="stretch">
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  position="relative"
                >
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Tipo de Pergunta</FormLabel>
                      <Select {...register(`perguntas.${index}.tipo`)}>
                        <option value="multiple_choice">Múltipla Escolha</option>
                        <option value="text">Texto</option>
                        <option value="rating">Avaliação</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Pergunta</FormLabel>
                      <Input {...register(`perguntas.${index}.texto`)} />
                    </FormControl>

                    {watch(`perguntas.${index}.tipo`) === 'multiple_choice' && (
                      <Box>
                        <FormLabel>Opções</FormLabel>
                        <VStack spacing={2}>
                          {field.opcoes?.map((_, optionIndex) => (
                            <Input
                              key={optionIndex}
                              {...register(
                                `perguntas.${index}.opcoes.${optionIndex}`
                              )}
                            />
                          ))}
                          <Button
                            leftIcon={<FaPlus />}
                            size="sm"
                            onClick={() => {
                              const opcoes = [
                                ...(field.opcoes || []),
                                '',
                              ];
                              field.opcoes = opcoes;
                            }}
                          >
                            Adicionar Opção
                          </Button>
                        </VStack>
                      </Box>
                    )}

                    {index > 0 && (
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Remover pergunta"
                        colorScheme="red"
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        onClick={() => remove(index)}
                      />
                    )}
                  </Stack>
                </Box>
              ))}

              <Button
                leftIcon={<FaPlus />}
                onClick={() =>
                  append({ tipo: 'multiple_choice', texto: '', opcoes: [''] })
                }
              >
                Adicionar Pergunta
              </Button>
            </VStack>
          </Box>

          <Stack direction="row" spacing={4} width="100%" pt={4}>
            <Button
              onClick={() => navigate('/enquetes')}
              variant="outline"
              flex={1}
            >
              Cancelar
            </Button>
            <Button type="submit" colorScheme="brand" flex={1}>
              {enquete ? 'Atualizar' : 'Criar'} Enquete
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
} 