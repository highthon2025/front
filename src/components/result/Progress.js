import React from 'react';
import styled from '@emotion/native';
import EmojiSun from './EmojiSunFace';

const Progress = () => {
  return (
    <Container>
      <HeaderText>
        민수님의 작성기록을 바탕으로한{" "}{"\n"}
        <BoldText>희망적 시나리오!</BoldText>
        
      </HeaderText>
        <EmojiWrapper><EmojiSun /></EmojiWrapper>
      <Box>
        <TextBlock>
          현재 민수님이 작성하신 기록들을 분석한 결과, 
          아대로운 목표하신 꿈을 향해서 도달할 수 있어요!{" "}
          평소처럼꾸준히 핀터레스트에서 관련 레퍼런스를 찾고
          10분 일찍 일어나는 습관을 지닌다면, 희망찬 미래를 향해서 나아갈 수 있어요!
        </TextBlock>
      </Box>
    </Container>
  );
};

export default Progress;

// styled components

const Container = styled.View`
  padding: 30px;
  align-items: center;
  background-color: white;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
  position: fixed;
  left: -10%;
`;

const BoldText = styled.Text`
  font-weight: bold;

  position: fixed;
`;

const Box = styled.View`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  width: 110%;
  top: 20px;
  background-color: #fff;
`;

const TextBlock = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #333;
`;


const EmojiWrapper = styled.View`
  margin-left: 4px;
  position: absolute;
  top: 10%;
  right: 10%;
  margin-top: -2px;
`;