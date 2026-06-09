import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppStore } from '@/store';
import classnames from 'classnames';
import type { ChatMessage } from '@/types';

const ChatDetailPage: React.FC = () => {
  const router = useRouter();
  const chatId = router.params.id || 'c1';
  const chatName = router.params.name || '聊天';
  const scrollRef = useRef<any>(null);

  const messages = useAppStore(state => state.chatMessages[chatId] || []);
  const addChatMessage = useAppStore(state => state.addChatMessage);

  const [inputText, setInputText] = useState('');

  useDidShow(() => {
    Taro.setNavigationBarTitle({ title: chatName });
  });

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollToOffset({ offset: 99999, duration: 200 });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: '我',
      senderAvatar: 'https://picsum.photos/id/177/200/200',
      content: inputText,
      type: 'text',
      createdAt: new Date().toISOString(),
      isMine: true
    };
    addChatMessage(chatId, newMsg);
    setInputText('');
  };

  const handleImage = () => {
    const mockImages = [
      'https://picsum.photos/id/237/500/400',
      'https://picsum.photos/id/169/500/400',
      'https://picsum.photos/id/659/500/400',
      'https://picsum.photos/id/1062/500/400'
    ];
    const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: '我',
      senderAvatar: 'https://picsum.photos/id/177/200/200',
      content: randomImg,
      type: 'image',
      createdAt: new Date().toISOString(),
      isMine: true
    };
    addChatMessage(chatId, newMsg);
  };

  const handleLocation = () => {
    const mockLocations = [
      { address: '朝阳区望京SOHO T1', latitude: 39.99, longitude: 116.47 },
      { address: '海淀区中关村大街1号', latitude: 39.98, longitude: 116.31 },
      { address: '西湖区文三路 259 号昌地火炬大厦', latitude: 30.28, longitude: 120.12 },
      { address: '浦东新区世纪大道 100 号', latitude: 31.23, longitude: 121.50 }
    ];
    const randomLoc = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: '我',
      senderAvatar: 'https://picsum.photos/id/177/200/200',
      content: '[位置] ' + randomLoc.address,
      type: 'location',
      createdAt: new Date().toISOString(),
      isMine: true,
      locationData: randomLoc
    };
    addChatMessage(chatId, newMsg);
  };

  const renderMessage = (msg: ChatMessage) => {
    if (msg.type === 'image') {
      return (
        <View className={styles.msgImage}>
          <Image className={styles.msgImageEl} src={msg.content} mode="widthFix" />
        </View>
      );
    }
    if (msg.type === 'location') {
      const address = msg.locationData?.address || msg.content.replace(/^\[位置\]\s*/, '') || '位置信息';
      return (
        <View className={classnames(
          styles.msgLocation,
          msg.isMine ? styles.msgLocationMine : styles.msgLocationOther
        )}>
          <View className={styles.locationTitle}>📍 位置分享</View>
          <View className={styles.locationAddr}>{address}</View>
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
      <ScrollView
        className={styles.messageList}
        scrollY
        ref={scrollRef}
        scrollWithAnimation
      >
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
