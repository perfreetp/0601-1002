import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import HelpCard from '@/components/HelpCard';
import { useAppStore } from '@/store';
import classnames from 'classnames';

const types = [
  { key: 'all', label: '全部' },
  { key: 'foster', label: '临时寄养' },
  { key: 'walk', label: '遛宠搭子' },
  { key: 'transfer', label: '用品转让' },
  { key: 'lost', label: '走失寻宠' }
];

const HelpPage: React.FC = () => {
  const [activeType, setActiveType] = useState('all');
  const helpPosts = useAppStore(state => state.helpPosts);

  const filteredHelps = activeType === 'all'
    ? helpPosts
    : helpPosts.filter(h => h.type === activeType);

  useDidShow(() => {
    console.log('[HelpPage] 页面显示，当前互助数:', helpPosts.length);
  });

  const handlePublish = () => {
    Taro.navigateTo({ url: '/pages/publish-help/index' });
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <View className={styles.typeTabs}>
          {types.map(type => (
            <View
              key={type.key}
              className={classnames(styles.typeTab, activeType === type.key && styles.typeTabActive)}
              onClick={() => setActiveType(type.key)}
            >
              {type.label}
            </View>
          ))}
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statCard}>
            <View className={styles.statNum}>{helpPosts.length}</View>
            <View className={styles.statLabel}>今日互助</View>
          </View>
          <View className={styles.statCard}>
            <View className={styles.statNum}>128</View>
            <View className={styles.statLabel}>本月完成</View>
          </View>
          <View className={styles.statCard}>
            <View className={styles.statNum}>4.9</View>
            <View className={styles.statLabel}>社区评分</View>
          </View>
        </View>
      </View>

      <View className={styles.list}>
        {filteredHelps.length === 0 ? (
          <View style={{ padding: '120rpx 0', textAlign: 'center', color: '#86909C' }}>
            <View style={{ fontSize: '100rpx', marginBottom: '24rpx' }}>📭</View>
            <View>暂无相关互助信息</View>
          </View>
        ) : (
          filteredHelps.map(help => (
            <HelpCard key={help.id} help={help} />
          ))
        )}
      </View>

      <Button className={styles.publishBtn} onClick={handlePublish}>
        +
      </Button>
    </ScrollView>
  );
};

export default HelpPage;
