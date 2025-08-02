import React from 'react';
import styled from '@emotion/native';
import EmojiSadFace from './EmojiSadFace';

const NProgress = () => {
  return (
    <Container>
      <HeaderText>
        민수님의 작성기록을 바탕으로한{" "}{"\n"}
        <BoldText>공포적 시나리오..</BoldText>
        
      </HeaderText>
        <EmojiWrapper><EmojiSadFace /></EmojiWrapper>
      <Box>
        <TextBlock>
          현재 민수님이 작성하신 기록들을 분석한 결과, 과제 제출에 대한 부분이 현저히 떨어진다는 것을 알 수 있었어요{"\n"}
          앞으로 과제 제출을 제시간 안에 제출하지 못하면, 전공 성적이 떨어지며 원하는 꿈에 도달하지 못해요...
        </TextBlock>
      </Box>
    </Container>
  );
};

export default NProgress;

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