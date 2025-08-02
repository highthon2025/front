import React from 'react';
import Result from '../src/screens/Result';
import HomeScreen from '../src/screens/HomeScreen';
import SurveyScreen from '../src/screens/SurveyScreen';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const handleStartPress = () => {
    router.push('/name-input');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>
          <Text style={styles.logoV}>V</Text>
          <Text style={styles.logoARE}>ARE</Text>
        </Text>
        <Text style={styles.subtitle}>희망적인 미래, 공포적인 미래</Text>
        <Text style={styles.description}>당신은 어떤 미래로 나아갈까요?</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 40,
    letterSpacing: -2,
  },
  logoV: {
    color: '#FF6122',
  },
  logoARE: {
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
  },
  startButton: {
    backgroundColor: '#FF6122',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
