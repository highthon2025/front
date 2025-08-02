import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodoList({ items }) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id} style={styles.todoItem}>
          <View style={styles.left}>
            <View style={[styles.dot, { backgroundColor: item.completed ? '#FF6122' : '#D9D9D9' }]} />
            {index < items.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.content}>
            {item.time ? <Text style={styles.time}>{item.time}</Text> : null}
            <Text style={[styles.title, item.completed && styles.completed]}>{item.title}</Text>
            {item.completed && (
              <View style={styles.check}>
                <Text style={styles.checkText}>✓</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  todoItem: { flexDirection: 'row', marginBottom: 20 },
  left: { alignItems: 'center', marginRight: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  line: { width: 2, height: 40, backgroundColor: '#C3C3C3' },
  content: { flex: 1, position: 'relative' },
  time: { fontSize: 12, color: '#C3C3C3', marginBottom: 4 },
  title: { fontSize: 14, color: '#000', lineHeight: 20 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  check: { position: 'absolute', right: 0, top: 0, width: 20, height: 20, backgroundColor: '#FF6122', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
