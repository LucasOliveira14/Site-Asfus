import { Poll, News, Document, Reservation, Space, Suggestion } from '../types/interfaces';

// Esta é uma implementação temporária que pode ser substituída por chamadas reais à API no futuro
export class ApiService {
  // Polls
  static async getPolls(): Promise<Poll[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async createPoll(poll: Omit<Poll, 'id'>): Promise<Poll> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  static async votePoll(pollId: string, optionId: string): Promise<void> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  // News
  static async getNews(filters?: { category?: string; featured?: boolean }): Promise<News[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async createNews(news: Omit<News, 'id'>): Promise<News> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  // Documents
  static async getDocuments(filters?: { category?: string; tags?: string[] }): Promise<Document[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async uploadDocument(document: Omit<Document, 'id'>): Promise<Document> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  // Reservations
  static async getReservations(filters?: { status?: string; userId?: string }): Promise<Reservation[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async createReservation(reservation: Omit<Reservation, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  static async updateReservationStatus(reservationId: string, status: 'approved' | 'rejected'): Promise<void> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }

  // Spaces
  static async getSpaces(): Promise<Space[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async checkSpaceAvailability(spaceId: string, startDateTime: Date, endDateTime: Date): Promise<boolean> {
    // Implementar chamada à API real no futuro
    return true;
  }

  // Suggestions
  static async getSuggestions(): Promise<Suggestion[]> {
    // Implementar chamada à API real no futuro
    return [];
  }

  static async createSuggestion(suggestion: Omit<Suggestion, 'id' | 'status' | 'date'>): Promise<Suggestion> {
    // Implementar chamada à API real no futuro
    throw new Error('Não implementado');
  }
} 