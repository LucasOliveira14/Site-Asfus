import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Noticias } from './pages/Noticias';
import { NoticiaForm } from './pages/Noticias/NoticiaForm';
import { Enquetes } from './pages/Enquetes';
import { EnqueteForm } from './pages/Enquetes/EnqueteForm';
import { Documentos } from './pages/Documentos';
import { DocumentoForm } from './pages/Documentos/DocumentoForm';
import { Reservas } from './pages/Reservas';
import { ReservaForm } from './pages/Reservas/ReservaForm';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AssociateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user?.isAssociate) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/noticias" />,
      },
      {
        path: '/noticias',
        element: <Noticias />,
      },
      {
        path: '/noticias/nova',
        element: (
          <AdminRoute>
            <NoticiaForm />
          </AdminRoute>
        ),
      },
      {
        path: '/noticias/:id/editar',
        element: (
          <AdminRoute>
            <NoticiaForm />
          </AdminRoute>
        ),
      },
      {
        path: '/enquetes',
        element: <Enquetes />,
      },
      {
        path: '/enquetes/nova',
        element: (
          <AdminRoute>
            <EnqueteForm />
          </AdminRoute>
        ),
      },
      {
        path: '/enquetes/:id/editar',
        element: (
          <AdminRoute>
            <EnqueteForm />
          </AdminRoute>
        ),
      },
      {
        path: '/documentos',
        element: <Documentos />,
      },
      {
        path: '/documentos/novo',
        element: (
          <AdminRoute>
            <DocumentoForm />
          </AdminRoute>
        ),
      },
      {
        path: '/documentos/:id/editar',
        element: (
          <AdminRoute>
            <DocumentoForm />
          </AdminRoute>
        ),
      },
      {
        path: '/reservas',
        element: (
          <AssociateRoute>
            <Reservas />
          </AssociateRoute>
        ),
      },
      {
        path: '/reservas/nova',
        element: (
          <AssociateRoute>
            <ReservaForm />
          </AssociateRoute>
        ),
      },
      {
        path: '/reservas/:id/editar',
        element: (
          <AssociateRoute>
            <ReservaForm />
          </AssociateRoute>
        ),
      },
    ],
  },
]); 