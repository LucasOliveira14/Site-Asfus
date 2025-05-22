import React from 'react';
import { FaFileAlt, FaPoll } from 'react-icons/fa';
import './InfoSection.css';

export interface Document {
  id: string;
  title: string;
  date: string;
  url?: string;
}

export interface Poll {
  id: string;
  title: string;
  endDate: string;
  participation: number;
  totalVotes?: number;
  options?: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
}

interface InfoSectionProps {
  documents?: Document[];
  polls?: Poll[];
  onDocumentClick?: (document: Document) => void;
  onPollClick?: (poll: Poll) => void;
  isLoading?: boolean;
}

const defaultDocuments: Document[] = [
  {
    id: '1',
    title: 'Estatuto 2024',
    date: '2024-01-20'
  },
  {
    id: '2',
    title: 'Regulamento Interno',
    date: '2024-01-15'
  }
];

const defaultPolls: Poll[] = [
  {
    id: '1',
    title: 'Pesquisa de satisfação 2024',
    endDate: '2024-02-01',
    participation: 70
  },
  {
    id: '2',
    title: 'Sugestões para eventos',
    endDate: '2024-01-25',
    participation: 85
  }
];

const InfoSection: React.FC<InfoSectionProps> = ({
  documents = defaultDocuments,
  polls = defaultPolls,
  onDocumentClick,
  onPollClick,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="info-section">
        <div className="section-box loading">
          <div className="section-title">
            <FaFileAlt className="section-icon" /> Carregando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="info-section">
      <div className="section-box">
        <div className="section-title">
          <FaFileAlt className="section-icon" /> Últimos Documentos
        </div>
        <div className="documents-list">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="document-item"
              onClick={() => onDocumentClick?.(doc)}
              style={{ cursor: onDocumentClick ? 'pointer' : 'default' }}
            >
              <FaFileAlt className="doc-icon" />
              <div className="doc-info">
                <div className="document-title">{doc.title}</div>
                <div className="document-date">{doc.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-box">
        <div className="section-title">
          <FaPoll className="section-icon" /> Enquetes Ativas
        </div>
        <div className="polls-list">
          {polls.map((poll) => (
            <div 
              key={poll.id} 
              className="poll-item"
              onClick={() => onPollClick?.(poll)}
              style={{ cursor: onPollClick ? 'pointer' : 'default' }}
            >
              <div className="poll-title">{poll.title}</div>
              <div className="poll-date">Encerra em: {poll.endDate}</div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${poll.participation}%` }}
                />
              </div>
              <div className="participation">
                {poll.participation}% de participação
                {poll.totalVotes && ` (${poll.totalVotes} votos)`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection; 