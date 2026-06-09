import React, { useState } from 'react';
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { mockFeeds } from '@/data/feeds';
import classnames from 'classnames';
import { formatTime } from '@/utils';

const mockComments = [
  {
    id: 'c1',
    userId: 'u2',
    name: '猫奴小王',
    avatar: 'https://picsum.photos/id/91/200/200',
    text: '太可爱了！我家的也超爱玩~',
    time: '2小时前'
  },
  {
    id: 'c2',
    userId: 'u3',
    name: '柴犬爸爸',
    avatar: 'https://picsum.photos/id/177/200/200',
    text: '柴犬的笑容真的很治愈！',
    time: '1小时前'
  },
  {
    id: 'c3',
    userId: 'u4',
    name: '布偶猫的日常',
    avatar: 'https://picsum.photos/id/338/200/200',
    text: '好想去公园一起玩呀！',
    time: '30分钟前'
  }
];

const FeedDetailPage: React.FC = () => {
  const router = useRouter();
  const feedId = router.params.id || mockFeeds[0].id;
  const feed = mockFeeds.find(f => f.id === feedId) || mockFeeds[0];

  const [isLiked, setIsLiked] = useState(feed.isLiked);
  const [likes, setLikes] = useState(feed.likes);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSend = () => {
    if (!commentText.trim()) return;
    Taro.showToast({ title: '评论成功', icon: 'success' });
    setCommentText('');
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.feedCard}>
        <View className={styles.cardHeader}>
          <Image className={styles.avatar} src={feed.userAvatar} mode="aspectFill" />
          <View className={styles.userInfo}>
            <View className={styles.userName}>{feed.userName}</View>
            <View className={styles.meta}>
              {feed.location} · {feed.distance} · {formatTime(feed.createdAt)}
            </View>
          </View>
          <Button className={styles.followBtn}>+ 关注</Button>
        </View>

        <View className={styles.content}>{feed.content}</View>

        {feed.images.length === 1 && (
          <View className={styles.singleImage}>
            <Image className={styles.image} src={feed.images[0]} mode="aspectFill" />
          </View>
        )}

        {feed.images.length > 1 && (
          <View className={styles.images}>
            {feed.images.slice(0, 3).map((img, idx) => (
              <View key={idx} className={styles.imageItem}>
                <Image className={styles.image} src={img} mode="aspectFill" />
              </View>
            ))}
          </View>
        )}

        <View className={styles.actions}>
          <View
            className={classnames(styles.action, isLiked && styles.liked)}
            onClick={handleLike}
          >
            <Text>{isLiked ? '♥' : '♡'}</Text>
            <Text style={{ marginLeft: '8rpx' }}>{likes}</Text>
          </View>
          <View className={styles.action}>
            <Text>💬</Text>
            <Text style={{ marginLeft: '8rpx' }}>{feed.comments}</Text>
          </View>
          <View className={styles.action}>
            <Text>↗️</Text>
            <Text style={{ marginLeft: '8rpx' }}>分享</Text>
          </View>
        </View>
      </View>

      <View className={styles.commentsSection}>
        <View className={styles.sectionTitle}>评论 ({mockComments.length})</View>
        {mockComments.map(c => (
          <View key={c.id} className={styles.commentItem}>
            <Image className={styles.commentAvatar} src={c.avatar} mode="aspectFill" />
            <View className={styles.commentBody}>
              <View className={styles.commentName}>{c.name}</View>
              <View className={styles.commentText}>{c.text}</View>
              <View className={styles.commentTime}>{c.time}</View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FeedDetailPage;
