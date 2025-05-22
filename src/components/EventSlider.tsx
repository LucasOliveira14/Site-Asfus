import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './EventSlider.css';

export interface Event {
  id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  date?: string;
  location?: string;
  url?: string;
}

interface EventSliderProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
  isLoading?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

const defaultEvents: Event[] = [
  {
    id: '1',
    image: '/images/event1.jpg',
    title: 'Nova área de lazer inaugurada com grande festa para associados',
    category: 'Eventos',
    description: 'Venha conhecer nossa nova área de lazer...',
    date: '2024-02-15',
    location: 'Área de Lazer ASFUS'
  }
];

const EventSlider: React.FC<EventSliderProps> = ({
  events = defaultEvents,
  onEventClick,
  isLoading = false,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    if (!autoPlay || isLoading || events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, events.length, isLoading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  if (isLoading) {
    return (
      <div className="slider-container">
        <div className="slide loading">
          <div className="slide-content">
            <span className="category">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="slider-container">
        <div className="slide">
          <div className="slide-content">
            <span className="category">Nenhum evento disponível</span>
          </div>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentSlide];

  return (
    <div className="slider-container">
      {events.length > 1 && (
        <>
          <button className="slider-button prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          
          <button className="slider-button next" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          <div className="slider-dots">
            {events.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
      
      <div 
        className="slide"
        onClick={() => onEventClick?.(currentEvent)}
        style={{ cursor: onEventClick ? 'pointer' : 'default' }}
      >
        <img src={currentEvent.image} alt={currentEvent.title} />
        <div className="slide-content">
          <span className="category">{currentEvent.category}</span>
          <h2>{currentEvent.title}</h2>
          {currentEvent.description && (
            <p className="event-description">{currentEvent.description}</p>
          )}
          {currentEvent.date && (
            <p className="event-date">{currentEvent.date}</p>
          )}
          {currentEvent.location && (
            <p className="event-location">{currentEvent.location}</p>
          )}
          {onEventClick && (
            <button className="read-more">Clique para ler mais</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSlider; 