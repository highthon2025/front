import React from 'react';
import styled from '@emotion/native';
import Header from '../components/result/Header';
import Progress from '../components/result/Progress';

const Result = () => {
  return (
    <Container>
        <Header />
      <ContentScrollView contentContainerStyle={{ padding: 20 }}>

        

        <Progress />
        <Section>
          <Title>To-do List</Title>
          <Description>
            민수님이 선택하여 직접 만드는{'\n'}
            희망적인 미래로 향하는 투두 리스트예요!
          </Description>
        </Section>

        <TodoCard highlighted>
          <TodoText>관련 핀터레스트 자료 10개 수집</TodoText>
          <Label type="진로">진로</Label>
        </TodoCard>

        <TodoCard>
          <TodoText>B매거진 전공서적 10P 읽기</TodoText>
          <Label type="진로">진로</Label>
        </TodoCard>

        <Section>
          <Title>To-do List 저장하기</Title>
        </Section>

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
          <EmotionCard>
            <EmotionText>결정</EmotionText>
            <Label type="습관">습관</Label>
          </EmotionCard>
          <EmotionCard>
            <EmotionText>결정</EmotionText>
            <Label type="습관">습관</Label>
          </EmotionCard>
        </EmotionWrapper>
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

/* 이하 스타일은 이전과 동일 */
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

const TodoCard = styled.View`
  background-color: ${(props) => (props.highlighted ? '#FFF3ED' : '#fff')};
  border: ${(props) => (props.highlighted ? '1px solid #FF7733' : 'none')};
  border-radius: 12px;
  padding: 16px;
  width: 295px;
  height: 137px;
  padding: 20px 17px;
  left:23px;
  margin-top: 12px;
`;

const TodoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  background-color: ${(props) => (props.type === '진로' ? '#FFF57F' : '#FFC2C2')};
  color: #000;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  align-self: flex-start;
`;

const Message = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  left: 23px;
  font-weight: 500;
`;

const EmotionWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const EmotionCard = styled.View`
  width: 48%;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
`;

const EmotionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
`;
