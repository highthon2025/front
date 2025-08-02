import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";

const categories = [
  {
    id: 1,
    title: "카테고리",
    subtitle: "제목",
    date: "2025.07.31",
    color: "#FF6122"
  },
  {
    id: 2,
    title: "카테고리",
    subtitle: "제목",
    date: "2025.07.31",
    color: "#FF8D60"
  },
  {
    id: 3,
    title: "카테고리",
    subtitle: "제목",
    date: "2025.07.31",
    color: "#FFB399"
  }
];

const todoItems = [
  {
    id: 1,
    title: "핀터레스트로 관련 레퍼런스 10개 수집하기",
    time: "AM 08:20",
    completed: true
  },
  {
    id: 2,
    title: "핀터레스트로 관련 레퍼런스 10개 수집하기",
    time: "AM 08:20",
    completed: true
  },
  {
    id: 3,
    title: "핀터레스트로 관련 레퍼런스 10개 수집하기",
    time: "AM 08:20",
    completed: true
  },
  {
    id: 4,
    title: "핀터레스트로 관련 레퍼런스 10개 A 집안일",
    time: "",
    completed: false
  }
];

export function App(){
  const [selectedDay, setSelectedDay] = useState(2);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 2)); // 2025년 8월 2일

  // 날짜 포매팅 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 이전 날짜로 이동
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    updateWeekDays(newDate);
  };

  // 다음 날짜로 이동
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    updateWeekDays(newDate);
  };

  // 특정 일로 이동
  const goToSpecificDay = (dayNumber) => {
    const newDate = new Date(currentDate);
    const currentDay = newDate.getDate();
    const dayDiff = dayNumber - currentDay;
    newDate.setDate(newDate.getDate() + dayDiff);
    setCurrentDate(newDate);
    setSelectedDay(dayNumber);
  };

  // 주간 날짜 업데이트
  const updateWeekDays = (date) => {
    const currentDay = date.getDate();
    setSelectedDay(currentDay);
  };

  // 현재 주의 날짜들 계산
  const getWeekDays = () => {
    const baseDate = new Date(currentDate);
    const currentDay = baseDate.getDate();
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(currentDay - 3); // 현재 날짜를 중심으로 앞뒤 3일

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        number: date.getDate(),
        day: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        selected: date.getDate() === currentDate.getDate(),
        fullDate: date
      };
    });
  };

  const weekDays = getWeekDays();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity style={styles.navButton} onPress={goToPreviousDay}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.currentDate}>{formatDate(currentDate)}</Text>
          <TouchableOpacity style={styles.navButton} onPress={goToNextDay}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity key={day.number} style={[styles.dayContainer, day.selected && styles.selectedDayContainer]} onPress={() => goToSpecificDay(day.number)}>
              <Text style={[styles.dayNumber, day.selected && styles.selectedDayNumber]}>{day.number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>안녕하세요 민수님,</Text>
          <Text style={styles.greetingSubtext}>오늘은 어떤 것을 작성할 건가요?</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>지난 작성 기록</Text>
          <TouchableOpacity>
            <Text style={styles.sectionArrow}>›</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => (
            <View key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
              <Text style={styles.categoryDate}>{category.date}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>민수님의 "OOO"을 위해서</Text>
          <Text style={styles.scheduleDate}>{formatDate(currentDate)}</Text>
        </View>
        <Text style={styles.scheduleSubtitle}>오늘 해야하는 일정이에요!</Text>
        <View style={styles.todoContainer}>
          {todoItems.map((item, index) => (
            <View key={item.id} style={styles.todoItem}>
              <View style={styles.todoLeft}>
                <View style={[styles.timelineDot, { backgroundColor: item.completed ? '#FF6122' : '#D9D9D9' }]} />
                {index < todoItems.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.todoContent}>
                {item.time ? <Text style={styles.todoTime}>{item.time}</Text> : null}
                <Text style={[styles.todoTitle, item.completed && styles.completedTodo]}>{item.title}</Text>
                {item.completed && (
                  <View style={styles.completedCheckmark}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.finalTodo}>
          <View style={styles.todoLeft}>
            <View style={[styles.timelineDot, { backgroundColor: '#D9D9D9' }]} />
          </View>
          <View style={styles.todoContent}>
            <Text style={styles.todoTitle}>핀터레스트로 관련 레퍼런스</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>지금 작성하러가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingTop: 60,
    gap: 20,
  },
  navButton: {
    padding: 10,
  },
  navArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  currentDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dayContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayContainer: {
    backgroundColor: '#FF6122',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#C3C3C3',
  },
  selectedDayNumber: {
    color: '#FFFFFF',
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  greetingSubtext: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4F4F4F',
  },
  sectionArrow: {
    fontSize: 18,
    color: '#4F4F4F',
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryCard: {
    width: 143,
    height: 104,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.72,
  },
  categorySubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryDate: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.72,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  scheduleDate: {
    fontSize: 14,
    color: '#C3C3C3',
  },
  scheduleSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  todoContainer: {
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  todoLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#C3C3C3',
  },
  todoContent: {
    flex: 1,
    position: 'relative',
  },
  todoTime: {
    fontSize: 12,
    color: '#C3C3C3',
    marginBottom: 4,
  },
  todoTitle: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  completedCheckmark: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    height: 20,
    backgroundColor: '#FF6122',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF6122',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  finalTodo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
