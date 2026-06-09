import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockPets } from '@/data/pets';
import classnames from 'classnames';

const menus = [
  {
    group: '我的服务',
    items: [
      { icon: '📚', label: '我的收藏', iconClass: 'menuIconBlue', action: () => Taro.navigateTo({ url: '/pages/knowledge/index' }) },
      { icon: '🐾', label: '宠物档案', iconClass: '', action: () => Taro.navigateTo({ url: '/pages/pet-profile/index' }) },
      { icon: '📝', label: '我的发布', iconClass: 'menuIconOrange' },
      { icon: '💬', label: '我的消息', iconClass: 'menuIconPink', badge: 3 }
    ]
  },
  {
    group: '设置与安全',
    items: [
      { icon: '⭐', label: '信用评价', iconClass: '' },
      { icon: '🚫', label: '黑名单', iconClass: 'menuIconRed' },
      { icon: '⚠️', label: '举报中心', iconClass: 'menuIconRed' },
      { icon: '🔔', label: '消息提醒', iconClass: 'menuIconOrange' },
      { icon: '⚙️', label: '设置', iconClass: 'menuIconBlue' }
    ]
  }
];

const MinePage: React.FC = () => {
  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.profileHeader}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src="https://picsum.photos/id/177/200/200"
            mode="aspectFill"
          />
          <View className={styles.userDetail}>
            <View className={styles.userName}>柴犬爸爸</View>
            <View className={styles.userDesc}>📍 朝阳区 · 养宠达人 Lv.5</View>
          </View>
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <View className={styles.statNum}>128</View>
            <View className={styles.statLabel}>动态</View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statNum}>56</View>
            <View className={styles.statLabel}>互助</View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statNum}>256</View>
            <View className={styles.statLabel}>粉丝</View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statNum}>189</View>
            <View className={styles.statLabel}>关注</View>
          </View>
        </View>
      </View>

      <View className={styles.creditCard}>
        <View className={styles.creditLeft}>
          <View className={styles.creditIcon}>🛡️</View>
          <View className={styles.creditInfo}>
            <View className={styles.creditTitle}>信用等级</View>
            <View className={styles.creditScore}>⭐ 4.9分 · 优秀</View>
          </View>
        </View>
        <Text className={styles.creditArrow}>›</Text>
      </View>

      <View className={styles.petsSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>我的宠物</Text>
          <Text className={styles.moreBtn} onClick={() => Taro.navigateTo({ url: '/pages/pet-profile/index' })}>
            管理 ›
          </Text>
        </View>
        <ScrollView scrollX>
          <View className={styles.petsList}>
            {mockPets.map(pet => (
              <View key={pet.id} className={styles.petCard}>
                <Image className={styles.petAvatar} src={pet.avatar} mode="aspectFill" />
                <View className={styles.petName}>{pet.name}</View>
                <View className={styles.petBreed}>{pet.breed} · {pet.age}</View>
              </View>
            ))}
            <View className={classnames(styles.petCard, styles.addPet)}>
              <View className={styles.addPetIcon}>+</View>
              <View>添加宠物</View>
            </View>
          </View>
        </ScrollView>
      </View>

      {menus.map(group => (
        <View key={group.group} style={{ marginBottom: '24rpx' }}>
          <View style={{ padding: '0 32rpx 16rpx', fontSize: '24rpx', color: '#86909C' }}>
            {group.group}
          </View>
          <View className={styles.menuSection} style={{ margin: 0 }}>
            {group.items.map((item, idx) => (
              <View
                key={idx}
                className={styles.menuItem}
                onClick={item.action}
              >
                <View className={classnames(styles.menuIcon, item.iconClass && styles[item.iconClass])}>
                  {item.icon}
                </View>
                <Text className={styles.menuText}>{item.label}</Text>
                {item.badge && <View className={styles.badge}>{item.badge}</View>}
                <Text className={styles.menuArrow}>›</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MinePage;
