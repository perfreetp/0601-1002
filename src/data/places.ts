import type { Place } from '@/types';

export const mockPlaces: Place[] = [
  {
    id: 'pl1',
    name: '爱宠24小时宠物医院',
    type: 'hospital',
    address: '朝阳区望京街10号',
    latitude: 39.9979,
    longitude: 116.4784,
    rating: 4.9,
    distance: '0.5km',
    tags: ['24小时', '急诊', '影像科'],
    image: 'https://picsum.photos/id/3/300/200'
  },
  {
    id: 'pl2',
    name: '朝阳公园宠物乐园',
    type: 'park',
    address: '朝阳区朝阳公园南路1号',
    latitude: 39.9339,
    longitude: 116.4821,
    rating: 4.8,
    distance: '0.8km',
    tags: ['大草坪', '免费', '围栏'],
    image: 'https://picsum.photos/id/1039/300/200'
  },
  {
    id: 'pl3',
    name: '萌宠咖啡馆',
    type: 'shop',
    address: '朝阳区三里屯太古里北区',
    latitude: 39.9368,
    longitude: 116.4551,
    rating: 4.7,
    distance: '1.2km',
    tags: ['可入内', '有猫', '有狗'],
    image: 'https://picsum.photos/id/225/300/200'
  },
  {
    id: 'pl4',
    name: '宠物家(望京店)',
    type: 'shop',
    address: '朝阳区望京SOHO T1底商',
    latitude: 39.9932,
    longitude: 116.4727,
    rating: 4.6,
    distance: '1.0km',
    tags: ['美容', '洗护', '用品'],
    image: 'https://picsum.photos/id/103/300/200'
  },
  {
    id: 'pl5',
    name: '芭比堂动物医院',
    type: 'hospital',
    address: '海淀区中关村大街15号',
    latitude: 39.9848,
    longitude: 116.3128,
    rating: 4.8,
    distance: '2.3km',
    tags: ['专科', '牙科', '外科'],
    image: 'https://picsum.photos/id/3/300/200'
  },
  {
    id: 'pl6',
    name: '奥林匹克森林公园',
    type: 'park',
    address: '朝阳区科荟路33号',
    latitude: 40.0266,
    longitude: 116.3952,
    rating: 4.9,
    distance: '3.1km',
    tags: ['超大', '跑道', '湖泊'],
    image: 'https://picsum.photos/id/1018/300/200'
  },
  {
    id: 'pl7',
    name: '毛星球宠物精品店',
    type: 'shop',
    address: '东城区东直门南大街1号',
    latitude: 39.9406,
    longitude: 116.4346,
    rating: 4.5,
    distance: '1.8km',
    tags: ['进口粮', '玩具', '服饰'],
    image: 'https://picsum.photos/id/230/300/200'
  }
];
