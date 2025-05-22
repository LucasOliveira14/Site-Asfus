import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'user';
  isAssociate: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  requestAssociateMembership: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn(email: string, password: string) {
    try {
      // TODO: Implementar integração com backend
      const mockUser = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
        role: 'user' as const,
        isAssociate: false,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  function signOut() {
    setUser(null);
  }

  async function requestAssociateMembership() {
    try {
      // TODO: Implementar integração com backend
      console.log('Solicitação de associação enviada');
    } catch (error) {
      console.error('Erro ao solicitar associação:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, requestAssociateMembership }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 