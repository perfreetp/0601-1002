import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockPets } from '@/data/pets';
import { useAppStore } from '@/store';
import classnames from 'classnames';

type ModalType = 'credit' | 'blacklist' | 'report' | 'notifications' | 'myPosts' | 'myMessages' | 'settings' | null;

const mockBlacklist = [
  { id: 'u_b1', name: '不良用户A', avatar: 'https://picsum.photos/id/1011/100/100', reason: '发布虚假信息' },
  { id: 'u_b2', name: '广告狂人', avatar: 'https://picsum.photos/id/1012/100/100', reason: '频繁发广告' }
];

const mockMessages = [
  { id: 'm1', type: 'like', content: '柴犬爸爸 赞了你的动态', time: '5分钟前', read: false },
  { id: 'm2', type: 'comment', content: '猫奴小王 评论了你：好可爱！', time: '30分钟前', read: false },
  { id: 'm3', type: 'system', content: '系统消息：您的信用等级已更新', time: '2小时前', read: true },
  { id: 'm4', type: 'help', content: '遛宠搭子 回复了你的互助请求', time: '昨天', read: true }
];

const MinePage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [blacklist, setBlacklist] = useState(mockBlacklist);
  const [notifSettings, setNotifSettings] = useState({
    push: true, sound: true, vibration: true, preview: true
  });
  const [reportType, setReportType] = useState('');
  const [reportContent, setReportContent] = useState('');
  const helpPosts = useAppStore(state => state.helpPosts);

  const myPosts = helpPosts.filter(p => p.userId === 'u_me');
  const unreadCount = mockMessages.filter(m => !m.read).length;

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const handleRemoveBlacklist = (id: string) => {
    Taro.showModal({
      title: '移除黑名单',
      content: '确定将该用户移出黑名单？',
      confirmColor: '#FF7E67',
      success: (res) => {
        if (res.confirm) {
          setBlacklist(blacklist.filter(b => b.id !== id));
          Taro.showToast({ title: '已移除', icon: 'success' });
        }
      }
    });
  };

  const handleSubmitReport = () => {
    if (!reportType) {
      Taro.showToast({ title: '请选择举报类型', icon: 'none' });
      return;
    }
    if (!reportContent.trim()) {
      Taro.showToast({ title: '请填写举报内容', icon: 'none' });
      return;
    }
    Taro.showModal({
      title: '举报提交成功',
      content: '我们已收到您的举报，将在1-3个工作日内处理',
      showCancel: false,
      confirmColor: '#FF7E67',
      success: () => {
        setReportType('');
        setReportContent('');
        closeModal();
      }
    });
  };

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings({ ...notifSettings, [key]: !notifSettings[key] });
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const header = (title: string) => (
      <View className={styles.modalHeader}>
        <Text className={styles.modalTitle}>{title}</Text>
        <Text className={styles.modalClose} onClick={closeModal}>×</Text>
      </View>
    );

    if (activeModal === 'credit') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('信用评价')}
            <View className={styles.modalBody}>
              <View className={styles.creditDetail}>
                <View className={styles.creditScoreBig}>⭐ 4.9</View>
                <View className={styles.creditLevel}>优秀信用用户</View>
                <View className={styles.creditBarRow}>
                  <View className={styles.creditBar}>
                    <View className={styles.creditBarFill} style={{ width: '98%' }}></View>
                  </View>
                  <Text className={styles.creditPercent}>98%</Text>
                </View>
                <View className={styles.creditDesc}>超过 98% 的养宠用户</View>
              </View>
              <View style={{ padding: '0 8rpx' }}>
                <Text style={{ fontSize: '28rpx', fontWeight: 600, marginBottom: '20rpx', display: 'block' }}>
                  评价明细
                </Text>
                {[
                  { label: '发布真实', score: 5.0, count: 56 },
                  { label: '履约守信', score: 4.9, count: 48 },
                  { label: '沟通友好', score: 4.8, count: 62 },
                  { label: '遵守规则', score: 5.0, count: 70 }
                ].map(item => (
                  <View key={item.label} className={styles.creditItem}>
                    <Text className={styles.creditItemLabel}>{item.label}</Text>
                    <View className={styles.creditItemRight}>
                      <Text style={{ color: '#FF7E67', fontWeight: 600, marginRight: '16rpx' }}>
                        {item.score}分
                      </Text>
                      <Text style={{ color: '#86909C', fontSize: '24rpx' }}>{item.count}条评价</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'blacklist') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('黑名单管理')}
            <View className={styles.modalBody}>
              {blacklist.length === 0 ? (
                <View style={{ padding: '100rpx 0', textAlign: 'center', color: '#86909C' }}>
                  <View style={{ fontSize: '80rpx', marginBottom: '16rpx' }}>✅</View>
                  <View>暂无黑名单用户</View>
                </View>
              ) : (
                blacklist.map(user => (
                  <View key={user.id} className={styles.blacklistItem}>
                    <Image className={styles.blacklistAvatar} src={user.avatar} mode="aspectFill" />
                    <View className={styles.blacklistInfo}>
                      <View className={styles.blacklistName}>{user.name}</View>
                      <View className={styles.blacklistReason}>拉黑原因：{user.reason}</View>
                    </View>
                    <Button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveBlacklist(user.id)}
                    >
                      移除
                    </Button>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'report') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('举报中心')}
            <View className={styles.modalBody}>
              <Text style={{ fontSize: '28rpx', fontWeight: 600, marginBottom: '20rpx', display: 'block' }}>
                举报类型
              </Text>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: '16rpx', marginBottom: '32rpx' }}>
                {['虚假信息', '诈骗行为', '辱骂攻击', '广告营销', '违规内容', '其他'].map(type => (
                  <View
                    key={type}
                    className={classnames(styles.reportType, reportType === type && styles.reportTypeActive)}
                    onClick={() => setReportType(type)}
                  >
                    {type}
                  </View>
                ))}
              </View>
              <Text style={{ fontSize: '28rpx', fontWeight: 600, marginBottom: '16rpx', display: 'block' }}>
                举报内容描述
              </Text>
              <Textarea
                className={styles.reportTextarea}
                placeholder="请详细描述举报原因..."
                placeholderStyle="color:#86909C"
                value={reportContent}
                onInput={(e) => setReportContent(e.detail.value)}
              />
              <Button className={styles.submitReportBtn} onClick={handleSubmitReport}>
                提交举报
              </Button>
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'notifications') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('消息提醒设置')}
            <View className={styles.modalBody}>
              {[
                { key: 'push', label: '消息推送', desc: '接收新消息通知' },
                { key: 'sound', label: '声音提醒', desc: '收到消息时播放提示音' },
                { key: 'vibration', label: '震动提醒', desc: '收到消息时震动' },
                { key: 'preview', label: '消息预览', desc: '在通知栏显示消息内容' }
              ].map(item => (
                <View key={item.key} className={styles.notifItem}>
                  <View>
                    <View className={styles.notifLabel}>{item.label}</View>
                    <View className={styles.notifDesc}>{item.desc}</View>
                  </View>
                  <View
                    className={classnames(styles.switch, notifSettings[item.key] && styles.switchOn)}
                    onClick={() => toggleNotif(item.key as any)}
                  >
                    <View className={styles.switchDot}></View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'myPosts') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('我的发布')}
            <View className={styles.modalBody}>
              {myPosts.length === 0 ? (
                <View style={{ padding: '100rpx 0', textAlign: 'center', color: '#86909C' }}>
                  <View style={{ fontSize: '80rpx', marginBottom: '16rpx' }}>📝</View>
                  <View>暂无发布内容</View>
                  <Text
                    style={{ color: '#FF7E67', marginTop: '20rpx', fontSize: '26rpx', display: 'block' }}
                    onClick={() => {
                      closeModal();
                      Taro.navigateTo({ url: '/pages/publish-help/index' });
                    }}
                  >
                    去发布互助
                  </Text>
                </View>
              ) : (
                myPosts.map(post => (
                  <View key={post.id} className={styles.myPostItem}>
                    <View>
                      <View className={styles.myPostTitle}>{post.title}</View>
                      <View className={styles.myPostMeta}>
                        {post.type === 'foster' && '🏠 临时寄养'}
                        {post.type === 'walk' && '🐕 遛宠搭子'}
                        {post.type === 'transfer' && '📦 用品转让'}
                        {post.type === 'lost' && '🔍 走失寻宠'}
                        {' · '}{post.time}
                      </View>
                    </View>
                    <View className={styles.myPostStatus}>已发布</View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'myMessages') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('我的消息')}
            <View className={styles.modalBody}>
              {mockMessages.map(msg => (
                <View key={msg.id} className={classnames(styles.msgItem, !msg.read && styles.msgUnread)}>
                  <View className={styles.msgIcon}>
                    {msg.type === 'like' && '♥'}
                    {msg.type === 'comment' && '💬'}
                    {msg.type === 'system' && '🔔'}
                    {msg.type === 'help' && '🤝'}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View className={styles.msgContent}>{msg.content}</View>
                    <View className={styles.msgTime}>{msg.time}</View>
                  </View>
                  {!msg.read && <View className={styles.msgDot}></View>}
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }

    if (activeModal === 'settings') {
      return (
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            {header('设置')}
            <View className={styles.modalBody}>
              {['个人资料', '账号安全', '隐私设置', '清除缓存', '关于我们', '意见反馈'].map(item => (
                <View
                  key={item}
                  className={styles.settingItem}
                  onClick={() => Taro.showToast({ title: `打开${item}`, icon: 'none' })}
                >
                  <Text>{item}</Text>
                  <Text style={{ color: '#86909C' }}>›</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
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
              <View className={styles.statNum}>{myPosts.length}</View>
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

        <View className={styles.creditCard} onClick={() => openModal('credit')}>
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

        <View style={{ marginBottom: '24rpx' }}>
          <View style={{ padding: '0 32rpx 16rpx', fontSize: '24rpx', color: '#86909C' }}>
            我的服务
          </View>
          <View className={styles.menuSection} style={{ margin: 0 }}>
            <View className={styles.menuItem} onClick={() => Taro.navigateTo({ url: '/pages/knowledge/index' })}>
              <View className={classnames(styles.menuIcon, styles.menuIconBlue)}>📚</View>
              <Text className={styles.menuText}>我的收藏</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => Taro.navigateTo({ url: '/pages/pet-profile/index' })}>
              <View className={styles.menuIcon}>🐾</View>
              <Text className={styles.menuText}>宠物档案</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('myPosts')}>
              <View className={classnames(styles.menuIcon, styles.menuIconOrange)}>📝</View>
              <Text className={styles.menuText}>我的发布</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('myMessages')}>
              <View className={classnames(styles.menuIcon, styles.menuIconPink)}>💬</View>
              <Text className={styles.menuText}>我的消息</Text>
              {unreadCount > 0 && <View className={styles.badge}>{unreadCount}</View>}
              <Text className={styles.menuArrow}>›</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: '24rpx' }}>
          <View style={{ padding: '0 32rpx 16rpx', fontSize: '24rpx', color: '#86909C' }}>
            设置与安全
          </View>
          <View className={styles.menuSection} style={{ margin: 0 }}>
            <View className={styles.menuItem} onClick={() => openModal('credit')}>
              <View className={styles.menuIcon}>⭐</View>
              <Text className={styles.menuText}>信用评价</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('blacklist')}>
              <View className={classnames(styles.menuIcon, styles.menuIconRed)}>🚫</View>
              <Text className={styles.menuText}>黑名单</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('report')}>
              <View className={classnames(styles.menuIcon, styles.menuIconRed)}>⚠️</View>
              <Text className={styles.menuText}>举报中心</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('notifications')}>
              <View className={classnames(styles.menuIcon, styles.menuIconOrange)}>🔔</View>
              <Text className={styles.menuText}>消息提醒</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem} onClick={() => openModal('settings')}>
              <View className={classnames(styles.menuIcon, styles.menuIconBlue)}>⚙️</View>
              <Text className={styles.menuText}>设置</Text>
              <Text className={styles.menuArrow}>›</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {activeModal && <View className={styles.modalMask} onClick={closeModal}></View>}
      {renderModal()}
    </View>
  );
};

export default MinePage;
