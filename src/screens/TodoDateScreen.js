import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function TodoDateScreen() {
  const [currentDate] = useState(new Date(2025, 7, 2)); // 2025년 8월 2일
  const [isExported, setIsExported] = useState(false); // 내보내기 상태 추가
  
  // 해당 날짜의 할일 목록 (예시 데이터)
  const [todoItems] = useState([
    {
      id: 1,
      date: '2025.08.02',
      title: '핀터레스트로 관련 레퍼런스 10개 수집하기',
      completed: false
    },
    {
      id: 2,
      date: '2025.08.02', 
      title: 'B매거진 전공서적 10P 읽기',
      completed: false
    }
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleBackPress = () => {
    router.back();
  };

  const handlePrevDay = () => {
    // 이전 날짜로 이동 (구현 필요)
    console.log('이전 날짜로 이동');
  };

  const handleNextDay = () => {
    // 다음 날짜로 이동 (구현 필요)
    console.log('다음 날짜로 이동');
  };

  const handleExport = () => {
    setIsExported(true);
    console.log('내보내기 버튼 클릭됨');
    
    // 3초 후 원래 상태로 돌리기 (선택사항)
    setTimeout(() => {
      setIsExported(false);
    }, 3000);
  };

  const renderWeekDays = () => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
    );
  };

  const renderCalendarRow = () => {
    // 현재 날짜 주변의 날짜들을 표시
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
      <View style={styles.calendarRow}>
        {days.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.dayButton,
              day === 2 && styles.selectedDay // 2일이 선택된 상태
            ]}
          >
            <Text style={[
              styles.dayText,
              day === 2 && styles.selectedDayText
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>To-do List</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 날짜 네비게이션 */}
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={handlePrevDay}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.currentDateText}>{formatDate(currentDate)}</Text>
          <TouchableOpacity onPress={handleNextDay}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 요일 표시 */}
        {renderWeekDays()}

        {/* 캘린더 한 줄 (현재 주) */}
        {renderCalendarRow()}

        {/* 할일 목록 */}
        <View style={styles.todoSection}> 
          {todoItems.map((item, index) => renderTodoItem(item, index))}
        </View>
      </ScrollView>

      {/* 내보내기 버튼 */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5F6F8',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  navArrow: {
    fontSize: 24,
    color: '#666',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  currentDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  weekDayText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    width: 40,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 30,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: '#FF6122',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: '600',
  },
  todoSection: {
    paddingBottom: 100,
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
  exportButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#FF6122',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#FFF',
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
