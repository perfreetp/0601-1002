import type { Pet } from '@/types';

export const mockPets: Pet[] = [
  {
    id: 'p1',
    name: '豆豆',
    species: 'dog',
    breed: '柴犬',
    age: '2岁3个月',
    gender: 'male',
    avatar: 'https://picsum.photos/id/1062/200/200',
    vaccines: [
      { id: 'v1', name: '狂犬疫苗', date: '2026-03-15', nextDate: '2027-03-15' },
      { id: 'v2', name: '六联疫苗', date: '2026-03-15', nextDate: '2027-03-15' },
      { id: 'v3', name: '体内外驱虫', date: '2026-05-20', nextDate: '2026-06-20' }
    ],
    allergies: ['鸡肉', '玉米'],
    anniversaries: [
      { id: 'a1', title: '豆豆生日', date: '2024-03-15' },
      { id: 'a2', title: '到家纪念日', date: '2024-05-20' }
    ]
  },
  {
    id: 'p2',
    name: '小雪花',
    species: 'cat',
    breed: '布偶猫',
    age: '1岁8个月',
    gender: 'female',
    avatar: 'https://picsum.photos/id/783/200/200',
    vaccines: [
      { id: 'v4', name: '狂犬疫苗', date: '2026-02-10', nextDate: '2027-02-10' },
      { id: 'v5', name: '猫三联', date: '2026-02-10', nextDate: '2027-02-10' }
    ],
    allergies: [],
    anniversaries: [
      { id: 'a3', title: '小雪花生日', date: '2024-10-08' }
    ]
  }
];
