import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { mockPlaces } from '@/data/places';
import { getCategoryLabel } from '@/utils';
import classnames from 'classnames';

const filters = [
  { key: 'all', label: '全部' },
  { key: 'shop', label: '友好店' },
  { key: 'hospital', label: '医院' },
  { key: 'park', label: '公园' }
];

const markerPositions: Record<string, { top: string; left: string }> = {
  pl1: { top: '30%', left: '40%' },
  pl2: { top: '60%', left: '30%' },
  pl3: { top: '45%', left: '65%' },
  pl4: { top: '25%', left: '70%' },
  pl5: { top: '70%', left: '55%' },
  pl6: { top: '50%', left: '20%' },
  pl7: { top: '35%', left: '80%' }
};

const MapPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPlaces = activeFilter === 'all'
    ? mockPlaces
    : mockPlaces.filter(p => p.type === activeFilter);

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'shop': return styles.tagShop;
      case 'hospital': return styles.tagHospital;
      case 'park': return styles.tagPark;
      default: return styles.tagShop;
    }
  };

  const getMarkerClass = (type: string) => {
    switch (type) {
      case 'shop': return styles.markerShop;
      case 'hospital': return styles.markerHospital;
      case 'park': return styles.markerPark;
      default: return styles.markerShop;
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'shop': return '🛍️';
      case 'hospital': return '🏥';
      case 'park': return '🌳';
      default: return '📍';
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.filterBar}>
        {filters.map(f => (
          <Button
            key={f.key}
            className={classnames(styles.filterBtn, activeFilter === f.key && styles.filterBtnActive)}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </View>

      <View className={styles.mapWrap}>
        <View className={styles.mapPlaceholder}>
          <View className={styles.mapIcon}>🗺️</View>
          <View className={styles.mapText}>点击地图标记查看详情</View>
        </View>
        <View className={styles.markers}>
          {filteredPlaces.map(place => (
            <View
              key={place.id}
              className={styles.marker}
              style={markerPositions[place.id] || { top: '50%', left: '50%' }}
            >
              <View className={classnames(styles.markerPin, getMarkerClass(place.type))}>
                {getMarkerIcon(place.type)}
              </View>
              <View className={styles.markerLabel}>{place.name.slice(0, 6)}</View>
            </View>
          ))}
        </View>
      </View>

      <ScrollView className={styles.listSection} scrollY>
        <View className={styles.sectionTitle}>附近地点 ({filteredPlaces.length})</View>
        {filteredPlaces.map(place => (
          <View key={place.id} className={styles.placeCard}>
            <Image className={styles.placeImage} src={place.image} mode="aspectFill" />
            <View className={styles.placeInfo}>
              <View className={styles.placeName}>{place.name}</View>
              <View>
                <Text className={classnames(styles.typeTag, getTypeClass(place.type))}>
                  {getCategoryLabel(place.type)}
                </Text>
              </View>
              <View className={styles.placeAddr}>📍 {place.address}</View>
              <View className={styles.placeTags}>
                {place.tags.slice(0, 3).map((tag, idx) => (
                  <View key={idx} className={styles.smallTag}>{tag}</View>
                ))}
              </View>
              <View className={styles.placeBottom}>
                <View className={styles.rating}>⭐ {place.rating}</View>
                <View className={styles.distance}>{place.distance}</View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MapPage;
