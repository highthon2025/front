import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function TodoList({ items, onToggleComplete }) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id} style={styles.todoItem}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <Svg width="10" height="57" viewBox="0 0 10 57">
                <Circle 
                  cx="5" 
                  cy="5" 
                  r="4.25" 
                  stroke={item.completed ? "#FF6122" : "#D9D9D9"} 
                  strokeWidth="1.5"
                  fill="none"
                />
                {index < items.length - 1 && (
                  <Path 
                    d="M5 16V56" 
                    stroke="#C3C3C3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeDasharray="2 2"
                  />
                )}
              </Svg>
            </View>
          </View>
          <View style={styles.content}>
            {item.time ? <Text style={styles.time}>{item.time}</Text> : null}
            {/* 여기를 item.title에서 item.todo_text로 변경 */}
            <Text style={[styles.title, item.completed && styles.completed]}>{item.todo_text}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
            onPress={() => onToggleComplete(item.id)}
          >
            {item.completed && (
              <Text style={styles.checkText}>✓</Text>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  todoItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  left: { marginRight: 16 },
  iconContainer: {
    width: 10,
    height: 57,
  },
  content: { flex: 1 },
  time: { fontSize: 12, color: '#C3C3C3', marginBottom: 4 },
  title: { fontSize: 14, color: '#000', lineHeight: 20 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  checkbox: { 
    width: 20, 
    height: 20, 
    borderRadius: 4, 
    borderWidth: 2, 
    borderColor: '#D9D9D9',
    backgroundColor: 'transparent',
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxCompleted: {
    backgroundColor: '#FF6122',
    borderColor: '#FF6122',
  },
  checkText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
