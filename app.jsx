// app/index.tsx 예시
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Result from './src/screens/Result';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Result />
    </View>
  );
}
