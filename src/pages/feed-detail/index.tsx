import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { mockFeeds } from '@/data/feeds';
import { useAppStore } from '@/store';
import classnames from 'classnames';
import { formatTime } from '@/utils';

const FeedDetailPage: React.FC = () => {
  const router = useRouter();
  const feedId = router.params.id || mockFeeds[0].id;
  const feed = mockFeeds.find(f => f.id === feedId) || mockFeeds[0];
  const scrollRef = useRef<any>(null);

  const comments = useAppStore(state => state.comments[feedId] || []);
  const commentCount = useAppStore(state => state.getFeedCommentCount(feedId));
  const addStoreComment = useAppStore(state => state.addComment);

  const [isLiked, setIsLiked] = useState(feed.isLiked);
  const [likes, setLikes] = useState(feed.likes);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (scrollRef.current && comments.length > 0) {
      setTimeout(() => {
        scrollRef.current.scrollToOffset({ offset: 99999, duration: 200 });
      }, 100);
    }
  }, [comments.length]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSend = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c${Date.now()}`,
      name: '我',
      avatar: 'https://picsum.photos/id/177/200/200',
      text: commentText.trim(),
      time: '刚刚'
    };
    addStoreComment(feedId, newComment);
    setCommentText('');
    Taro.showToast({ title: '评论成功', icon: 'success' });
  };

  return (
    <View>
      <ScrollView className={styles.container} scrollY ref={scrollRef}>
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
              <Text style={{ marginLeft: '8rpx' }}>{commentCount}</Text>
            </View>
            <View className={styles.action}>
              <Text>↗️</Text>
              <Text style={{ marginLeft: '8rpx' }}>分享</Text>
            </View>
          </View>
        </View>

        <View className={styles.commentsSection}>
          <View className={styles.sectionTitle}>评论 ({commentCount})</View>
          {comments.length === 0 ? (
            <View style={{ padding: '80rpx 0', textAlign: 'center', color: '#86909C' }}>
              <View style={{ fontSize: '80rpx', marginBottom: '16rpx' }}>💬</View>
              <View>暂无评论，快来抢沙发~</View>
            </View>
          ) : (
            comments.map(c => (
              <View key={c.id} className={styles.commentItem}>
                <Image className={styles.commentAvatar} src={c.avatar} mode="aspectFill" />
                <View className={styles.commentBody}>
                  <View className={styles.commentName}>{c.name}</View>
                  <View className={styles.commentText}>{c.text}</View>
                  <View className={styles.commentTime}>{c.time}</View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View className={styles.inputBar}>
        <Input
          className={styles.commentInput}
          placeholder="说点什么..."
          placeholderStyle="color:#86909C"
          value={commentText}
          onInput={(e) => setCommentText(e.detail.value)}
          onConfirm={handleSend}
        />
        <Button
          className={styles.sendBtn}
          onClick={handleSend}
          style={!commentText.trim() ? { opacity: 0.5 } : {}}
        >
          发送
        </Button>
      </View>
    </View>
  );
};

export default FeedDetailPage;
