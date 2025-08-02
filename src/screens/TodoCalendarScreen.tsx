import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { exportTodosToICS } from '../utils/exportICS';


export default function TodoCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(3); // 기본적으로 2일 선택
  const [isExported, setIsExported] = useState(false); // 내보내기 상태 추가
  const [currentYear, setCurrentYear] = useState(2025); // 현재 년도
  const [currentMonth, setCurrentMonth] = useState(8); // 현재 월 (1-12)
  const params = useLocalSearchParams();
const initialTodos = useMemo(() => {
  try {
    return JSON.parse(params.todos as string) || [];
  } catch (e) {
    return [];
  }
}, [params.todos]);

// 날짜별 투두로 변환
const groupedTodos = useMemo(() => {
  const result = {};

  const generateDailyTodos = (todo) => {
    const [year, month, day] = todo.date.split('.').map(Number);
    const startDate = new Date(year, month - 1, day);
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

    const todos = [];
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const todoDate = `${currentYear}.${String(currentMonth).padStart(2, '0')}.${String(d).padStart(2, '0')}`;
      todos.push({ ...todo, date: todoDate });
    }
    return todos;
  };

  initialTodos.forEach((todo) => {
    const repeatedTodos = generateDailyTodos({ ...todo, repeat: 'daily' });

    repeatedTodos.forEach((rt) => {
      const day = parseInt(rt.date.split('.')[2], 10);
      if (!result[day]) result[day] = [];
      result[day].push(rt);
    });
  });

  return result;
}, [initialTodos, currentMonth, currentYear]);


const [todoData, setTodoData] = useState(groupedTodos);
  // 날짜별 할일 데이터

  // 달력 데이터 생성
  const generateCalendarDays = () => {
    const year = currentYear;
    const month = currentMonth - 1; // JavaScript Date는 0부터 시작하므로 -1
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay(); // 0 = 일요일
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // 빈 공간 추가 (일요일부터 시작)
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(day);
      // 같은 화면에서 해당 날짜의 할일을 표시
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(1); // 월이 변경되면 1일로 초기화
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1); // 월이 변경되면 1일로 초기화
  };

  const handleExport = async () => {
  const allTodos = Object.values(todoData).flat();
  await exportTodosToICS(allTodos);
  setIsExported(true);
  setTimeout(() => setIsExported(false), 3000);
};

  // 선택된 날짜의 할일 가져오기
  const getSelectedDateTodos = () => {
    return todoData[selectedDate] || [];
  };

  // 할일 항목 렌더링
  const renderTodoItem = (item, index) => (
    <View key={item.id} style={styles.todoItem}>
      <View style={styles.todoContent}>
        <Text style={styles.todoDate}>{item.date}</Text>
        <Text style={styles.todoTitle}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  // 날짜 포맷팅
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 년월만 포맷팅
  const formatYearMonth = () => {
    const month = String(currentMonth).padStart(2, '0');
    return `${currentYear}.${month}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>To-do List</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 날짜 네비게이터 */}
        <View style={styles.dateNavigator}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>{formatYearMonth()}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 요일 헤더 */}
        <View style={styles.weekHeader}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>

        {/* 달력 그리드 */}
        <View style={styles.calendar}>
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                day === selectedDate && styles.selectedDay
              ]}
              onPress={() => handleDateSelect(day)}
            >
              {day && (
                <Text style={[
                  styles.dayText,
                  day === selectedDate && styles.selectedDayText
                ]}>
                  {day}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* 선택된 날짜의 할일 목록 */}
        <View style={styles.todoSection}>
          {getSelectedDateTodos().length > 0 ? (
            getSelectedDateTodos().map((item, index) => renderTodoItem(item, index))
          ) : (
            <View style={styles.emptyTodo}>
              <Text style={styles.emptyTodoText}>
                {formatDate(new Date(currentYear, currentMonth - 1, selectedDate))}에 등록된 할일이 없습니다.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 내보내기 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.exportButton,
            isExported && styles.exportButtonPressed
          ]} 
          onPress={handleExport}
        >
          <Text style={[
            styles.exportButtonText,
            isExported && styles.exportButtonTextPressed
          ]}>
            {isExported ? '내보내기 완료!' : '내보내기'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  navArrow: {
    fontSize: 24,
    color: '#333',
    paddingHorizontal: 20,
    fontWeight: '300',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  dayCell: {
    width: '14.28%', // 7일로 나눔
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  selectedDay: {
    backgroundColor: '#FF6122',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todoSection: {
    paddingVertical: 20,
    paddingBottom: 100, // 내보내기 버튼을 위한 여백
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  todoTitle: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  emptyTodo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTodoText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  exportButton: {
    backgroundColor: '#FF6122',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exportButtonPressed: {
    backgroundColor: '#FF8D60', // 더 밝은 주황색
    transform: [{ scale: 0.98 }], // 살짝 작아지는 효과
  },
  exportButtonTextPressed: {
    color: '#FFF',
  },
});
