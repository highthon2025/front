import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const ProgressIndicator = ({ current, total }) => {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>
        {current}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
  },
});
