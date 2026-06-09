import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import type { KnowledgeNote } from '@/types';
import { getCategoryLabel } from '@/utils';

interface KnowledgeCardProps {
  note: KnowledgeNote;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ note }) => {
  const [isCollected, setIsCollected] = useState(note.isCollected);

  return (
    <View className={styles.card}>
      <Image className={styles.cover} src={note.cover} mode="aspectFill" />
      <View className={styles.body}>
        <View className={styles.categoryTag}>{getCategoryLabel(note.category)}</View>
        <View className={styles.title}>{note.title}</View>
        <View className={styles.summary}>{note.summary}</View>
        <View className={styles.tags}>
          {note.tags.map((tag, idx) => (
            <View key={idx} className={styles.tag}>{tag}</View>
          ))}
        </View>
        <View className={styles.footer}>
          <Text className={styles.meta}>{note.author} · {note.views}阅读</Text>
          <Text
            className={styles.collect}
            onClick={() => setIsCollected(!isCollected)}
          >
            {isCollected ? '★ 已收藏' : '☆ 收藏'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default KnowledgeCard;
