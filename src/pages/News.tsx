import React, { useState } from 'react';
import './News.css';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Nova área de lazer inaugurada com grande festa',
    category: 'Eventos',
    date: '15/01/2024',
    image: 'https://via.placeholder.com/600x400',
    excerpt: 'A ASFUS inaugurou sua nova área de lazer com uma grande festa para os associados. O espaço conta com piscina, churrasqueira e área de jogos.'
  },
  {
    id: 2,
    title: 'Convênio com nova rede de farmácias',
    category: 'Benefícios',
    date: '14/01/2024',
    image: 'https://via.placeholder.com/600x400',
    excerpt: 'Firmamos uma nova parceria que oferece descontos especiais em medicamentos para todos os associados.'
  },
  {
    id: 3,
    title: 'Resultados da pesquisa de satisfação',
    category: 'Institucional',
    date: '13/01/2024',
    image: 'https://via.placeholder.com/600x400',
    excerpt: 'Confira os resultados da última pesquisa de satisfação realizada com nossos associados.'
  }
];

const categories = ['Todas', 'Eventos', 'Benefícios', 'Institucional'];

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredNews = selectedCategory === 'Todas'
    ? newsItems
    : newsItems.filter(news => news.category === selectedCategory);

  return (
    <main className="news-page">
      <div className="news-container">
        <h1>Notícias</h1>

        <section className="featured-news">
          <div className="featured-news-content">
            <span className="news-category">Destaque</span>
            <h2>Assembleia Geral define novo plano de ação para 2024</h2>
            <p>
              Em reunião realizada no último sábado, associados definiram as principais
              diretrizes e projetos que serão implementados ao longo do ano.
            </p>
            <button className="read-more-button">Ler mais</button>
          </div>
        </section>

        <section className="news-filters">
          <div className="search-box">
            <input type="text" placeholder="Buscar notícias..." />
          </div>
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-button${selectedCategory === cat ? ' active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="news-grid">
          {filteredNews.map(news => (
            <article key={news.id} className="news-card">
              <div className="news-image">
                <img src={news.image} alt={news.title} />
                <span className="news-category">{news.category}</span>
              </div>
              <div className="news-content">
                <span className="news-date">{news.date}</span>
                <h3>{news.title}</h3>
                <p>{news.excerpt}</p>
                <button className="read-more-button">Ler mais</button>
              </div>
            </article>
          ))}
        </section>

        <div className="pagination">
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <span>...</span>
          <button className="pagination-button">10</button>
        </div>
      </div>
    </main>
  );
};

export default News; 