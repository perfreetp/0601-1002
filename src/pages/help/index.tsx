import React, { useState, useMemo } from 'react';
import { View, Text, Button, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
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
  const [keyword, setKeyword] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const helpPosts = useAppStore(state => state.helpPosts);

  const filteredHelps = useMemo(() => {
    let list = helpPosts;

    if (activeType !== 'all') {
      list = list.filter(h => h.type === activeType);
    }

    if (onlyOpen) {
      list = list.filter(h => h.status === 'open');
    }

    const kw = keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter(h =>
        h.title.toLowerCase().includes(kw) ||
        h.description.toLowerCase().includes(kw) ||
        h.location.toLowerCase().includes(kw)
      );
    }

    return list;
  }, [helpPosts, activeType, onlyOpen, keyword]);

  const handlePublish = () => {
    Taro.navigateTo({ url: '/pages/publish-help/index' });
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.searchBar}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            placeholder="搜索标题、描述、位置..."
            placeholderStyle="color:#86909C"
            value={keyword}
            onInput={(e) => setKeyword(e.detail.value)}
            confirmType="search"
          />
          {keyword && (
            <Text className={styles.searchClear} onClick={() => setKeyword('')}>×</Text>
          )}
        </View>

        <View className={styles.filterRow}>
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
          <View
            className={classnames(styles.onlyOpen, onlyOpen && styles.onlyOpenActive)}
            onClick={() => setOnlyOpen(!onlyOpen)}
          >
            <View className={classnames(styles.checkbox, onlyOpen && styles.checkboxChecked)}>
              {onlyOpen && '✓'}
            </View>
            <Text>只看进行中</Text>
          </View>
        </View>

        <View className={styles.statsRow}>
          <View className={styles.statCard}>
            <View className={styles.statNum}>{helpPosts.length}</View>
            <View className={styles.statLabel}>全部互助</View>
          </View>
          <View className={styles.statCard}>
            <View className={styles.statNum}>{helpPosts.filter(h => h.status === 'open').length}</View>
            <View className={styles.statLabel}>进行中</View>
          </View>
          <View className={styles.statCard}>
            <View className={styles.statNum}>{helpPosts.filter(h => h.userId === 'u_me').length}</View>
            <View className={styles.statLabel}>我的发布</View>
          </View>
        </View>
      </View>

      <ScrollView className={styles.list} scrollY>
        {filteredHelps.length === 0 ? (
          <View style={{ padding: '160rpx 0', textAlign: 'center', color: '#86909C' }}>
            <View style={{ fontSize: '100rpx', marginBottom: '24rpx' }}>
              {keyword ? '🔍' : '📭'}
            </View>
            <View style={{ marginBottom: '12rpx' }}>
              {keyword ? '没有找到相关互助' : '暂无相关互助信息'}
            </View>
            {keyword && (
              <Text
                style={{ color: '#FF7E67', fontSize: '26rpx' }}
                onClick={() => { setKeyword(''); setActiveType('all'); setOnlyOpen(false); }}
              >
                清除筛选条件
              </Text>
            )}
          </View>
        ) : (
          filteredHelps.map(help => (
            <HelpCard key={help.id} help={help} />
          ))
        )}
      </ScrollView>

      <Button className={styles.publishBtn} onClick={handlePublish}>
        +
      </Button>
    </View>
  );
};

export default HelpPage;
