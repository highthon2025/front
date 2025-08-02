// app/index.tsx 예시
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; // 여기 확인 필수

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
    </View>
  );
}
