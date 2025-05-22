import { Box, Container, Flex } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar, NavItem } from './Sidebar';
import { useState, useCallback } from 'react';

export function Layout() {
  const [isSidebarLoading, setIsSidebarLoading] = useState(false);
  const location = useLocation();

  const handleNavItemClick = useCallback((item: NavItem) => {
    // Aqui você pode adicionar lógica adicional quando um item do menu é clicado
    // Por exemplo, rastreamento de analytics, pré-carregamento de dados, etc.
    console.log(`Navegando para: ${item.path}`);
  }, []);

  return (
    <Box minH="100vh">
      <Header />
      <Flex>
        <Sidebar 
          isLoading={isSidebarLoading}
          onItemClick={handleNavItemClick}
        />
        <Box 
          flex="1" 
          p={8}
          ml={{ base: 0, md: '240px' }} // Ajusta o conteúdo para não sobrepor a sidebar
        >
          <Container maxW="container.xl">
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Box>
  );
} 