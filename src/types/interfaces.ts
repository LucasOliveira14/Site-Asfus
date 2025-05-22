export interface Poll {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  options: PollOption[];
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  imageUrl?: string;
  tags: string[];
  featured: boolean;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  uploadDate: Date;
  fileType: string;
  fileSize: number;
  tags: string[];
}

export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  startDateTime: Date;
  endDateTime: Date;
  purpose: string;
  attendees: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  imageUrl: string;
  amenities: string[];
  isAvailable: boolean;
}

export interface Suggestion {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
} 