import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  Container,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="2xl" fontWeight="bold">
            Login
          </Text>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /@suape\.pe\.gov\.br$/,
                  message: 'Use seu email @suape.pe.gov.br',
                },
              })}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: 'Senha é obrigatória',
              })}
            />
          </FormControl>

          <Stack spacing={6} width="100%">
            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
            >
              Entrar
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
} 