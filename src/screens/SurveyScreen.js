// SurveyScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useUser } from '../context/UserContext';
import { SurveyHeader } from '../components/survey/SurveyHeader';
import { ProgressIndicator } from '../components/survey/ProgressIndicator';
import { QuestionSection } from '../components/survey/QuestionSection';
import { OptionList } from '../components/survey/OptionList';
import { NextButton } from '../components/survey/NextButton';

export default function SurveyScreen() {
  const { userName } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTrauma, setSelectedTrauma] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [customGoal, setCustomGoal] = useState('');
  const [customTrauma, setCustomTrauma] = useState('');
  const [customSituation, setCustomSituation] = useState('');

  const firstStepOptions = [
    '직접작성 할래요!',
    '백엔드를 잘하는 개발자가 되고싶어요!',
    '편집 디자인을 잘하는 디자이너가 되고싶어요!',
    '화면 디자인을 잘하는 UI디자이너가 되고 싶어요!',
    'SNS 피드, 광고 디자인을 잘 하고 싶어요!'
  ];

  const secondStepOptions = [
    '직접작성 할래요!',
    '주어진 시간 안에 과제를 제출하지 못했어요..',
    '선생님에게 디자인 지적을 받아 자존감이 낮아졌어요..',
    '개발을 하면서 막히는 부분이 있으면 불안해요..',
    '제가 정말 원하는 진로가 무엇인지 모르겠어요..'
  ];

  const thirdStepOptions = [
    '직접작성 할래요!',
    '바로 취업을 해도 손색없는 실력이에요!',
    '아무것도 모르겠어요..',
    '지금도 충분히 만족하고 있어요',
    '실력이 좋은 것 같지는 않아요'
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      setSelectedTrauma(null);
      setCustomTrauma('');
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setSelectedSituation(null);
      setCustomSituation('');
    } else if (currentStep === 3) {
      const goalValue = selectedOption === 0 ? customGoal : firstStepOptions[selectedOption];
      const traumaValue = selectedTrauma === 0 ? customTrauma : secondStepOptions[selectedTrauma];
      const situationValue = selectedSituation === 0 ? customSituation : thirdStepOptions[selectedSituation];

      try {
        console.log('API 요청 데이터:', {
          ideal: goalValue,
          afraid: traumaValue,
          current: situationValue,
        });

        const response = await axios.post(
          'https://port-0-trauma-backend-mdueo4dva1d77ce5.sel5.cloudtype.app/api',
          {
            ideal: goalValue,
            afraid: traumaValue,
            current: situationValue,
          },
          {
            timeout: 15000, // 15초 타임아웃
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const resultData = response.data;
        console.log('응답 데이터:', resultData);
        
        router.push({
          pathname: '/Result',
          params: { result: JSON.stringify(resultData) },
        });
      } catch (error) {
        console.error('POST 실패:', error);
        
        // API 호출 실패 시 목업 데이터로 진행 (개발/프로덕션 모두)
        console.log('API 호출 실패: 목업 데이터 사용');
        const mockData = {
          title: goalValue || "목표",
          category: "테스트",
          succ: {
            description: "성공적인 미래를 위한 희망적인 시나리오입니다.",
            todo: ["목표 달성을 위한 첫 번째 단계", "꾸준한 노력하기", "전문가와 상담하기"],
            todo_cata: ["개발", "성찰", "네트워킹"]
          },
          fail: {
            description: "목표를 달성하지 못한 시나리오입니다.",
            reason: ["미루는 습관", "자신감 부족", "계획 부족"],
            action_title: ["즉시 행동하기", "자신감 기르기", "체계적 계획"],
            action_desc: ["오늘부터 작은 것이라도 시작해보세요", "작은 성공 경험을 쌓아가세요", "단계별 계획을 세워보세요"]
          }
        };
        
        router.push({
          pathname: '/Result',
          params: { result: JSON.stringify(mockData) },
        });
      }
    }
  };

  const handleOptionSelect = (index) => {
    if (currentStep === 1) {
      setSelectedOption(index);
      if (index !== 0) setCustomGoal('');
    }
  };

  const handleTraumaSelect = (index) => {
    if (currentStep === 2) {
      setSelectedTrauma(index);
      if (index !== 0) setCustomTrauma('');
    }
  };

  const handleSituationSelect = (index) => {
    if (currentStep === 3) {
      setSelectedSituation(index);
      if (index !== 0) setCustomSituation('');
    }
  };

  const handleBackPress = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SurveyHeader onBackPress={handleBackPress} title="작성하기" />
        <ProgressIndicator current={currentStep} total={3} />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {currentStep === 1 ? (
            <>
              <QuestionSection title="어떤 목표를 위해 계획을 세우고 있나요?" subtitle="목표를 선택하시면 그에 맞는 추천 계획을 제공해드려요" />
              <OptionList options={firstStepOptions} selectedOption={selectedOption} onOptionSelect={handleOptionSelect} />
              {selectedOption === 0 && (
                <TextInput style={styles.textInput} placeholder="목표를 직접 입력해주세요" value={customGoal} onChangeText={setCustomGoal} multiline numberOfLines={3} />
              )}
            </>
          ) : currentStep === 2 ? (
            <>
              <QuestionSection title="그것을 막는 두려움이 있다면 무엇인지 알려주세요!" subtitle="나의 물야 또는 트라우마를 입력 또는 선택해주세요" />
              <OptionList options={secondStepOptions} selectedOption={selectedTrauma} onOptionSelect={handleTraumaSelect} />
              {selectedTrauma === 0 && (
                <TextInput style={styles.textInput} placeholder="두려움이나 트라우마를 직접 입력해주세요" value={customTrauma} onChangeText={setCustomTrauma} multiline numberOfLines={3} />
              )}
            </>
          ) : (
            <>
              <QuestionSection title={`${userName || '사용자'}님의 현재 상황은 어떠신가요?`} subtitle="내가 현재 처해진 상황과 본인의 역량을 입력 또는 선택해주세요" />
              <OptionList options={thirdStepOptions} selectedOption={selectedSituation} onOptionSelect={handleSituationSelect} />
              {selectedSituation === 0 && (
                <TextInput style={styles.textInput} placeholder="현재 상황을 직접 입력해주세요" value={customSituation} onChangeText={setCustomSituation} multiline numberOfLines={3} />
              )}
            </>
          )}
        </ScrollView>
        <NextButton
          onPress={handleNext}
          disabled={
            currentStep === 1
              ? selectedOption === null || (selectedOption === 0 && customGoal.trim() === '')
              : currentStep === 2
              ? selectedTrauma === null || (selectedTrauma === 0 && customTrauma.trim() === '')
              : selectedSituation === null || (selectedSituation === 0 && customSituation.trim() === '')
          }
          title={currentStep === 3 ? '선택완료' : '다음으로'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
