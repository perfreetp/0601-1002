import { create } from 'zustand';
import type { HelpPost, ChatMessage, KnowledgeNote } from '@/types';
import { mockHelps } from '@/data/helps';
import { mockChatMessages } from '@/data/chats';
import { mockKnowledge } from '@/data/knowledge';

interface AppState {
  helpPosts: HelpPost[];
  chatMessages: Record<string, ChatMessage[]>;
  knowledgeNotes: KnowledgeNote[];
  comments: Record<string, Array<{ id: string; name: string; avatar: string; text: string; time: string }>>;

  addHelpPost: (post: HelpPost) => void;
  addChatMessage: (chatId: string, msg: ChatMessage) => void;
  toggleKnowledgeCollect: (noteId: string) => void;
  addComment: (feedId: string, comment: { id: string; name: string; avatar: string; text: string; time: string }) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  helpPosts: mockHelps,
  chatMessages: {
    c1: mockChatMessages,
    c2: mockChatMessages.slice(0, 3),
    c3: mockChatMessages.slice(0, 4)
  },
  knowledgeNotes: mockKnowledge,
  comments: {},

  addHelpPost: (post) => {
    set({ helpPosts: [post, ...get().helpPosts] });
  },

  addChatMessage: (chatId, msg) => {
    const current = get().chatMessages[chatId] || [];
    set({
      chatMessages: {
        ...get().chatMessages,
        [chatId]: [...current, msg]
      }
    });
  },

  toggleKnowledgeCollect: (noteId) => {
    const notes = get().knowledgeNotes.map(n =>
      n.id === noteId ? { ...n, isCollected: !n.isCollected } : n
    );
    set({ knowledgeNotes: notes });
  },

  addComment: (feedId, comment) => {
    const current = get().comments[feedId] || [];
    set({
      comments: {
        ...get().comments,
        [feedId]: [...current, comment]
      }
    });
  }
}));
