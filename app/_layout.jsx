import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Splash',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          title: 'Home',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="survey" 
        options={{ 
          title: 'Survey',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
