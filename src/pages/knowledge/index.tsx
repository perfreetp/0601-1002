import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import KnowledgeCard from '@/components/KnowledgeCard';
import { useAppStore } from '@/store';
import classnames from 'classnames';

const categories = [
  { key: 'all', label: '全部' },
  { key: 'feeding', label: '喂养' },
  { key: 'training', label: '训练' },
  { key: 'care', label: '护理' }
];

const tabs = [
  { key: 'recommend', label: '推荐' },
  { key: 'collected', label: '已收藏' }
];

const KnowledgePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('recommend');
  const knowledgeNotes = useAppStore(state => state.knowledgeNotes);

  let list = activeCategory === 'all'
    ? knowledgeNotes
    : knowledgeNotes.filter(k => k.category === activeCategory);

  if (activeTab === 'collected') {
    list = list.filter(k => k.isCollected);
  }

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.categoryBar}>
        {categories.map(c => (
          <Button
            key={c.key}
            className={classnames(styles.categoryBtn, activeCategory === c.key && styles.categoryBtnActive)}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </Button>
        ))}
      </View>

      <View className={styles.tabs}>
        {tabs.map(t => (
          <Text
            key={t.key}
            className={classnames(styles.tab, activeTab === t.key && styles.tabActive)}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </Text>
        ))}
      </View>

      <View className={styles.list}>
        {list.length === 0 ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📭</Text>
            <Text className={styles.emptyText}>
              {activeTab === 'collected' ? '暂无收藏内容' : '暂无相关内容'}
            </Text>
          </View>
        ) : (
          list.map(note => (
            <KnowledgeCard key={note.id} note={note} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default KnowledgePage;
