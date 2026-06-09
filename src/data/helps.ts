import type { HelpPost } from '@/types';

export const mockHelps: HelpPost[] = [
  {
    id: 'h1',
    userId: 'u1',
    userName: '出差的小李',
    userAvatar: 'https://picsum.photos/id/64/200/200',
    type: 'foster',
    title: '出差一周，求靠谱好心人帮忙寄养柯基',
    description: '下周一到周日需要出差，家里有一只3岁的柯基，性格温顺不拆家，已绝育疫苗齐全。希望找个有养狗经验的小伙伴帮忙照顾，可以有偿，谢谢！',
    images: [
      'https://picsum.photos/id/237/750/500'
    ],
    location: '朝阳区望京',
    contact: '微信：li***123',
    status: 'open',
    createdAt: '2026-06-09T09:00:00'
  },
  {
    id: 'h2',
    userId: 'u2',
    userName: '晨跑达人',
    userAvatar: 'https://picsum.photos/id/91/200/200',
    type: 'walk',
    title: '每天早上找遛狗搭子一起跑',
    description: '住在朝阳公园附近，每天早上6点半带金毛跑步，有没有住附近的小伙伴一起？人多热闹，狗狗也有伴~',
    images: [],
    location: '朝阳公园东门',
    contact: '电话：138****5678',
    status: 'open',
    createdAt: '2026-06-09T06:30:00'
  },
  {
    id: 'h3',
    userId: 'u3',
    userName: '铲屎官小王',
    userAvatar: 'https://picsum.photos/id/177/200/200',
    type: 'transfer',
    title: '转让9成新宠物自动喂食器',
    description: '买了两个用不上了，9成新，可以定时定量喂食，APP远程操控，原价399，200出。同城自提或运费到付。',
    images: [
      'https://picsum.photos/id/160/750/500'
    ],
    location: '海淀区中关村',
    contact: '咸鱼：小王***',
    status: 'open',
    createdAt: '2026-06-08T18:20:00'
  },
  {
    id: 'h4',
    userId: 'u4',
    userName: '焦急的主人',
    userAvatar: 'https://picsum.photos/id/338/200/200',
    type: 'lost',
    title: '重金寻狗！柴犬于望京附近走丢',
    description: '我家柴犬"豆豆"于6月8日下午4点左右在望京SOHO附近走丢，黄色柴犬，脖子上有蓝色项圈，有看到的好心人请联系我，重金酬谢！',
    images: [
      'https://picsum.photos/id/1062/750/500'
    ],
    location: '望京SOHO',
    contact: '电话：139****8888（24小时开机）',
    status: 'open',
    createdAt: '2026-06-08T16:30:00'
  },
  {
    id: 'h5',
    userId: 'u5',
    userName: '猫咪爱好者',
    userAvatar: 'https://picsum.photos/id/1027/200/200',
    type: 'foster',
    title: '国庆出游，求寄养两只英短',
    description: '10月1日-7日出游，家里两只英短，一只蓝白一只渐层，都是粘人的小天使。希望找有养猫经验的家庭寄养，自带猫粮猫砂。',
    images: [
      'https://picsum.photos/id/783/750/500'
    ],
    location: '西城区金融街',
    contact: '微信：cat***lover',
    status: 'open',
    createdAt: '2026-06-07T14:00:00'
  },
  {
    id: 'h6',
    userId: 'u6',
    userName: '节俭铲屎官',
    userAvatar: 'https://picsum.photos/id/1012/200/200',
    type: 'transfer',
    title: '低价转全新未拆封大袋猫粮',
    description: '主子换粮了，转出一包皇家成猫粮10kg装，保质期到明年6月，全新未拆封。原价420，300包邮出。',
    images: [
      'https://picsum.photos/id/119/750/500'
    ],
    location: '东城区东直门',
    contact: '微信：foo***234',
    status: 'open',
    createdAt: '2026-06-06T11:30:00'
  }
];
