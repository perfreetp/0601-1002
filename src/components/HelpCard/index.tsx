import React from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { HelpPost } from '@/types';
import { formatTime, getHelpTypeLabel } from '@/utils';
import classnames from 'classnames';

interface HelpCardProps {
  help: HelpPost;
}

const HelpCard: React.FC<HelpCardProps> = ({ help }) => {
  const handleContact = () => {
    Taro.showModal({
      title: '联系方式',
      content: help.contact,
      showCancel: false,
      confirmText: '好的',
      confirmColor: '#FF7E67'
    });
  };

  const getTypeClass = () => {
    switch (help.type) {
      case 'foster': return styles.typeFoster;
      case 'walk': return styles.typeWalk;
      case 'transfer': return styles.typeTransfer;
      case 'lost': return styles.typeLost;
      default: return styles.typeFoster;
    }
  };

  return (
    <View className={styles.card}>
      <View className={styles.cardHeader}>
        <Image className={styles.avatar} src={help.userAvatar} mode="aspectFill" />
        <View className={styles.userInfo}>
          <View className={styles.userName}>
            <Text className={classnames(styles.typeTag, getTypeClass())}>
              {getHelpTypeLabel(help.type)}
            </Text>
            <Text style={{ marginLeft: '12rpx' }}>{help.userName}</Text>
          </View>
          <Text className={styles.time}>{formatTime(help.createdAt)}</Text>
        </View>
        {help.status === 'closed' && (
          <View className={styles.statusTag}>已结束</View>
        )}
      </View>

      <View className={styles.title}>{help.title}</View>
      <View className={styles.description}>{help.description}</View>

      {help.images.length > 0 && (
        <View className={styles.imageRow}>
          {help.images.slice(0, 3).map((img, idx) => (
            <View key={idx} className={styles.imageItem}>
              <Image className={styles.image} src={img} mode="aspectFill" />
            </View>
          ))}
        </View>
      )}

      <View className={styles.cardFooter}>
        <View className={styles.location}>
          <Text>📍</Text>
          <Text style={{ marginLeft: '8rpx' }}>{help.location}</Text>
        </View>
        {help.status === 'open' && (
          <Button className={styles.contactBtn} onClick={handleContact}>
            联系TA
          </Button>
        )}
      </View>
    </View>
  );
};

export default HelpCard;
