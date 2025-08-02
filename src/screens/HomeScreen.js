import React, { useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import DateNavigator from '../components/DateNavigator';
import WeekDays from '../components/WeekDays';
import Greeting from '../components/Greeting';
import PastRecords from '../components/PastRecords';
import ScheduleHeader from '../components/ScheduleHeader';
import TodoList from '../components/TodoList';
import FloatingButton from '../components/FloatingButton';

const categories = [
  { id: 1, title: "카테고리", subtitle: "제목", date: "2025.07.31", color: "#FF6122" },
  { id: 2, title: "카테고리", subtitle: "제목", date: "2025.07.31", color: "#FF8D60" },
  { id: 3, title: "카테고리", subtitle: "제목", date: "2025.07.31", color: "#FFB399" }
];

const todoItems = [
  { id: 1, title: "핀터레스트로 관련 레퍼런스 10개 수집하기", time: "AM 08:20", completed: true },
  { id: 2, title: "핀터레스트로 관련 레퍼런스 10개 수집하기", time: "AM 08:20", completed: true },
  { id: 3, title: "핀터레스트로 관련 레퍼런스 10개 수집하기", time: "AM 08:20", completed: true },
  { id: 4, title: "핀터레스트로 관련 레퍼런스 10개 A 집안일", time: "", completed: false }
];

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(2);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 2)); // 8월 2일

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

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

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DateNavigator currentDate={currentDate} onPrev={goToPreviousDay} onNext={goToNextDay} formatDate={formatDate} />
        <WeekDays weekDays={weekDays} onSelectDay={goToSpecificDay} />
        <Greeting />
        <PastRecords categories={categories} />
        <ScheduleHeader title='민수님의 "OOO"을 위해서' date={formatDate(currentDate)} />
        <TodoList items={todoItems} />
      </ScrollView>
      <FloatingButton onPress={() => console.log("작성 버튼 클릭")} />
    </View>
  );
}