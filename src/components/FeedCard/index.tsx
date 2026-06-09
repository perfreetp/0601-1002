import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Feed } from '@/types';
import { formatTime } from '@/utils';
import { useAppStore } from '@/store';
import classnames from 'classnames';

interface FeedCardProps {
  feed: Feed;
}

const FeedCard: React.FC<FeedCardProps> = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(feed.isLiked);
  const [likes, setLikes] = useState(feed.likes);
  const commentCount = useAppStore(state => state.getFeedCommentCount(feed.id));

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/feed-detail/index?id=${feed.id}`
    });
  };

  const renderContent = (text: string) => {
    if (feed.type === 'topic' && feed.topicTag) {
      const parts = text.split(`#${feed.topicTag}#`);
      return (
        <View className={styles.content}>
          {parts.map((part, index) => (
            <Text key={index}>
              {index > 0 && <Text className={styles.topicText}>#{feed.topicTag}#</Text>}
              {part}
            </Text>
          ))}
        </View>
      );
    }
    return <View className={styles.content}>{text}</View>;
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <Image className={styles.avatar} src={feed.userAvatar} mode="aspectFill" />
        <View className={styles.userInfo}>
          <View className={styles.userName}>
            {feed.type === 'help' && (
              <Text className={classnames(styles.tag, styles.tagHelp)}>求助</Text>
            )}
            {feed.type === 'topic' && (
              <Text className={classnames(styles.tag, styles.tagTopic)}>话题</Text>
            )}
            {feed.userName}
          </View>
          <View className={styles.meta}>
            <Text>{feed.location}</Text>
            <Text className={styles.dot}>·</Text>
            <Text>{feed.distance}</Text>
            <Text className={styles.dot}>·</Text>
            <Text>{formatTime(feed.createdAt)}</Text>
          </View>
        </View>
      </View>

      {renderContent(feed.content)}

      {feed.images.length === 1 && (
        <View className={styles.singleImage}>
          <Image className={styles.image} src={feed.images[0]} mode="aspectFill" />
        </View>
      )}

      {feed.images.length > 1 && (
        <View className={styles.imageGrid}>
          {feed.images.slice(0, 3).map((img, idx) => (
            <View key={idx} className={styles.imageItem}>
              <Image className={styles.image} src={img} mode="aspectFill" />
            </View>
          ))}
        </View>
      )}

      <View className={styles.cardFooter}>
        <View
          className={classnames(styles.actionItem, isLiked && styles.liked)}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <Text>{isLiked ? '♥' : '♡'}</Text>
          <Text style={{ marginLeft: '8rpx' }}>{likes}</Text>
        </View>
        <View className={styles.actionItem}>
          <Text>💬</Text>
          <Text style={{ marginLeft: '8rpx' }}>{commentCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedCard;
