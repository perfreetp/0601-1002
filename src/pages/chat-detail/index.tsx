import React, { useState } from 'react';
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import { mockChatMessages } from '@/data/chats';
import classnames from 'classnames';

const ChatDetailPage: React.FC = () => {
  const router = useRouter();
  const chatName = router.params.name || '聊天';

  const [messages, setMessages] = useState(mockChatMessages);
  const [inputText, setInputText] = useState('');

  useDidShow(() => {
    Taro.setNavigationBarTitle({ title: chatName });
  });

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: '我',
      senderAvatar: '',
      content: inputText,
      type: 'text' as const,
      createdAt: new Date().toISOString(),
      isMine: true
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const handleImage = () => {
    Taro.showToast({ title: '选择图片', icon: 'none' });
  };

  const handleLocation = () => {
    Taro.showToast({ title: '发送位置', icon: 'none' });
  };

  const renderMessage = (msg) => {
    if (msg.type === 'image') {
      return (
        <View className={styles.msgImage}>
          <Image className={styles.msgImageEl} src={msg.content} mode="widthFix" />
        </View>
      );
    }
    if (msg.type === 'location' && msg.locationData) {
      return (
        <View className={styles.msgLocation}>
          <View className={styles.locationTitle}>📍 位置分享</View>
          <View className={styles.locationAddr}>{msg.locationData.address}</View>
        </View>
      );
    }
    return (
      <View className={classnames(
        styles.msgContent,
        msg.isMine ? styles.msgMine : styles.msgOther
      )}>
        {msg.content}
      </View>
    );
  };

  return (
    <View className={styles.container}>
      <ScrollView className={styles.messageList} scrollY>
        {messages.map(msg => (
          <View
            key={msg.id}
            className={classnames(styles.messageItem, msg.isMine && styles.messageMine)}
          >
            {!msg.isMine && (
              <Image className={styles.msgAvatar} src={msg.senderAvatar} mode="aspectFill" />
            )}
            <View className={styles.msgBody}>
              {!msg.isMine && <View className={styles.msgName}>{msg.senderName}</View>}
              {renderMessage(msg)}
            </View>
            {msg.isMine && (
              <Image
                className={styles.msgAvatar}
                src="https://picsum.photos/id/177/200/200"
                mode="aspectFill"
              />
            )}
          </View>
        ))}
      </ScrollView>

      <View className={styles.inputBar}>
        <Button className={styles.iconBtn} onClick={handleImage}>🖼️</Button>
        <Button className={styles.iconBtn} onClick={handleLocation}>📍</Button>
        <Input
          className={styles.msgInput}
          placeholder="说点什么..."
          placeholderStyle="color:#86909C"
          value={inputText}
          onInput={(e) => setInputText(e.detail.value)}
          onConfirm={handleSend}
        />
        <Button className={styles.sendBtn} onClick={handleSend}>发送</Button>
      </View>
    </View>
  );
};

export default ChatDetailPage;
