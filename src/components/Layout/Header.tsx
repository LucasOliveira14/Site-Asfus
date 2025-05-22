import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useAuth();

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <RouterLink to="/">
            <Image h="40px" src="/logo.png" alt="ASFUS Logo" />
          </RouterLink>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaUserCircle size={24} />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem as={RouterLink} to="/profile">
                      Perfil
                    </MenuItem>
                    {user.role === 'admin' && (
                      <MenuItem as={RouterLink} to="/admin">
                        Painel Admin
                      </MenuItem>
                    )}
                    <MenuItem onClick={signOut}>Sair</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button as={RouterLink} to="/login">
                  Entrar
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 