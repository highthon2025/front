import React from 'react';
import { View } from 'react-native';
import TodoCalendarScreen from '../src/screens/TodoCalendarScreen';

export default function TodoCalendar() {
  return (
    <View style={{ flex: 1 }}>
      <TodoCalendarScreen />
    </View>
  );
}
