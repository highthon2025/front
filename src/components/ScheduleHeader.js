import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleHeader({ title, date }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.subtitle}>오늘 해야하는 일정이에요!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // 필요한 스타일 추가 가능
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#C3C3C3',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
