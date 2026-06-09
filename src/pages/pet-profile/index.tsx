import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockPets } from '@/data/pets';
import classnames from 'classnames';
import { getCategoryLabel } from '@/utils';

const PetProfilePage: React.FC = () => {
  const [activePetId, setActivePetId] = useState(mockPets[0]?.id || '');
  const activePet = mockPets.find(p => p.id === activePetId) || mockPets[0];

  if (!activePet) {
    return (
      <View className={styles.container}>
        <View style={{ padding: '100rpx', textAlign: 'center', color: '#86909C' }}>
          暂无宠物档案
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <ScrollView className={styles.container} scrollY>
        <View className={styles.petTabs}>
          {mockPets.map(pet => (
            <View
              key={pet.id}
              className={classnames(styles.petTab, activePetId === pet.id && styles.petTabActive)}
              onClick={() => setActivePetId(pet.id)}
            >
              {pet.name}
            </View>
          ))}
          <View
            className={classnames(styles.petTab, styles.addTab)}
            onClick={() => Taro.showToast({ title: '添加宠物', icon: 'none' })}
          >
            + 添加
          </View>
        </View>

        <View className={styles.content}>
          <View className={styles.basicCard}>
            <Image className={styles.avatar} src={activePet.avatar} mode="aspectFill" />
            <View className={styles.info}>
              <View className={styles.name}>
                {activePet.name}
                <Text className={styles.genderIcon}>
                  {activePet.gender === 'male' ? '♂️' : '♀️'}
                </Text>
              </View>
              <View className={styles.breedRow}>
                {getCategoryLabel(activePet.species)} · {activePet.breed}
              </View>
              <View className={styles.ageRow}>年龄：{activePet.age}</View>
            </View>
          </View>

          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>💉</Text>
                疫苗记录
              </Text>
              <Text className={styles.addBtn}>+ 添加</Text>
            </View>
            {activePet.vaccines.map(v => (
              <View key={v.id} className={styles.vaccineItem}>
                <View className={styles.vaccineInfo}>
                  <View className={styles.vaccineName}>{v.name}</View>
                  <View className={styles.vaccineDate}>接种日期：{v.date}</View>
                </View>
                <View className={v.nextDate ? styles.vaccineNext : styles.vaccineDone}>
                  {v.nextDate ? `下次 ${v.nextDate.slice(5)}` : '已完成'}
                </View>
              </View>
            ))}
          </View>

          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>⚠️</Text>
                过敏记录
              </Text>
              <Text className={styles.addBtn}>+ 添加</Text>
            </View>
            {activePet.allergies.length > 0 ? (
              <View className={styles.allergyTags}>
                {activePet.allergies.map((a, idx) => (
                  <View key={idx} className={styles.allergyTag}>{a}</View>
                ))}
              </View>
            ) : (
              <Text className={styles.noAllergy}>暂无过敏记录，宝贝很健康~</Text>
            )}
          </View>

          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>🎂</Text>
                纪念日
              </Text>
              <Text className={styles.addBtn}>+ 添加</Text>
            </View>
            {activePet.anniversaries.map(a => (
              <View key={a.id} className={styles.anniversaryItem}>
                <View className={styles.annivInfo}>
                  <Text className={styles.annivIcon}>🎉</Text>
                  <View>
                    <View className={styles.annivTitle}>{a.title}</View>
                    <View className={styles.annivDate}>{a.date}</View>
                  </View>
                </View>
                <View className={styles.annivCountdown}>即将到来</View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Button className={styles.editBtn}>编辑档案</Button>
    </View>
  );
};

export default PetProfilePage;
