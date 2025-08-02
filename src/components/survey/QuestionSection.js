import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const QuestionSection = ({ title, subtitle }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>
        {title}
      </Text>
      <Text style={styles.questionSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
    lineHeight: 32,
  },
  questionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
});
