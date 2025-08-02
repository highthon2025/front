import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function PastRecords({ categories }) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>지난 작성 기록</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.content}>
        {categories.map((cat) => (
          <View key={cat.id} style={[styles.card, { backgroundColor: cat.color }]}>
            <Text style={styles.catTitle}>{cat.title}</Text>
            <Text style={styles.catSub}>{cat.subtitle}</Text>
            <Text style={styles.catDate}>{cat.date}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  title: { fontSize: 16, fontWeight: '500', color: '#4F4F4F' },
  arrow: { fontSize: 18, color: '#4F4F4F' },
  container: { paddingLeft: 20 },
  content: { paddingRight: 20 },
  card: { width: 143, height: 104, borderRadius: 14, padding: 16, marginRight: 12, justifyContent: 'space-between' },
  catTitle: { fontSize: 14, color: '#fff', opacity: 0.72 },
  catSub: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  catDate: { fontSize: 12, color: '#fff', opacity: 0.72 },
});
