import React, { useEffect, useState } from 'react';
import { Poll } from '../types/interfaces';
import { ApiService } from '../services/api';
import './Polls.css';

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getPolls();
      setPolls(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar as enquetes. Tente novamente mais tarde.');
      console.error('Erro ao carregar enquetes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: string, optionId: string) => {
    try {
      await ApiService.votePoll(pollId, optionId);
      await loadPolls(); // Recarrega as enquetes para atualizar os votos
    } catch (err) {
      setError('Erro ao registrar voto. Tente novamente mais tarde.');
      console.error('Erro ao votar:', err);
    }
  };

  if (loading) {
    return <div className="polls-container">Carregando enquetes...</div>;
  }

  if (error) {
    return (
      <div className="polls-container">
        <div className="error-message">{error}</div>
        <button onClick={loadPolls}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="polls-page">
      <div className="polls-container">
        <h1>Enquetes</h1>
        
        <section className="active-polls">
          <h2>Enquetes Ativas</h2>
          {polls.filter(poll => poll.isActive).map(poll => (
            <div key={poll.id} className="poll-card">
              <h3>{poll.title}</h3>
              <div className="poll-info">
                <span>Início: {new Date(poll.startDate).toLocaleDateString()}</span>
                <span>Término: {new Date(poll.endDate).toLocaleDateString()}</span>
              </div>
              <p>{poll.description}</p>
              
              <div className="poll-options">
                {poll.options.map(option => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                  const percentage = totalVotes > 0 
                    ? Math.round((option.votes / totalVotes) * 100) 
                    : 0;

                  return (
                    <div key={option.id} className="poll-option">
                      <div className="option-header">
                        <label className="option-label">
                          <input
                            type="radio"
                            name={`poll-${poll.id}`}
                            onChange={() => handleVote(poll.id, option.id)}
                          />
                          {option.text}
                        </label>
                        <span className="vote-percentage">{percentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="past-polls">
          <h2>Enquetes Encerradas</h2>
          {polls.filter(poll => !poll.isActive).map(poll => (
            <div key={poll.id} className="poll-card">
              <h3>{poll.title}</h3>
              <div className="poll-info">
                <span>Encerrada em: {new Date(poll.endDate).toLocaleDateString()}</span>
              </div>
              <p>{poll.description}</p>
              
              <div className="poll-options">
                {poll.options.map(option => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                  const percentage = totalVotes > 0 
                    ? Math.round((option.votes / totalVotes) * 100) 
                    : 0;

                  return (
                    <div key={option.id} className="poll-option">
                      <div className="option-header">
                        <span className="option-text">{option.text}</span>
                        <span className="vote-percentage">{percentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PollsPage; 