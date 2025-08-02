import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '../src/context/UserContext';

export default function NameInputScreen() {
  const [inputName, setInputName] = useState('');
  const { setUserName } = useUser();

  const handleContinue = () => {
    if (inputName.trim() === '') {
      Alert.alert('알림', '이름을 입력해주세요.');
      return;
    }
    
    setUserName(inputName.trim());
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>사용자 이름을 입력해주세요</Text>
        <Text style={styles.subtitle}>앱에서 사용할 이름을 설정해주세요</Text>
        
        <TextInput
          style={styles.input}
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력하세요"
          placeholderTextColor="#999"
          maxLength={20}
          autoFocus={true}
        />
        
        <TouchableOpacity 
          style={[styles.continueButton, inputName.trim() === '' && styles.disabledButton]} 
          onPress={handleContinue}
          disabled={inputName.trim() === ''}
        >
          <Text style={[styles.continueButtonText, inputName.trim() === '' && styles.disabledButtonText]}>
            계속하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 40,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#FF6122',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#999',
  },
});
