import React, { useState } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import FeedCard from '@/components/FeedCard';
import { mockFeeds, hotTopics } from '@/data/feeds';
import classnames from 'classnames';

const tabs = [
  { key: 'all', label: '推荐' },
  { key: 'dynamic', label: '动态' },
  { key: 'help', label: '求助' },
  { key: 'topic', label: '话题' }
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [feeds, setFeeds] = useState(mockFeeds);

  const onRefresh = () => {
    setTimeout(() => {
      Taro.stopPullDownRefresh();
      Taro.showToast({ title: '刷新成功', icon: 'success' });
    }, 800);
  };

  React.useEffect(() => {
    Taro.eventCenter.on('onPullDownRefresh', onRefresh);
    return () => {
      Taro.eventCenter.off('onPullDownRefresh', onRefresh);
    };
  }, []);

  const filteredFeeds = activeTab === 'all'
    ? feeds
    : feeds.filter(f => f.type === activeTab);

  const handleAction = (type: string) => {
    switch (type) {
      case 'help':
        Taro.switchTab({ url: '/pages/help/index' });
        break;
      case 'map':
        Taro.switchTab({ url: '/pages/map/index' });
        break;
      case 'knowledge':
        Taro.navigateTo({ url: '/pages/knowledge/index' });
        break;
      case 'publish':
        Taro.navigateTo({ url: '/pages/publish-help/index' });
        break;
    }
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <View className={styles.headerTop}>
          <Text className={styles.title}>🐾 宠友圈</Text>
          <View className={styles.location}>
            <Text>📍 朝阳区</Text>
          </View>
        </View>
        <View className={styles.searchBar}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            placeholder="搜索动态、话题、宠友..."
            placeholderStyle="color:#86909C"
          />
        </View>
      </View>

      <View className={styles.quickActions}>
        <View className={styles.actionCard} onClick={() => handleAction('publish')}>
          <View className={styles.actionIcon}>📝</View>
          <Text className={styles.actionText}>发布求助</Text>
        </View>
        <View className={styles.actionCard} onClick={() => handleAction('help')}>
          <View className={styles.actionIcon}>🤝</View>
          <Text className={styles.actionText}>互助广场</Text>
        </View>
        <View className={styles.actionCard} onClick={() => handleAction('map')}>
          <View className={styles.actionIcon}>🗺️</View>
          <Text className={styles.actionText}>附近地图</Text>
        </View>
        <View className={styles.actionCard} onClick={() => handleAction('knowledge')}>
          <View className={styles.actionIcon}>📚</View>
          <Text className={styles.actionText}>养宠知识</Text>
        </View>
      </View>

      <View className={styles.topicsSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>🔥 热门话题</Text>
          <Text className={styles.more}>查看更多 ›</Text>
        </View>
        <ScrollView className={styles.topicsScroll} scrollX>
          {hotTopics.map(topic => (
            <View key={topic.id} className={styles.topicItem}>
              <View className={styles.topicName}>#{topic.name}</View>
              <View className={styles.topicCount}>{topic.count} 讨论</View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.feedsSection}>
        <View className={styles.tabs}>
          {tabs.map(tab => (
            <View
              key={tab.key}
              className={classnames(styles.tab, activeTab === tab.key && styles.tabActive)}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </View>
          ))}
        </View>

        {filteredFeeds.map(feed => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
