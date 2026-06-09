import type { KnowledgeNote } from '@/types';

export const mockKnowledge: KnowledgeNote[] = [
  {
    id: 'k1',
    category: 'feeding',
    title: '幼犬喂养全攻略：0-12个月该怎么吃',
    summary: '详细介绍不同月龄幼犬的饮食需求、粮食品质选择和喂养频率，帮助新手铲屎官科学喂养。',
    cover: 'https://picsum.photos/id/292/750/500',
    author: '宠物营养师王老师',
    views: 12890,
    isCollected: true,
    tags: ['幼犬', '喂养', '营养']
  },
  {
    id: 'k2',
    category: 'training',
    title: '7天教会狗狗定点上厕所',
    summary: '超实用的如厕训练方法，配合奖励机制，让你的狗狗快速学会在指定地点大小便。',
    cover: 'https://picsum.photos/id/1025/750/500',
    author: '训犬师老张',
    views: 25670,
    isCollected: true,
    tags: ['训练', '如厕', '幼犬']
  },
  {
    id: 'k3',
    category: 'care',
    title: '猫咪日常护理：洗澡、梳毛、剪指甲全指南',
    summary: '猫咪护理的正确打开方式，让你在家就能给主子做全套SPA，减少去美容院的次数。',
    cover: 'https://picsum.photos/id/783/750/500',
    author: '资深猫奴小美',
    views: 18932,
    isCollected: false,
    tags: ['猫咪', '护理', '美容']
  },
  {
    id: 'k4',
    category: 'feeding',
    title: '自制鲜食：10款简单营养的狗狗菜谱',
    summary: '用常见食材为狗狗做健康鲜食，营养均衡又美味，附详细配比和注意事项。',
    cover: 'https://picsum.photos/id/326/750/500',
    author: '爱宠厨房',
    views: 9876,
    isCollected: false,
    tags: ['鲜食', '食谱', '营养']
  },
  {
    id: 'k5',
    category: 'training',
    title: '猫咪训练并不难：教会你家猫主子这5个技能',
    summary: '打破"猫不可训"的误区，教你用正向强化训练猫咪握手、击掌等技能。',
    cover: 'https://picsum.photos/id/659/750/500',
    author: '行为学家李博士',
    views: 15432,
    isCollected: true,
    tags: ['猫咪', '训练', '技能']
  },
  {
    id: 'k6',
    category: 'care',
    title: '宠物疫苗接种时间表与注意事项',
    summary: '狗猫核心疫苗接种时间表、接种前后注意事项，以及常见问题解答。',
    cover: 'https://picsum.photos/id/580/750/500',
    author: '宠物医院张医生',
    views: 32100,
    isCollected: true,
    tags: ['健康', '疫苗', '医疗']
  }
];
