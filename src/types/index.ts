export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  creditScore: number;
  pets: Pet[];
}

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female';
  avatar: string;
  vaccines: VaccineRecord[];
  allergies: string[];
  anniversaries: Anniversary[];
}

export interface VaccineRecord {
  id: string;
  name: string;
  date: string;
  nextDate?: string;
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
}

export interface Feed {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images: string[];
  type: 'dynamic' | 'help' | 'topic';
  topicTag?: string;
  location: string;
  distance: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
}

export interface HelpPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'foster' | 'walk' | 'transfer' | 'lost';
  title: string;
  description: string;
  images: string[];
  location: string;
  contact: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface Place {
  id: string;
  name: string;
  type: 'shop' | 'hospital' | 'park';
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  distance: string;
  tags: string[];
  image: string;
}

export interface ChatSession {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  type: 'group' | 'private';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'location';
  locationData?: { latitude: number; longitude: number; address: string };
  createdAt: string;
  isMine: boolean;
}

export interface KnowledgeNote {
  id: string;
  category: 'feeding' | 'training' | 'care';
  title: string;
  summary: string;
  cover: string;
  author: string;
  views: number;
  isCollected: boolean;
  tags: string[];
}
