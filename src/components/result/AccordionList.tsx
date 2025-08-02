import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
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

type Props = {
  action_title: string[];
  action_desc: string[];
};

const AccordionList = ({ action_title, action_desc }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  // props로 받은 배열을 data 형태로 변환
  const data = action_title.map((title, index) => ({
    id: index + 1,
    title,
    description: action_desc[index] ?? '',
  }));

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
