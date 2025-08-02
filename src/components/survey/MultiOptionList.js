import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export const MultiOptionList = ({ options, selectedOptions, onOptionSelect }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOptions.includes(index) && styles.selectedOption
          ]}
          onPress={() => onOptionSelect(index)}
        >
          <Text 
            style={[
              styles.optionText,
              selectedOptions.includes(index) && styles.selectedOptionText
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: '#FF6122',
    borderColor: '#FF6122',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
