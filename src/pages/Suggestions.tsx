import React, { useState } from 'react';
import './Suggestions.css';

interface SuggestionForm {
  title: string;
  category: string;
  description: string;
  name: string;
  email: string;
}

const Suggestions: React.FC = () => {
  const [form, setForm] = useState<SuggestionForm>({
    title: '',
    category: '',
    description: '',
    name: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica para enviar a sugestão
    console.log('Sugestão enviada:', form);
    // Limpar formulário
    setForm({
      title: '',
      category: '',
      description: '',
      name: '',
      email: ''
    });
    alert('Sugestão enviada com sucesso!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="suggestions-page">
      <div className="suggestions-container">
        <h1>Sugestões</h1>
        
        <section className="suggestions-section">
          <h2>Envie sua sugestão</h2>
          <p>
            Sua opinião é muito importante para nós! Use o formulário abaixo para 
            enviar suas sugestões, críticas ou ideias para melhorar nossa associação.
          </p>

          <form className="suggestion-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título da Sugestão</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Ex: Melhorias na área de lazer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="infraestrutura">Infraestrutura</option>
                <option value="eventos">Eventos</option>
                <option value="servicos">Serviços</option>
                <option value="comunicacao">Comunicação</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Descreva sua sugestão em detalhes..."
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Seu Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Seu E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Enviar Sugestão
            </button>
          </form>
        </section>

        <section className="suggestions-section">
          <h2>Sugestões Recentes</h2>
          <div className="suggestions-list">
            <div className="suggestion-card">
              <span className="suggestion-category">Eventos</span>
              <h3>Festa Junina</h3>
              <p>Sugiro organizarmos uma grande festa junina para os associados...</p>
              <div className="suggestion-meta">
                <span>Por: João Silva</span>
                <span>Data: 15/01/2024</span>
              </div>
            </div>

            <div className="suggestion-card">
              <span className="suggestion-category">Infraestrutura</span>
              <h3>Melhorias na Academia</h3>
              <p>Seria ótimo se pudéssemos ter mais equipamentos na academia...</p>
              <div className="suggestion-meta">
                <span>Por: Maria Santos</span>
                <span>Data: 14/01/2024</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Suggestions; 