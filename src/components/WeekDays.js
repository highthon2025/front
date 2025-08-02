import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WeekDays({ weekDays, onSelectDay }) {
  return (
    <View style={styles.weekContainer}>
      {weekDays.map((day) => (
        <TouchableOpacity key={day.fullDate.toISOString()} style={[styles.dayContainer, day.selected && styles.selected]} onPress={() => onSelectDay(day.number)}>
          <Text style={[styles.dayNumber, day.selected && styles.selectedText]}>{day.number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  weekContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, paddingVertical: 20 },
  dayContainer: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  selected: { backgroundColor: '#FF6122' },
  dayNumber: { fontSize: 16, fontWeight: '500', color: '#C3C3C3' },
  selectedText: { color: '#FFFFFF' },
});
