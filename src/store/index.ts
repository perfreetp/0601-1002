import { create } from 'zustand';
import type { HelpPost, ChatMessage, KnowledgeNote, ChatSession } from '@/types';
import { mockHelps } from '@/data/helps';
import { mockChatMessages, mockChatSessions } from '@/data/chats';
import { mockKnowledge } from '@/data/knowledge';
import { mockFeeds } from '@/data/feeds';

interface Comment {
  id: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
}

interface AppState {
  helpPosts: HelpPost[];
  chatMessages: Record<string, ChatMessage[]>;
  chatSessions: ChatSession[];
  knowledgeNotes: KnowledgeNote[];
  comments: Record<string, Comment[]>;
  feedCommentCounts: Record<string, number>;

  addHelpPost: (post: HelpPost) => void;
  updateHelpStatus: (postId: string, status: 'open' | 'closed') => void;
  deleteHelpPost: (postId: string) => void;
  addChatMessage: (chatId: string, msg: ChatMessage) => void;
  toggleKnowledgeCollect: (noteId: string) => void;
  addComment: (feedId: string, comment: Comment) => void;
  getFeedCommentCount: (feedId: string) => number;
}

const initialCommentCounts: Record<string, number> = {};
mockFeeds.forEach(f => {
  initialCommentCounts[f.id] = f.comments;
});

const initialComments: Record<string, Comment[]> = {
  f1: [
    { id: 'c1', name: '猫奴小王', avatar: 'https://picsum.photos/id/91/200/200', text: '太可爱了！我家的也超爱玩~', time: '2小时前' },
    { id: 'c2', name: '柴犬爸爸', avatar: 'https://picsum.photos/id/177/200/200', text: '柴犬的笑容真的很治愈！', time: '1小时前' },
    { id: 'c3', name: '布偶猫的日常', avatar: 'https://picsum.photos/id/338/200/200', text: '好想去公园一起玩呀！', time: '30分钟前' }
  ],
  f2: [
    { id: 'c4', name: '金毛主人', avatar: 'https://picsum.photos/id/237/200/200', text: '我家狗狗也是这个问题，后来换了狗粮就好了', time: '5小时前' }
  ]
};

export const useAppStore = create<AppState>((set, get) => ({
  helpPosts: mockHelps,
  chatMessages: {
    c1: mockChatMessages,
    c2: mockChatMessages.slice(0, 3),
    c3: mockChatMessages.slice(0, 4)
  },
  chatSessions: mockChatSessions,
  knowledgeNotes: mockKnowledge,
  comments: initialComments,
  feedCommentCounts: initialCommentCounts,

  addHelpPost: (post) => {
    set({ helpPosts: [post, ...get().helpPosts] });
  },

  updateHelpStatus: (postId, status) => {
    const posts = get().helpPosts.map(p =>
      p.id === postId ? { ...p, status } : p
    );
    set({ helpPosts: posts });
  },

  deleteHelpPost: (postId) => {
    set({ helpPosts: get().helpPosts.filter(p => p.id !== postId) });
  },

  addChatMessage: (chatId, msg) => {
    const current = get().chatMessages[chatId] || [];
    const newMessages = [...current, msg];
    const newChatMessages = {
      ...get().chatMessages,
      [chatId]: newMessages
    };

    let lastContent = msg.content;
    if (msg.type === 'image') {
      lastContent = '[图片]';
    } else if (msg.type === 'location') {
      lastContent = '[位置分享]';
    }

    const newSessions = get().chatSessions.map(s => {
      if (s.id === chatId) {
        return {
          ...s,
          lastMessage: lastContent,
          lastTime: '刚刚',
          unread: s.unread
        };
      }
      return s;
    });

    set({
      chatMessages: newChatMessages,
      chatSessions: newSessions
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
    const newComments = {
      ...get().comments,
      [feedId]: [...current, comment]
    };
    const newCounts = {
      ...get().feedCommentCounts,
      [feedId]: (get().feedCommentCounts[feedId] || 0) + 1
    };
    set({ comments: newComments, feedCommentCounts: newCounts });
  },

  getFeedCommentCount: (feedId) => {
    return get().feedCommentCounts[feedId] || 0;
  }
}));
