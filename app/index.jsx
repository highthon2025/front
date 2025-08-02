import React from 'react';
import { View } from 'react-native';
import Result from '../src/screens/Result';
import HomeScreen from '../src/screens/HomeScreen';
import SurveyScreen from '../src/screens/SurveyScreen';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Result />
    </View>
  );
}
