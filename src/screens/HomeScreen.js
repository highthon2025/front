// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { useUser } from '../context/UserContext';

// Components
import DateNavigator from '../components/DateNavigator';
import WeekDays from '../components/WeekDays';
import Greeting from '../components/Greeting';
import PastRecords from '../components/PastRecords';
import ScheduleHeader from '../components/ScheduleHeader';
import TodoList from '../components/TodoList';
import FloatingButton from '../components/FloatingButton';

// 색상 배열 (카테고리 카드용)
const CATEGORY_COLORS = ['#FF6122', '#FF8D60', '#FFB399', '#FFD6A5', '#A1E3D8'];

export default function HomeScreen() {
  const { userName } = useUser();
  const [selectedDay, setSelectedDay] = useState(2);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 2)); // 2025년 8월 2일
  const [categories, setCategories] = useState([]);
  const [todoItems, setTodoItems] = useState([]);

  // 최신 기록 데이터 + todo 불러오기
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get(
          'https://port-0-trauma-backend-mdueo4dva1d77ce5.sel5.cloudtype.app/db/latest',
          {
            timeout: 10000, // 10초 타임아웃
          }
        );
        const data = response.data;

        // categories 포맷팅 (8글자 자르기)
        const formattedCategories = data.map((item, index) => ({
          id: item.id,
          title: item.category.slice(0, 8),
          subtitle: item.title.slice(0, 8),
          date: item.created_at.split('T')[0].replace(/-/g, '.'),
          color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
        }));
        setCategories(formattedCategories);
        console.log(data)
        // 첫 번째 항목 todos 포맷팅 (API 응답 구조에 맞게 수정)
        if (data.length > 0 && data[0].todos) {
          const formattedTodos = data[0].todos.map(todo => ({
            id: todo.id,
            todo_text: todo.todo_text || '', // API 필드명 그대로 사용
            todo_category: todo.todo_category || '',
            order_seq: todo.order_seq || 0,
            completed: todo.is_completed || false, // API에서 is_completed 필드 사용
          }));
          setTodoItems(formattedTodos);
        }
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
        console.log('네트워크 오류로 인해 기본 데이터 사용');
        // 네트워크 오류 시 기본 데이터 사용
        setCategories([]);
        setTodoItems([]);
      }
    };

    fetchLatestData();
  }, []);

  // 날짜 포맷 (YYYY.MM.DD)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // To-do 완료 토글
  const toggleTodoComplete = (todoId) => {
    setTodoItems(prevItems =>
      prevItems.map(item =>
        item.id === todoId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 요일 네비게이션 함수들
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    updateWeekDays(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    updateWeekDays(newDate);
  };

  const goToSpecificDay = (dayNumber) => {
    const newDate = new Date(currentDate);
    const currentDay = newDate.getDate();
    const diff = dayNumber - currentDay;
    newDate.setDate(newDate.getDate() + diff);
    setCurrentDate(newDate);
    setSelectedDay(dayNumber);
  };

  const updateWeekDays = (date) => {
    setSelectedDay(date.getDate());
  };

  // 주간 날짜 배열 생성
  const getWeekDays = () => {
    const baseDate = new Date(currentDate);
    const currentDay = baseDate.getDate();
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(currentDay - 3);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        number: date.getDate(),
        day: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        selected: date.getDate() === currentDate.getDate(),
        fullDate: date,
      };
    });
  };

  const weekDays = getWeekDays();

  // 캘린더 이동
  const goToCalendar = () => {
    router.push('/todo-calendar');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          onPrev={goToPreviousDay}
          onNext={goToNextDay}
          formatDate={formatDate}
          onDatePress={goToCalendar}
        />
        <WeekDays weekDays={weekDays} onSelectDay={goToSpecificDay} />
        <Greeting />
        <PastRecords categories={categories} />
        <ScheduleHeader title={`${userName || '사용자'}님의 "성공"을 위해서`} date={formatDate(currentDate)} />
        <TodoList items={todoItems} onToggleComplete={toggleTodoComplete} />
      </ScrollView>
      <FloatingButton onPress={() => router.push('/survey')} />
    </View>
  );
}
