import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';

const LoadingScreen = ({ message = "분석 중입니다..." }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    "답변을 분석하고 있습니다...",
    "개인화된 결과를 생성하고 있습니다...",
    "최적의 계획을 수립하고 있습니다...",
    "거의 완료되었습니다..."
  ];

  useEffect(() => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // 메시지 순환
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % messages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#FF6122" />
        <Text style={styles.message}>{messages[currentMessageIndex]}</Text>
        <Text style={styles.subMessage}>
          잠시만 기다려주세요{'\n'}
          더 정확한 결과를 위해 분석 중입니다
        </Text>
        
        {/* 진행 표시를 위한 점들 */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: currentMessageIndex >= index ? 1 : 0.3 }
              ]}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6122',
    marginHorizontal: 4,
  },
});

export default LoadingScreen;
