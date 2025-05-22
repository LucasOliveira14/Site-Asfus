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
  Textarea,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ReservaFormData {
  espaco: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  descricao: string;
}

interface ReservaFormProps {
  reserva?: {
    id: string;
    espaco: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    descricao: string;
  };
}

const espacos = [
  'Salão de Festas',
  'Quadra Poliesportiva',
  'Churrasqueira',
  'Sala de Jogos',
];

const horarios = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

export function ReservaForm({ reserva }: ReservaFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservaFormData>({
    defaultValues: reserva,
  });

  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const onSubmit = async (data: ReservaFormData) => {
    try {
      // TODO: Implementar integração com backend
      console.log('Dados do formulário:', data);
      
      toast({
        title: 'Sucesso!',
        description: reserva
          ? 'Reserva atualizada com sucesso!'
          : 'Reserva solicitada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/reservas');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a reserva.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const horarioInicio = watch('horarioInicio');
  const horariosFim = horarios.filter(
    (horario) => horario > (horarioInicio || '00:00')
  );

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
          <Text fontSize="2xl" fontWeight="bold">
            {reserva ? 'Editar Reserva' : 'Nova Reserva'}
          </Text>

          <FormControl isInvalid={!!errors.espaco}>
            <FormLabel>Espaço</FormLabel>
            <Select
              {...register('espaco', {
                required: 'O espaço é obrigatório',
              })}
            >
              <option value="">Selecione um espaço</option>
              {espacos.map((espaco) => (
                <option key={espaco} value={espaco}>
                  {espaco}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.espaco && errors.espaco.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.data}>
            <FormLabel>Data</FormLabel>
            <Input
              type="date"
              {...register('data', {
                required: 'A data é obrigatória',
              })}
              min={new Date().toISOString().split('T')[0]}
            />
            <FormErrorMessage>
              {errors.data && errors.data.message}
            </FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={4} width="100%">
            <FormControl isInvalid={!!errors.horarioInicio}>
              <FormLabel>Horário de Início</FormLabel>
              <Select
                {...register('horarioInicio', {
                  required: 'O horário de início é obrigatório',
                })}
              >
                <option value="">Selecione</option>
                {horarios.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.horarioInicio && errors.horarioInicio.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.horarioFim}>
              <FormLabel>Horário de Término</FormLabel>
              <Select
                {...register('horarioFim', {
                  required: 'O horário de término é obrigatório',
                })}
                disabled={!horarioInicio}
              >
                <option value="">Selecione</option>
                {horariosFim.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.horarioFim && errors.horarioFim.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={!!errors.descricao}>
            <FormLabel>Descrição do Evento</FormLabel>
            <Textarea
              {...register('descricao', {
                required: 'A descrição é obrigatória',
              })}
              placeholder="Descreva o evento que será realizado..."
            />
            <FormErrorMessage>
              {errors.descricao && errors.descricao.message}
            </FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={4} width="100%" pt={4}>
            <Button
              onClick={() => navigate('/reservas')}
              variant="outline"
              flex={1}
            >
              Cancelar
            </Button>
            <Button type="submit" colorScheme="brand" flex={1}>
              {reserva ? 'Atualizar' : 'Solicitar'} Reserva
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
} 