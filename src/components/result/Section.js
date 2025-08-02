import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../result/styles';

const Section = ({ title, content }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
};

export default Section;