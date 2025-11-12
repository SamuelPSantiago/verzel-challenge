import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex gap-6">
              <Link to="/movies" className="text-lg font-semibold hover:text-primary">
                Filmes
              </Link>
              <Link to="/lists" className="text-lg font-semibold hover:text-primary">
                Minhas listas
              </Link>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
}

