import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { KnowledgeNote } from '@/types';
import { getCategoryLabel } from '@/utils';
import { useAppStore } from '@/store';

interface KnowledgeCardProps {
  note: KnowledgeNote;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ note }) => {
  const toggleKnowledgeCollect = useAppStore(state => state.toggleKnowledgeCollect);
  const currentNote = useAppStore(state =>
    state.knowledgeNotes.find(n => n.id === note.id) || note
  );

  const handleCollect = (e) => {
    e.stopPropagation();
    toggleKnowledgeCollect(note.id);
    Taro.showToast({
      title: currentNote.isCollected ? '已取消收藏' : '收藏成功',
      icon: 'success'
    });
  };

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
          <Text className={styles.collect} onClick={handleCollect}>
            {currentNote.isCollected ? '★ 已收藏' : '☆ 收藏'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default KnowledgeCard;
