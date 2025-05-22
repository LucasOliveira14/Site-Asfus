import {
  Box,
  VStack,
  Link,
  Icon,
  Text,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaNewspaper,
  FaPoll,
  FaFileAlt,
  FaCalendarAlt,
  FaHome,
  FaUserCog,
  FaChartBar,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export interface NavItem {
  icon: any;
  label: string;
  path: string;
  roles?: string[];
  requiresAssociate?: boolean;
}

interface NavItemProps {
  item: NavItem;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItemComponent({ item, isActive, onClick }: NavItemProps) {
  return (
    <Link
      as={RouterLink}
      to={item.path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'brand.400' : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
        _hover={{
          bg: 'brand.400',
          color: 'white',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          as={item.icon}
        />
        <Text>{item.label}</Text>
      </Flex>
    </Link>
  );
}

interface SidebarProps {
  items?: NavItem[];
  isLoading?: boolean;
  onItemClick?: (item: NavItem) => void;
}

const defaultNavItems: NavItem[] = [
  {
    icon: FaHome,
    label: 'Início',
    path: '/'
  },
  {
    icon: FaNewspaper,
    label: 'Notícias',
    path: '/noticias'
  },
  {
    icon: FaPoll,
    label: 'Enquetes',
    path: '/enquetes'
  },
  {
    icon: FaFileAlt,
    label: 'Documentos',
    path: '/documentos'
  },
  {
    icon: FaCalendarAlt,
    label: 'Reservas',
    path: '/reservas',
    requiresAssociate: true
  },
  {
    icon: FaUserCog,
    label: 'Perfil',
    path: '/profile',
    requiresAssociate: true
  },
  {
    icon: FaChartBar,
    label: 'Painel Admin',
    path: '/admin',
    roles: ['admin']
  }
];

export function Sidebar({ 
  items = defaultNavItems,
  isLoading = false,
  onItemClick
}: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="brand.400" />
      </Box>
    );
  }

  const filteredItems = items.filter(item => {
    if (item.requiresAssociate && !user?.isAssociate) return false;
    if (item.roles && !item.roles.includes(user?.role || '')) return false;
    return true;
  });

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <VStack spacing={4} align="stretch" pt={4}>
        {filteredItems.map((item) => (
          <NavItemComponent
            key={item.path}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </VStack>
    </Box>
  );
} 