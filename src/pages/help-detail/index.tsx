import React from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppStore } from '@/store';
import { formatTime, getHelpTypeLabel } from '@/utils';
import classnames from 'classnames';

const MINE_USER_ID = 'u_me';

const HelpDetailPage: React.FC = () => {
  const router = useRouter();
  const helpId = router.params.id || '';

  const helpPosts = useAppStore(state => state.helpPosts);
  const updateHelpStatus = useAppStore(state => state.updateHelpStatus);
  const deleteHelpPost = useAppStore(state => state.deleteHelpPost);

  const help = helpPosts.find(h => h.id === helpId);

  useDidShow(() => {
    if (help) {
      Taro.setNavigationBarTitle({ title: getHelpTypeLabel(help.type) + '详情' });
    }
  });

  if (!help) {
    return (
      <View style={{ padding: '200rpx 0', textAlign: 'center', color: '#86909C' }}>
        <View style={{ fontSize: '100rpx', marginBottom: '20rpx' }}>😢</View>
        <View>该互助信息不存在或已被删除</View>
        <Button
          style={{
            marginTop: '40rpx',
            height: '80rpx',
            lineHeight: '80rpx',
            padding: '0 48rpx',
            background: '#FF7E67',
            color: '#fff',
            borderRadius: '40rpx',
            fontSize: '28rpx',
            display: 'inline-block'
          }}
          onClick={() => Taro.navigateBack()}
        >
          返回
        </Button>
      </View>
    );
  }

  const isMine = help.userId === MINE_USER_ID;
  const isOpen = help.status === 'open';

  const getTypeClass = () => {
    switch (help.type) {
      case 'foster': return styles.typeFoster;
      case 'walk': return styles.typeWalk;
      case 'transfer': return styles.typeTransfer;
      case 'lost': return styles.typeLost;
      default: return styles.typeFoster;
    }
  };

  const handleContact = () => {
    Taro.setClipboardData({
      data: help.contact,
      success: () => {
        Taro.showModal({
          title: '联系方式已复制',
          content: help.contact,
          showCancel: false,
          confirmColor: '#FF7E67'
        });
      }
    });
  };

  const handleClose = () => {
    Taro.showModal({
      title: '结束互助',
      content: '确认将该互助信息标记为已结束？结束后将不再对外展示联系方式。',
      confirmColor: '#52C41A',
      success: (res) => {
        if (res.confirm) {
          updateHelpStatus(help.id, 'closed');
          Taro.showToast({ title: '已结束互助', icon: 'success' });
        }
      }
    });
  };

  const handleDelete = () => {
    Taro.showModal({
      title: '删除互助',
      content: '确认删除该互助信息？删除后不可恢复。',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          deleteHelpPost(help.id);
          Taro.showToast({ title: '已删除', icon: 'success' });
          setTimeout(() => Taro.navigateBack(), 800);
        }
      }
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.card}>
        {!isOpen && (
          <View className={styles.closedBanner}>该互助已结束</View>
        )}
        <View className={styles.header}>
          <Image className={styles.avatar} src={help.userAvatar} mode="aspectFill" />
          <View className={styles.userInfo}>
            <View className={styles.userNameRow}>
              <Text className={classnames(styles.typeTag, getTypeClass())}>
                {getHelpTypeLabel(help.type)}
              </Text>
              <Text className={styles.userName}>{help.userName}</Text>
            </View>
            <Text className={styles.meta}>📍 {help.location} · {formatTime(help.createdAt)}</Text>
          </View>
          <View className={classnames(styles.statusTag, !isOpen && styles.statusClosed)}>
            {isOpen ? '进行中' : '已结束'}
          </View>
        </View>

        <View className={styles.body}>
          <View className={styles.title}>{help.title}</View>
          <View className={styles.description}>{help.description}</View>

          {help.images.length === 1 && (
            <View className={styles.singleImage}>
              <Image className={styles.image} src={help.images[0]} mode="widthFix" />
            </View>
          )}

          {help.images.length > 1 && (
            <View className={styles.images}>
              {help.images.slice(0, 6).map((img, idx) => (
                <View key={idx} className={styles.imageItem}>
                  <Image className={styles.image} src={img} mode="aspectFill" />
                </View>
              ))}
            </View>
          )}

          <View className={styles.infoRow}>
            <View className={styles.infoIcon}>📍</View>
            <View className={styles.infoContent}>
              <View className={styles.infoLabel}>所在位置</View>
              <View className={styles.infoValue}>{help.location}</View>
            </View>
          </View>

          <View className={styles.infoRow}>
            <View className={styles.infoIcon}>📞</View>
            <View className={styles.infoContent}>
              <View className={styles.infoLabel}>联系方式</View>
              <View className={classnames(styles.infoValue, styles.contactValue)}>{help.contact}</View>
            </View>
          </View>

          <View className={styles.infoRow}>
            <View className={styles.infoIcon}>👤</View>
            <View className={styles.infoContent}>
              <View className={styles.infoLabel}>发布人</View>
              <View className={styles.infoValue}>{help.userName}{isMine && '（我）'}</View>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.footer}>
        {isMine ? (
          <>
            {isOpen && (
              <Button className={styles.closeBtn} onClick={handleClose}>
                结束互助
              </Button>
            )}
            <Button className={styles.deleteBtn} onClick={handleDelete}>
              删除
            </Button>
          </>
        ) : (
          <>
            {isOpen ? (
              <Button className={styles.contactBtn} onClick={handleContact}>
                📞 联系TA
              </Button>
            ) : (
              <Button
                className={styles.contactBtn}
                style={{ background: '#E5E6EB', color: '#86909C' }}
                onClick={() => Taro.showToast({ title: '互助已结束', icon: 'none' })}
              >
                互助已结束
              </Button>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default HelpDetailPage;
