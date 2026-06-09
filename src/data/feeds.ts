import type { Feed } from '@/types';

export const mockFeeds: Feed[] = [
  {
    id: '1',
    userId: 'u1',
    userName: '小美的金毛',
    userAvatar: 'https://picsum.photos/id/64/200/200',
    content: '今天带豆豆去公园玩，遇到了好多小伙伴！它开心得不得了~分享给大家看看它的笑脸 😄',
    images: [
      'https://picsum.photos/id/237/750/500',
      'https://picsum.photos/id/1025/750/500'
    ],
    type: 'dynamic',
    location: '朝阳公园',
    distance: '0.8km',
    likes: 128,
    comments: 32,
    createdAt: '2026-06-09T08:30:00',
    isLiked: false
  },
  {
    id: '2',
    userId: 'u2',
    userName: '猫奴小王',
    userAvatar: 'https://picsum.photos/id/91/200/200',
    content: '紧急求助！我家猫咪今天早上突然呕吐，精神不太好，附近有没有靠谱的宠物医院推荐？谢谢大家！',
    images: [],
    type: 'help',
    location: '望京SOHO',
    distance: '1.2km',
    likes: 15,
    comments: 48,
    createdAt: '2026-06-09T07:15:00',
    isLiked: true
  },
  {
    id: '3',
    userId: 'u3',
    userName: '柴犬爸爸',
    userAvatar: 'https://picsum.photos/id/177/200/200',
    content: '#新手养狗# 刚接回家的小柴犬，请问大家都喂什么狗粮？什么牌子比较适合幼犬呀？求推荐！',
    images: [
      'https://picsum.photos/id/1062/750/500'
    ],
    type: 'topic',
    topicTag: '新手养狗',
    location: '国贸CBD',
    distance: '2.5km',
    likes: 67,
    comments: 89,
    createdAt: '2026-06-08T20:45:00',
    isLiked: false
  },
  {
    id: '4',
    userId: 'u4',
    userName: '布偶猫的日常',
    userAvatar: 'https://picsum.photos/id/338/200/200',
    content: '小雪花又在晒太阳了，这个姿势也太舒服了吧~每天看它都觉得好治愈 ☀️',
    images: [
      'https://picsum.photos/id/783/750/500'
    ],
    type: 'dynamic',
    location: '中关村',
    distance: '3.1km',
    likes: 256,
    comments: 45,
    createdAt: '2026-06-08T15:20:00',
    isLiked: true
  },
  {
    id: '5',
    userId: 'u5',
    userName: '边牧的铲屎官',
    userAvatar: 'https://picsum.photos/id/1027/200/200',
    content: '#宠物训练# 分享一下我家边牧学会握手的小技巧，用零食引导真的很有效！大家有什么训练心得也来聊聊吧~',
    images: [
      'https://picsum.photos/id/1025/750/500'
    ],
    type: 'topic',
    topicTag: '宠物训练',
    location: '五道口',
    distance: '4.0km',
    likes: 189,
    comments: 67,
    createdAt: '2026-06-08T10:30:00',
    isLiked: false
  },
  {
    id: '6',
    userId: 'u6',
    userName: '橘座大人',
    userAvatar: 'https://picsum.photos/id/1012/200/200',
    content: '求问大家，橘猫需要减肥吗？我家的已经12斤了，但是它真的很想吃东西...每次看着都不忍心拒绝 😿',
    images: [
      'https://picsum.photos/id/659/750/500'
    ],
    type: 'help',
    location: '三里屯',
    distance: '1.8km',
    likes: 98,
    comments: 156,
    createdAt: '2026-06-07T21:00:00',
    isLiked: false
  }
];

export const hotTopics = [
  { id: 't1', name: '新手养狗', count: 2341 },
  { id: 't2', name: '猫咪护理', count: 1892 },
  { id: 't3', name: '宠物训练', count: 1567 },
  { id: 't4', name: '宠物健康', count: 2108 },
  { id: 't5', name: '萌宠日常', count: 3456 }
];
