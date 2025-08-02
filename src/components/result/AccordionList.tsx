
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styled from '@emotion/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 20px;
`;

const Section = styled.View`
  padding: 0 20px;
`;

const AccordionItem = styled.View`
  margin-bottom: 10px;
`;

const AccordionHeader = styled(TouchableOpacity)`
  background-color: ${({ active }) => (active ? '#fff4f0' : '#f9f9f9')};
  border: 1px solid ${({ active }) => (active ? '#ff7a4e' : '#eee')};
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AccordionTitle = styled.Text`
  color: ${({ active }) => (active ? '#ff4f1f' : '#444')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const Icon = styled.Text`
  font-size: 18px;
  color: ${({ active }) => (active ? '#ff4f1f' : '#999')};
`;

const Description = styled.Text`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #fff6f1;
  border-radius: 6px;
  color: #333;
  line-height: 20px;
  font-size: 14px;
`;

const data = [
  {
    id: 1,
    title: '아무것도 안하고 잡자는 행동',
    description:
      '이러한 행동은 민수님의 성공적인 미래를 위한 활동에 전혀 도움이 되지않은 행동이에요! 아무것도 안하고 잠을 자는 것 보다는 미래에 도움이 되는 책 한권을 자기 전에 읽는 것이 어때요?',
  },
  { id: 2, title: '아무것도 안하고 잡자는 행동', description: '이러한 행동은 민수님의 성공적인 미래를 위한 활동에 전혀 도움이 되지않은 행동이에요! 아무것도 안하고 잠을 자는 것 보다는 미래에 도움이 되는 책 한권을 자기 전에 읽는 것이 어때요?', },
  { id: 3, title: '아무것도 안하고 잡자는 행동' },
  { id: 4, title: '아무것도 안하고 잡자는 행동' },
  { id: 5, title: '아무것도 안하고 잡자는 행동' },
  { id: 6, title: '아무것도 안하고 잡자는 행동' },
];

const AccordionList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <Container>
      <Title>이러한 행동을 함께 조심해봐요!</Title>
      <Section>
        {data.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <AccordionItem key={item.id}>
              <AccordionHeader active={isActive} onPress={() => toggleIndex(index)}>
                <AccordionTitle active={isActive}>
                  {String(item.id).padStart(2, '0')} {item.title}
                </AccordionTitle>
                <Icon active={isActive}>{isActive ? '▲' : '▼'}</Icon>
              </AccordionHeader>
              {isActive && item.description && (
                <Description>{item.description}</Description>
              )}
            </AccordionItem>
          );
        })}
      </Section>
    </Container>
  );
};

export default AccordionList;
