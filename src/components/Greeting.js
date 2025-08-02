import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';

export default function Greeting() {
  const { userName } = useUser();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕하세요 {userName || '사용자'}님,</Text>
      <Text style={styles.subtext}>오늘은 어떤 것을 작성할 건가요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 20 },
  text: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  subtext: { fontSize: 20, fontWeight: '600', color: '#000' },
});
