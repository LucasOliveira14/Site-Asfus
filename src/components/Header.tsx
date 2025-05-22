import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import './Header.css';

// Altere o caminho abaixo conforme onde você salvar a imagem
import logoAsfus from './logo-asfus.png';

interface MenuItem {
  path: string;
  label: string;
}

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
  socialLinks?: SocialLink[];
  onSearch?: (searchTerm: string) => void;
  onAssociateClick?: () => void;
}

const defaultMenuItems: MenuItem[] = [
  { path: '/', label: 'Início' },
  { path: '/sobre', label: 'Sobre Asfus' },
  { path: '/sugestoes', label: 'Sugestões' },
  { path: '/noticias', label: 'Notícias' },
  { path: '/documentos', label: 'Documentos' },
  { path: '/enquetes', label: 'Enquetes' },
  { path: '/reservas', label: 'Reservas' },
];

const defaultSocialLinks: SocialLink[] = [
  { icon: <FaFacebook />, url: '#' },
  { icon: <FaTwitter />, url: '#' },
  { icon: <FaInstagram />, url: '#' },
];

const Header: React.FC<HeaderProps> = ({
  menuItems = defaultMenuItems,
  socialLinks = defaultSocialLinks,
  onSearch,
  onAssociateClick,
}) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img 
              src={logoAsfus} 
              alt="Logo ASFUS" 
              className="logo" 
            />
          </Link>
        </div>
        
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <BiSearch size={20} />
          </button>
        </form>

        <div className="social-container">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} className="social-link">
              {link.icon}
            </a>
          ))}
          <button 
            className="associate-button"
            onClick={onAssociateClick}
          >
            Seja associado
          </button>
        </div>
      </div>

      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 