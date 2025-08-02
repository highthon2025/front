import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Result" />
      <Stack.Screen name="home" />
      <Stack.Screen name="survey" />
      <Stack.Screen name="todo-calendar" />
      <Stack.Screen name="todo-date" />
    </Stack>
  );
}
