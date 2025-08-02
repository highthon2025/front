import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DateNavigator({ currentDate, onPrev, onNext, formatDate, onDatePress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} style={styles.navButton}>
        <Text style={styles.navArrow}>‹</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDatePress}>
        <Text style={styles.currentDate}>{formatDate(currentDate)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.navButton}>
        <Text style={styles.navArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 30, paddingTop: 60, gap: 20 },
  navButton: { padding: 10 },
  navArrow: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  currentDate: { fontSize: 18, fontWeight: 'bold', color: '#000' },
});
