import React, { useState } from 'react';
import { View, Text, Input, Textarea, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { getHelpTypeLabel } from '@/utils';

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

  const handleSubmit = () => {
    if (!title.trim()) {
      Taro.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    if (!description.trim()) {
      Taro.showToast({ title: '请输入描述', icon: 'none' });
      return;
    }
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
            <Text className={styles.label}>上传图片（选填）</Text>
            <View className={styles.imageUpload}>
              <View className={classnames(styles.uploadItem, styles.addImage)}>+</View>
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
