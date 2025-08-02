import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../src/context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="name-input" />
        <Stack.Screen name="Result" />
        <Stack.Screen name="home" />
        <Stack.Screen name="survey" />
        <Stack.Screen name="todo-calendar" />
        <Stack.Screen name="todo-date" />
      </Stack>
    </UserProvider>
  );
}
