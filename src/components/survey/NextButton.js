import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export const NextButton = ({ onPress, disabled, title }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={[
          styles.nextButton,
          !disabled && styles.nextButtonActive
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[
          styles.nextButtonText,
          !disabled && styles.nextButtonTextActive
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  nextButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#007AFF',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  nextButtonTextActive: {
    color: '#fff',
  },
});
