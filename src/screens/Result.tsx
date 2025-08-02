import React, { useMemo, useState } from 'react';
import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useUser } from '../context/UserContext';
import Progress from '../components/result/Progress';
import NProgress from '../components/result/NProgress';
import AccordionList from '../components/result/AccordionList';
import axios from 'axios';

const LABEL_BG_COLORS = {
  기술: '#FFF57F',
  개발: '#FFC2C2',
  협업: '#A1E3D8',
  역량: '#FDCEDF',
  네트워킹: '#D3C0F9',
  성찰: '#FFD6A5',
};

const CARD_BG_COLOR_SELECTED = '#FFC2C2';
const CARD_BORDER_COLOR_SELECTED = '#FF7733';
const CARD_BG_COLOR_DEFAULT = '#fff';

const EMOTION_CARD_HEIGHT = 160;
const EMOTION_CARD_MARGIN_BOTTOM = 16;

export default function Result() {
  const { userName } = useUser();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'hope' | 'fail'>('hope');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const parsedResult = useMemo(() => {
    try {
      return JSON.parse(params.result as string);
    } catch (e) {
      return null;
    }
  }, [params]);

  if (!parsedResult) {
    return <Container><ErrorText>결과 데이터를 불러오지 못했어요.</ErrorText></Container>;
  }

  const { title, category, succ, fail } = parsedResult;

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
const selectedTitles = selectedIds.map((id) => succ.todo[id]);

  return (
    <Container>
      {/* 헤더 추가 */}
      <HeaderContainer>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon>←</BackIcon>
        </TouchableOpacity>
        <HeaderTitle>결과</HeaderTitle>
        <Placeholder />
      </HeaderContainer>
      
      {/* 탭 헤더 - 희망적/공포적 전환 */}
      <TabContainer>
        <TabButton 
          active={activeTab === 'hope'} 
          onPress={() => setActiveTab('hope')}
        >
          <TabText active={activeTab === 'hope'}>희망적</TabText>
        </TabButton>
        <TabButton 
          active={activeTab === 'fail'} 
          onPress={() => setActiveTab('fail')}
        >
          <TabText active={activeTab === 'fail'}>공포적</TabText>
        </TabButton>
      </TabContainer>
      
      <ContentScrollView contentContainerStyle={{ padding: 20 }}>
        {activeTab === 'hope' ? (
          <>
            <Progress description={succ.description} />
            <Divider />
            <Section>
              <Title>{userName || '사용자'}님의 성공을 위한 메인 투린{'\n'}To-do List</Title>
              <Description>
                {userName || '사용자'}님이 선택하여 직접 만드는{'\n'}
                희망적인 미래로 향하는 투두 리스트예요!
              </Description>
            </Section>

            {succ.todo.map((text: string, idx: number) => (
              <TodoCard
                key={idx}
                highlighted={selectedIds.includes(idx)}
                onPress={() => toggleSelect(idx)}
                bgColor={selectedIds.includes(idx) ? CARD_BG_COLOR_SELECTED : CARD_BG_COLOR_DEFAULT}
                borderColor={selectedIds.includes(idx) ? CARD_BORDER_COLOR_SELECTED : 'transparent'}
              >
                <TodoText>{text}</TodoText>
                <BigLabel type={succ.todo_cata[idx]}>{succ.todo_cata[idx]}</BigLabel>
                {selectedIds.includes(idx) && (
                  <CheckMark>✓</CheckMark>
                )}
              </TodoCard>
            ))}

            <SaveButton
              onPress={async () => {
                if (!parsedResult || !selectedIds.length) {
                  alert('저장할 항목을 선택해주세요.');
                  return;
                }
                
                const selectedTodos = selectedIds.map((id, idx) => ({
                  id: idx + 1,
                  date: '2025.08.03',
                  title: succ.todo[id],
                  completed: false,
                }));

                const selectedCatas = selectedIds.map((id) => succ.todo_cata[id]);

                const payload = {
                  category,
                  title,
                  succ: {
                    description: succ.description,
                    todo: selectedTodos.map(t => t.title),
                    todo_cata: selectedCatas,
                  },
                  fail,
                };

                try {
                  console.log('저장 시도중...', payload);
                  
                  // 개발 환경에서는 API 호출을 건너뛰고 바로 다음 화면으로 이동
                  if (__DEV__) {
                    console.log('개발 모드: API 호출 건너뛰기');
                    console.log('넘길 ToDos:', selectedTodos);
                    router.push({
                      pathname: '/todo-calendar',
                      params: {
                        todos: JSON.stringify(selectedTodos),
                      },
                    });
                    return;
                  }
                  
                  const response = await axios.post(
                    'https://port-0-trauma-backend-mdueo4dva1d77ce5.sel5.cloudtype.app/db/',
                    payload,
                    {
                      timeout: 10000, // 10초 타임아웃
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  );
                  
                  console.log('저장 성공:', response.data);
                  console.log('넘길 ToDos:', selectedTodos);
                  
                  router.push({
                    pathname: '/todo-calendar',
                    params: {
                      todos: JSON.stringify(selectedTodos),
                    },
                  });
                } catch (error) {
                  console.error('저장 실패:', error);
                  
                  // 네트워크 오류 시에도 일단 다음 화면으로 진행
                  console.log('네트워크 오류로 인한 우회: 로컬 저장으로 진행');
                  console.log('넘길 ToDos:', selectedTodos);
                  
                  router.push({
                    pathname: '/todo-calendar',
                    params: {
                      todos: JSON.stringify(selectedTodos),
                    },
                  });
                }
              }}
            >
              <SaveButtonText>To-do-List 저장하기</SaveButtonText>
            </SaveButton>


            <Section>
              <Title>{userName || '사용자'}님은 현재 이러한{'\n'}두려움을 극복한 상태예요!</Title>
              <EmotionWrapper>
                {Array.isArray(fail.reason) 
                  ? fail.reason.map((text: string, idx: number) => (
                      <EmotionCard key={idx}>
                        <EmotionText>{text}</EmotionText>
                        <Label type="습관">습관</Label>
                      </EmotionCard>
                    ))
                  : typeof fail.reason === 'object' && fail.reason
                  ? Object.entries(fail.reason).map(([key, value], idx) => (
                      <EmotionCard key={idx}>
                        <EmotionText>{key}: {String(value)}%</EmotionText>
                        <Label type="습관">습관</Label>
                      </EmotionCard>
                    ))
                  : null
                }
              </EmotionWrapper>
            </Section>
          </>
        ) : (
          <>
            <NProgress description={fail.description} />
            <Divider />
            <Section>
              <Title>{userName || '사용자'}님의 문제 원인</Title>
              <EmotionWrapper>
                {Array.isArray(fail.reason) 
                  ? fail.reason.map((text: string, idx: number) => (
                      <EmotionCard key={idx}>
                        <EmotionText>{text}</EmotionText>
                        <Label type="습관">습관</Label>
                      </EmotionCard>
                    ))
                  : typeof fail.reason === 'object' && fail.reason
                  ? Object.entries(fail.reason).map(([key, value], idx) => (
                      <EmotionCard key={idx}>
                        <EmotionText>{key}: {String(value)}%</EmotionText>
                        <Label type="습관">습관</Label>
                      </EmotionCard>
                    ))
                  : null
                }
              </EmotionWrapper>
            </Section>

            <AccordionList action_title={fail.action_title} action_desc={fail.action_desc} />
          </>
        )}
      </ContentScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentScrollView = styled.ScrollView`
  flex: 1;
`;

const Section = styled.View`
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  left: 23px;
  line-height: 26px;
  color: #333;
`;

const Description = styled.Text`
  font-size: 14px;
  left: 23px;
  color: #888;
`;

const TodoCard = styled.TouchableOpacity`
  background-color: ${(props: any) => props.bgColor};
  border: 1px solid ${(props: any) => props.borderColor};
  border-radius: 12px;
  padding: 20px 17px;
  width: 295px;
  height: 137px;
  margin-top: 12px;
  left: 23px;
  
  /* 그림자 효과 수정 */
  shadow-color: #000;
  shadow-offset: 4px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 16px;
  elevation: ${(props: any) => props.highlighted ? 8 : 4};
  
  /* 선택된 상태일 때 더 강한 그림자 */
  ${(props: any) => props.highlighted && `
    transform: translateY(-2px);
    shadow-opacity: 0.08;
  `}
`;

const TodoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CheckMark = styled.Text`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  color: #FF6122;
  font-weight: bold;
`;

const BigLabel = styled.Text`
  background-color: ${(props: any) => LABEL_BG_COLORS[props.type] || '#ccc'};
  color: #000;
  padding: 4px 8px;
  top: 90%;
  left: 5%;
  position: absolute;
  font-size: 12px;
  border-radius: 6px;
  align-self: flex-start;
`;

const Label = styled.Text`
  background-color: ${(props: any) => LABEL_BG_COLORS[props.type] || '#ccc'};
  color: #000;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  align-self: flex-start;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #ffffffff;
  border-radius: 12px;
  padding-vertical: 16px;
  margin: 20px 23px 0 23px;
  align-items: center;
  justify-content: center;

  /* 안드로이드 그림자 */
  elevation: 5;

  /* iOS 그림자 */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
`;

const SaveButtonText = styled.Text`
  color: #000000;
  font-size: 15px;
  font-weight: bold;
`;

const Message = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  left: 23px;
  margin-bottom: 15px;
  font-weight: 500;
`;

const EmotionWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
  padding-bottom: 50px;
  padding-horizontal: 23px;
`;

const EmotionCard = styled.View`
  width: 47%;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
  height: ${EMOTION_CARD_HEIGHT}px;
  margin-bottom: ${EMOTION_CARD_MARGIN_BOTTOM}px;
  justify-content: space-between;
`;

const EmotionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  flex: 1;
`;


const Divider = styled.View`
  height: 30px;
  width: 200%;
  left: -10%;
  background-color: #F5F6F8; /* 연한 회색 */
  margin: 20px 23px;
`;

// 헤더 관련 스타일 컴포넌트들 추가
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 12px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const BackIcon = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: 400;
  margin-top: 50px;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-top: 50px;
`;

const Placeholder = styled.View`
  width: 40px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 50px;
`;

// 탭 관련 스타일 컴포넌트들 추가
const TabContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding-vertical: 16px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.active ? '#FF6122' : 'transparent'};
`;

const TabText = styled.Text<{ active: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => props.active ? '600' : '400'};
  color: ${(props) => props.active ? '#FF6122' : '#666'};
`;