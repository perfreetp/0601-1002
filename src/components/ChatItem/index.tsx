import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { ChatSession } from '@/types';

interface ChatItemProps {
  session: ChatSession;
}

const ChatItem: React.FC<ChatItemProps> = ({ session }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/chat-detail/index?id=${session.id}&name=${encodeURIComponent(session.name)}`
    });
  };

  return (
    <View className={styles.item} onClick={handleClick}>
      <View className={styles.avatarWrap}>
        <Image className={styles.avatar} src={session.avatar} mode="aspectFill" />
        {session.unread > 0 && (
          <View className={styles.unreadBadge}>
            {session.unread > 99 ? '99+' : session.unread}
          </View>
        )}
      </View>
      <View className={styles.content}>
        <View className={styles.topRow}>
          <Text className={styles.name}>
            <Text className={styles.typeTag}>{session.type === 'group' ? '[群]' : ''}</Text>
            {session.name}
          </Text>
          <Text className={styles.time}>{session.lastTime}</Text>
        </View>
        <Text className={styles.lastMsg}>{session.lastMessage}</Text>
      </View>
    </View>
  );
};

export default ChatItem;
