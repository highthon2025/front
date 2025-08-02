import styled from '@emotion/native';
import { useRouter } from 'expo-router';

const Header = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  return (
    <Container>
      <BackButton onPress={() => router.push('/home')}>
        <Arrow>{'<'}</Arrow>
      </BackButton>
      <Title>결과화면</Title>
      <TabContainer>
        <Tab active={activeTab === 'hope'} onPress={() => setActiveTab('hope')}>
          <TabText active={activeTab === 'hope'}>희망적</TabText>
        </Tab>
        <Tab active={activeTab === 'fear'} onPress={() => setActiveTab('fear')}>
          <TabText active={activeTab === 'fear'}>공포적</TabText>
        </Tab>
      </TabContainer>
    </Container>
  );
};

export default Header;




const Container = styled.View`
  background-color: #f5f6f8;
  height: 20%;
  justify-content: flex-end;
  padding-bottom: 16px;
  `
;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20%;
  left: 5%;
  `
;

const Arrow = styled.Text`
  font-size: 30px;
  color: black;
  `
;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  `
;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-bottom-width: 1px;
  top: 18px;
  border-bottom-color: #ccc;
  `
;

const Tab = styled.TouchableOpacity`
  padding: 12px 24px;
  border-bottom-width: ${({ active }) => (active ? '2px' : '0px')};
  border-bottom-color: ${({ active }) => (active ? '#000' : 'transparent')};
  `
;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? '#000' : '#bbb')};
  `
;