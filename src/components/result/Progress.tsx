import React from 'react';
import styled from '@emotion/native';
import EmojiSun from './EmojiSunFace';

interface ProgressProps {
  description: string;
}

const Progress = ({ description }: ProgressProps) => {
  return (
    <Container>
      <HeaderText>
        민수님의 작성기록을 바탕으로한{"\n"}
        <BoldText>희망적 시나리오!</BoldText>
      </HeaderText>

      <EmojiWrapper><EmojiSun /></EmojiWrapper>

      <Box>
        <TextBlock>{description}</TextBlock>
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
  align-self: flex-start;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const Box = styled.View`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  width: 110%;
  margin-top: 20px;
  background-color: #fff;
`;

const TextBlock = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #333;
`;

const EmojiWrapper = styled.View`
  position: absolute;
  top: 10%;
  right: 10%;
`;
