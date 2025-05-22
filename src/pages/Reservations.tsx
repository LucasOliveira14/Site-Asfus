import React, { useState } from 'react';
import './Reservations.css';

interface Space {
  id: number;
  name: string;
  description: string;
  capacity: number;
  image: string;
  availableTimes: string[];
}

interface Reservation {
  id: number;
  spaceId: number;
  date: string;
  time: string;
  userName: string;
  purpose: string;
  attendees: number;
  status: 'pending' | 'approved' | 'rejected';
}

const spaces: Space[] = [
  {
    id: 1,
    name: 'Salão de Festas',
    description: 'Espaço amplo com cozinha equipada, mesas, cadeiras e sistema de som.',
    capacity: 100,
    image: 'https://via.placeholder.com/400x300',
    availableTimes: ['09:00', '14:00', '19:00']
  },
  {
    id: 2,
    name: 'Quadra Poliesportiva',
    description: 'Quadra coberta para práticas esportivas diversas.',
    capacity: 30,
    image: 'https://via.placeholder.com/400x300',
    availableTimes: ['08:00', '10:00', '14:00', '16:00', '18:00']
  },
  {
    id: 3,
    name: 'Sala de Reuniões',
    description: 'Sala equipada com projetor, quadro branco e mesa para 12 pessoas.',
    capacity: 12,
    image: 'https://via.placeholder.com/400x300',
    availableTimes: ['09:00', '11:00', '14:00', '16:00']
  }
];

const Reservations: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [reservationForm, setReservationForm] = useState({
    date: '',
    time: '',
    userName: '',
    purpose: '',
    attendees: 0
  });

  const handleSpaceSelect = (space: Space) => {
    setSelectedSpace(space);
    setReservationForm({
      date: '',
      time: '',
      userName: '',
      purpose: '',
      attendees: 0
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica para enviar a reserva
    console.log('Reserva enviada:', { ...reservationForm, spaceId: selectedSpace?.id });
    alert('Reserva enviada com sucesso! Aguarde a aprovação.');
    setSelectedSpace(null);
    setReservationForm({
      date: '',
      time: '',
      userName: '',
      purpose: '',
      attendees: 0
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="reservations-page">
      <div className="reservations-container">
        <h1>Reservas</h1>

        <section className="spaces-grid">
          {spaces.map(space => (
            <div
              key={space.id}
              className={`space-card ${selectedSpace?.id === space.id ? 'selected' : ''}`}
              onClick={() => handleSpaceSelect(space)}
            >
              <img src={space.image} alt={space.name} />
              <div className="space-info">
                <h3>{space.name}</h3>
                <p>{space.description}</p>
                <div className="space-details">
                  <span>Capacidade: {space.capacity} pessoas</span>
                  <span>{space.availableTimes.length} horários disponíveis</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {selectedSpace && (
          <section className="reservation-form-section">
            <h2>Reservar {selectedSpace.name}</h2>
            <form onSubmit={handleFormSubmit} className="reservation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={reservationForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Horário</label>
                  <select
                    id="time"
                    name="time"
                    value={reservationForm.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {selectedSpace.availableTimes.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="userName">Seu Nome</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={reservationForm.userName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="purpose">Finalidade da Reserva</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={reservationForm.purpose}
                  onChange={handleInputChange}
                  required
                  placeholder="Descreva o objetivo da sua reserva"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="attendees">Número de Participantes</label>
                <input
                  type="number"
                  id="attendees"
                  name="attendees"
                  value={reservationForm.attendees}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max={selectedSpace.capacity}
                />
                <small>Máximo: {selectedSpace.capacity} pessoas</small>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setSelectedSpace(null)} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="submit-button">
                  Enviar Reserva
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="my-reservations">
          <h2>Minhas Reservas</h2>
          <div className="reservations-table">
            <table>
              <thead>
                <tr>
                  <th>Espaço</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Finalidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salão de Festas</td>
                  <td>25/02/2024</td>
                  <td>19:00</td>
                  <td>Aniversário</td>
                  <td><span className="status approved">Aprovado</span></td>
                </tr>
                <tr>
                  <td>Quadra Poliesportiva</td>
                  <td>28/02/2024</td>
                  <td>16:00</td>
                  <td>Torneio de Vôlei</td>
                  <td><span className="status pending">Pendente</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Reservations; 