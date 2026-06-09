import React from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import ChatItem from '@/components/ChatItem';
import { mockChatSessions } from '@/data/chats';

const quickEntries = [
  { icon: '👥', text: '发起群聊' },
  { icon: '💬', text: '添加好友' },
  { icon: '🔔', text: '系统通知' },
  { icon: '📋', text: '互助消息' }
];

const ChatPage: React.FC = () => {
  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>消息</Text>
        <Button className={styles.addBtn}>+</Button>
      </View>

      <View className={styles.quickEntries}>
        {quickEntries.map((entry, idx) => (
          <View key={idx} className={styles.entry}>
            <View className={styles.entryIcon}>{entry.icon}</View>
            <Text className={styles.entryText}>{entry.text}</Text>
          </View>
        ))}
      </View>

      <View className={styles.sessionList}>
        {mockChatSessions.length === 0 ? (
          <View className={styles.emptyState}>
            <View className={styles.emptyIcon}>💌</View>
            <View className={styles.emptyText}>暂无消息</View>
          </View>
        ) : (
          mockChatSessions.map(session => (
            <ChatItem key={session.id} session={session} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default ChatPage;
