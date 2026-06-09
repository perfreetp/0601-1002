import type { ChatSession, ChatMessage } from '@/types';

export const mockChatSessions: ChatSession[] = [
  {
    id: 'c1',
    name: '望京柴犬遛弯群',
    avatar: 'https://picsum.photos/id/1062/200/200',
    lastMessage: '小美: 明天早上6点半公园见~',
    lastTime: '09:15',
    unread: 3,
    type: 'group'
  },
  {
    id: 'c2',
    name: '宠物医生-李大夫',
    avatar: 'https://picsum.photos/id/64/200/200',
    lastMessage: '好的，明天上午10点带猫咪过来检查',
    lastTime: '昨天',
    unread: 0,
    type: 'private'
  },
  {
    id: 'c3',
    name: '布偶猫交流群',
    avatar: 'https://picsum.photos/id/783/200/200',
    lastMessage: '雪花麻麻: 我家猫咪也喜欢晒太阳~',
    lastTime: '昨天',
    unread: 12,
    type: 'group'
  },
  {
    id: 'c4',
    name: '出差的小李',
    avatar: 'https://picsum.photos/id/91/200/200',
    lastMessage: '太感谢你了！回来请你吃饭~',
    lastTime: '前天',
    unread: 0,
    type: 'private'
  },
  {
    id: 'c5',
    name: '宠物用品转让群',
    avatar: 'https://picsum.photos/id/160/200/200',
    lastMessage: '小王: 还有人要猫粮吗？便宜出~',
    lastTime: '06-07',
    unread: 0,
    type: 'group'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'other',
    senderName: '小美',
    senderAvatar: 'https://picsum.photos/id/64/200/200',
    content: '大家好！明天早上有人一起去朝阳公园遛狗吗？',
    type: 'text',
    createdAt: '2026-06-09T09:00:00',
    isMine: false
  },
  {
    id: 'm2',
    senderId: 'me',
    senderName: '我',
    senderAvatar: '',
    content: '我可以！我家豆豆正愁没人玩呢~',
    type: 'text',
    createdAt: '2026-06-09T09:05:00',
    isMine: true
  },
  {
    id: 'm3',
    senderId: 'other',
    senderName: '晨跑达人',
    senderAvatar: 'https://picsum.photos/id/91/200/200',
    content: '我也来！顺便可以跑两圈',
    type: 'text',
    createdAt: '2026-06-09T09:08:00',
    isMine: false
  },
  {
    id: 'm4',
    senderId: 'me',
    senderName: '我',
    senderAvatar: '',
    content: 'https://picsum.photos/id/237/400/300',
    type: 'image',
    createdAt: '2026-06-09T09:10:00',
    isMine: true
  },
  {
    id: 'm5',
    senderId: 'other',
    senderName: '小美',
    senderAvatar: 'https://picsum.photos/id/64/200/200',
    content: '',
    type: 'location',
    locationData: {
      latitude: 39.9339,
      longitude: 116.4821,
      address: '朝阳区朝阳公园南路1号'
    },
    createdAt: '2026-06-09T09:12:00',
    isMine: false
  },
  {
    id: 'm6',
    senderId: 'other',
    senderName: '小美',
    senderAvatar: 'https://picsum.photos/id/64/200/200',
    content: '明天早上6点半公园见~',
    type: 'text',
    createdAt: '2026-06-09T09:15:00',
    isMine: false
  }
];
