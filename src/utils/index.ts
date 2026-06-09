export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return dateStr.slice(5, 10);
};

export const getHelpTypeLabel = (type: string): string => {
  const map: Record<string, string> = {
    foster: '临时寄养',
    walk: '遛宠搭子',
    transfer: '用品转让',
    lost: '走失寻宠'
  };
  return map[type] || type;
};

export const getCategoryLabel = (category: string): string => {
  const map: Record<string, string> = {
    feeding: '喂养',
    training: '训练',
    care: '护理',
    shop: '宠物友好店',
    hospital: '宠物医院',
    park: '宠物公园',
    dog: '狗狗',
    cat: '猫咪',
    other: '其他'
  };
  return map[category] || category;
};
