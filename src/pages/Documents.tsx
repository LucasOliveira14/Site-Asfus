import React, { useState } from 'react';
import { FaFileAlt, FaDownload, FaSearch } from 'react-icons/fa';
import './Documents.css';

interface Document {
  id: number;
  title: string;
  category: string;
  date: string;
  size: string;
  type: string;
}

const documents: Document[] = [
  {
    id: 1,
    title: 'Estatuto 2024',
    category: 'Institucional',
    date: '20/01/2024',
    size: '2.5 MB',
    type: 'PDF'
  },
  {
    id: 2,
    title: 'Regulamento Interno',
    category: 'Institucional',
    date: '15/01/2024',
    size: '1.8 MB',
    type: 'PDF'
  },
  {
    id: 3,
    title: 'Prestação de Contas 2023',
    category: 'Financeiro',
    date: '10/01/2024',
    size: '3.2 MB',
    type: 'PDF'
  },
  {
    id: 4,
    title: 'Calendário de Eventos 2024',
    category: 'Eventos',
    date: '05/01/2024',
    size: '1.1 MB',
    type: 'PDF'
  }
];

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Institucional', 'Financeiro', 'Eventos'];

  return (
    <main className="documents-page">
      <div className="documents-container">
        <h1>Documentos</h1>

        <section className="documents-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            <button
              className={`filter-button ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="documents-grid">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-icon">
                <FaFileAlt />
              </div>
              <div className="document-info">
                <h3>{doc.title}</h3>
                <span className="document-category">{doc.category}</span>
                <div className="document-meta">
                  <span>Data: {doc.date}</span>
                  <span>Tamanho: {doc.size}</span>
                  <span>Tipo: {doc.type}</span>
                </div>
              </div>
              <button className="download-button">
                <FaDownload />
                Download
              </button>
            </div>
          ))}
        </section>

        {filteredDocuments.length === 0 && (
          <div className="no-results">
            <p>Nenhum documento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Documents; 