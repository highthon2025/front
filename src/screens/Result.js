import React, { useState } from 'react';
import styled from '@emotion/native';
import Header from '../components/result/Header';
import Progress from '../components/result/Progress';
import NProgress from '../components/result/NProgress';
import AccordionList from '../components/result/AccordionList';

// To-do 리스트 데이터 (id, text, type)
const todoItems = [
  { id: 1, text: '관련 핀터레스트 자료 10개 수집', type: '진로' },
  { id: 2, text: 'B매거진 전공서적 10P 읽기', type: '진로' },
];

// Label 타입별 배경색 상수
const LABEL_BG_COLORS = {
  진로: '#FFF57F',
  습관: '#FFC2C2',
};

// TodoCard 선택 여부별 배경/테두리 색상
const CARD_BG_COLOR_SELECTED = '#FFC2C2';
const CARD_BORDER_COLOR_SELECTED = '#FF7733';
const CARD_BG_COLOR_DEFAULT = '#fff';

// EmotionCard 높이 및 마진 변수
const EMOTION_CARD_HEIGHT = 160;
const EMOTION_CARD_MARGIN_BOTTOM = 16;

const Result = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('hope');

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onSavePress = () => {
    console.log('저장할 To-do IDs:', selectedIds);
  };

  return (
    <Container>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentScrollView contentContainerStyle={{ padding: 20 }}>
        

        {activeTab === 'hope' ? (
          <>
            <Progress />
            <Divider />
            {/* 희망적 탭 내용 */}
            <Section>
              <Title>To-do List</Title>
              <Description>
                민수님이 선택하여 직접 만드는{'\n'}
                희망적인 미래로 향하는 투두 리스트예요!
              </Description>
            </Section>

            {todoItems.map(({ id, text, type }) => (
              <TodoCard
                key={id}
                highlighted={selectedIds.includes(id)}
                onPress={() => toggleSelect(id)}
                bgColor={selectedIds.includes(id) ? CARD_BG_COLOR_SELECTED : CARD_BG_COLOR_DEFAULT}
                borderColor={selectedIds.includes(id) ? CARD_BORDER_COLOR_SELECTED : 'transparent'}
              >
                <TodoText>{text}</TodoText>
                <Label type={type}>{type}</Label>
              </TodoCard>
            ))}

            <SaveButton onPress={onSavePress} activeOpacity={0.8}>
              <SaveButtonText>To-do-List 저장하기</SaveButtonText>
            </SaveButton>
            <Message>
              민수님은 현재 이러한{'\n'}
              두려움을 극복한 상태에요!
            </Message>

            <EmotionWrapper>
              <EmotionCard>
                <EmotionText>마감기한</EmotionText>
                <Label type="습관">습관</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>성적</EmotionText>
                <Label type="진로">진로</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>피드백</EmotionText>
                <Label type="진로">진로</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>결정</EmotionText>
                <Label type="습관">습관</Label>
              </EmotionCard>
            </EmotionWrapper>
          </>
        ) : (
          <>
            <NProgress />
            <Divider />
            <Message>
              민수님은 현재{'\n'}
              두려워하는 원인이에요!
            </Message>
            <EmotionWrapper>
              <EmotionCard>
                <EmotionText>마감기한</EmotionText>
                <Label type="습관">습관</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>성적</EmotionText>
                <Label type="진로">진로</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>피드백</EmotionText>
                <Label type="진로">진로</Label>
              </EmotionCard>
              <EmotionCard>
                <EmotionText>결정</EmotionText>
                <Label type="습관">습관</Label>
              </EmotionCard>
            </EmotionWrapper>
            <AccordionList />
          </>
        )}
      </ContentScrollView>
    </Container>
  );
};


export default Result;

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
  left: 23px;
`;

const TodoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  background-color: ${(props) => LABEL_BG_COLORS[props.type] || '#ccc'};
  color: #000;
  padding: 4px 8px;
  top: 40%;
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