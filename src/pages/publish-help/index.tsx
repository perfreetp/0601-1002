import React, { useState } from 'react';
import { View, Text, Input, Textarea, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { getHelpTypeLabel } from '@/utils';
import { useAppStore } from '@/store';
import type { HelpPost } from '@/types';

const types = [
  { key: 'foster', icon: '🏠', label: '临时寄养' },
  { key: 'walk', icon: '🐕', label: '遛宠搭子' },
  { key: 'transfer', icon: '📦', label: '用品转让' },
  { key: 'lost', icon: '🔍', label: '走失寻宠' }
];

const PublishHelpPage: React.FC = () => {
  const [type, setType] = useState('foster');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const addHelpPost = useAppStore(state => state.addHelpPost);

  const handleChooseImage = () => {
    if (images.length >= 3) {
      Taro.showToast({ title: '最多上传3张', icon: 'none' });
      return;
    }
    const mockImages = [
      'https://picsum.photos/id/169/600/400',
      'https://picsum.photos/id/237/600/400',
      'https://picsum.photos/id/659/600/400'
    ];
    setImages([...images, mockImages[images.length % 3]]);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Taro.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    if (!description.trim()) {
      Taro.showToast({ title: '请输入描述', icon: 'none' });
      return;
    }
    if (!location.trim()) {
      Taro.showToast({ title: '请输入所在位置', icon: 'none' });
      return;
    }
    if (!contact.trim()) {
      Taro.showToast({ title: '请输入联系方式', icon: 'none' });
      return;
    }

    const newPost: HelpPost = {
      id: `help_${Date.now()}`,
      userId: 'u_me',
      userName: '柴犬爸爸',
      userAvatar: 'https://picsum.photos/id/177/200/200',
      type: type as any,
      title: title.trim(),
      description: description.trim(),
      images: images,
      location: location.trim(),
      contact: contact.trim(),
      status: 'open',
      createdAt: new Date().toISOString()
    };

    console.log('[PublishHelp] 发布新帖子:', newPost);
    addHelpPost(newPost);

    Taro.showModal({
      title: '发布成功',
      content: `已发布${getHelpTypeLabel(type)}信息成功！`,
      showCancel: false,
      confirmColor: '#FF7E67',
      success: () => {
        Taro.navigateBack();
      }
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.form}>
        <View className={styles.typeSection}>
          <Text className={styles.sectionTitle}>选择互助类型</Text>
          <View className={styles.typeGrid}>
            {types.map(t => (
              <View
                key={t.key}
                className={classnames(styles.typeCard, type === t.key && styles.typeCardActive)}
                onClick={() => setType(t.key)}
              >
                <View className={styles.typeIcon}>{t.icon}</View>
                <Text className={styles.typeLabel}>{t.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.inputSection}>
          <View className={styles.inputRow}>
            <Text className={styles.label}>标题</Text>
            <Input
              className={styles.input}
              placeholder="请输入标题"
              placeholderStyle="color:#86909C"
              value={title}
              onInput={(e) => setTitle(e.detail.value)}
            />
          </View>

          <View className={styles.inputRow}>
            <Text className={styles.label}>详细描述</Text>
            <Textarea
              className={styles.textarea}
              placeholder="请详细描述您的需求..."
              placeholderStyle="color:#86909C"
              value={description}
              onInput={(e) => setDescription(e.detail.value)}
            />
          </View>

          <View className={styles.inputRow}>
            <Text className={styles.label}>上传图片（选填，最多3张）</Text>
            <View className={styles.imageUpload}>
              {images.map((img, idx) => (
                <View key={idx} className={styles.uploadItem}>
                  <Image
                    src={img}
                    className={styles.uploadImg}
                    mode="aspectFill"
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(idx, 1);
                      setImages(newImages);
                    }}
                  />
                  <View className={styles.removeImg}>×</View>
                </View>
              ))}
              {images.length < 3 && (
                <View className={classnames(styles.uploadItem, styles.addImage)} onClick={handleChooseImage}>
                  +
                </View>
              )}
            </View>
          </View>

          <View className={styles.inputRow}>
            <Text className={styles.label}>所在位置</Text>
            <Input
              className={styles.input}
              placeholder="请输入地点"
              placeholderStyle="color:#86909C"
              value={location}
              onInput={(e) => setLocation(e.detail.value)}
            />
          </View>

          <View className={styles.inputRow}>
            <Text className={styles.label}>联系方式</Text>
            <Input
              className={styles.input}
              placeholder="请输入微信号或手机号"
              placeholderStyle="color:#86909C"
              value={contact}
              onInput={(e) => setContact(e.detail.value)}
            />
          </View>
        </View>
      </View>

      <Button className={styles.submitBtn} onClick={handleSubmit}>
        立即发布
      </Button>
    </View>
  );
};

export default PublishHelpPage;
