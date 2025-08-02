import React, { useMemo, useState } from 'react';
import styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../components/result/Header';
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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentScrollView contentContainerStyle={{ padding: 20 }}>
        {activeTab === 'hope' ? (
          <>
            <Progress description={succ.description} />
            <Divider />
            <Section>
              <Title>To-do List</Title>
              <Description>
                민수님이 선택하여 직접 만드는{'\n'}
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
              </TodoCard>
            ))}

            <SaveButton
              onPress={async () => {
                if (!parsedResult || !selectedIds.length) return;
                const selectedTodos = selectedIds.map((id, idx) => ({
                        id: idx + 1,
                        date: '2025.08.03', // 혹은 현재 날짜
                        title: succ.todo[id], // ⬅️ 바로 succ.todo 에서 꺼냄
                        completed: false,
                      }));



                const selectedCatas = selectedIds.map((id) => succ.todo_cata[id]);

                const payload = {
                      category,
                      title,
                      succ: {
                        description: succ.description,
                        todo: selectedTodos.map(t => t.title), // 백엔드 저장용
                        todo_cata: selectedCatas,
                      },
                      fail,
                    };

                try {
                  const response = await axios.post(
                    'https://port-0-trauma-backend-mdueo4dva1d77ce5.sel5.cloudtype.app/db/',
                    payload
                  );
                  console.log('저장 성공:', response.data);
                    console.log('넘길 ToDos:', selectedTodos);
                    router.push({
                        pathname: '/todo-calendar',
                        params: {
                          todos: JSON.stringify(selectedTodos), // ✅ 정확하게 전달
                        },
                      });
                    } catch (error) {
                      console.error('저장 실패:', error);
                      alert('저장 중 오류가 발생했어요. 다시 시도해 주세요.');
                    }
                  }}
            >
              <SaveButtonText>To-do-List 저장하기</SaveButtonText>
            </SaveButton>


            <Section>
              <Title>당신은 이런 감정들을 이겨냈어요</Title>
              <EmotionWrapper>
                {fail.reason.map((text: string, idx: number) => (
                  <EmotionCard key={idx}>
                    <EmotionText>{text}</EmotionText>
                    <Label type="습관">습관</Label>
                  </EmotionCard>
                ))}
              </EmotionWrapper>
            </Section>
          </>
        ) : (
          <>
            <NProgress description={fail.description} />
            <Divider />
            <Section>
              <Title>당신의 문제 원인</Title>
              <EmotionWrapper>
                {fail.reason.map((text: string, idx: number) => (
                  <EmotionCard key={idx}>
                    <EmotionText>{text}</EmotionText>
                    <Label type="습관">습관</Label>
                  </EmotionCard>
                ))}
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  left: 23px;
`;

const Description = styled.Text`
  font-size: 14px;
  left: 23px;
  color: #888;
`;

const TodoCard = styled.TouchableOpacity`
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 12px;
  padding: 20px 17px;
  width: 295px;
  height: 137px;
  margin-top: 12px;
  elevation: 5;
  left: 23px;
`;

const TodoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const BigLabel = styled.Text`
  background-color: ${(props) => LABEL_BG_COLORS[props.type] || '#ccc'};
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
  background-color: ${(props) => LABEL_BG_COLORS[props.type] || '#ccc'};
  color: #000;
  padding: 4px 8px;
  top: 90%;
  left: 10%;
  position: absolute;
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
  gap: 10px;
  margin-top: 12px;
  padding-bottom: 50px;
`;

const EmotionCard = styled.View`
  width: 45%;
  background-color: #fff;
  padding: 16px;
  left: 15px;
  height: 60%;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
  height: ${EMOTION_CARD_HEIGHT}px;
  margin-bottom: ${EMOTION_CARD_MARGIN_BOTTOM}px;
`;

const EmotionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
`;


const Divider = styled.View`
  height: 30px;
  width: 200%;
  left: -10%;
  background-color: #F5F6F8; /* 연한 회색 */
  margin: 20px 23px;
`;