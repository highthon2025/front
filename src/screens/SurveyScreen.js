import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SurveyHeader } from '../components/survey/SurveyHeader';
import { ProgressIndicator } from '../components/survey/ProgressIndicator';
import { QuestionSection } from '../components/survey/QuestionSection';
import { OptionList } from '../components/survey/OptionList';
import { NextButton } from '../components/survey/NextButton';

export default function SurveyScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTrauma, setSelectedTrauma] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);

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

  const handleOptionSelect = (index) => {
    if (currentStep === 1) {
      setSelectedOption(index);
    }
  };

  const handleTraumaSelect = (index) => {
    if (currentStep === 2) {
      setSelectedTrauma(index);
    }
  };

  const handleSituationSelect = (index) => {
    if (currentStep === 3) {
      setSelectedSituation(index);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      // 두 번째 단계로 이동할 때 선택 상태 초기화
      setSelectedTrauma(null);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      // 세 번째 단계로 이동할 때 선택 상태 초기화
      setSelectedSituation(null);
    } else if (currentStep === 3) {
      console.log('First step selected:', selectedOption);
      console.log('Second step selected trauma:', selectedTrauma);
      console.log('Third step selected situation:', selectedSituation);
      // 설문 완료 - 홈으로 이동
      router.push('/');
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SurveyHeader 
          onBackPress={handleBackPress}
          title="작성하기"
        />

        <ProgressIndicator 
          current={currentStep}
          total={3}
        />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 1 ? (
            <>
              <QuestionSection 
                title="어떤 목표를 위해 계획을 세우고 있나요?"
                subtitle="목표를 선택하시면 그에 맞는 추천 계획을 제공해드려요"
              />

              <OptionList 
                options={firstStepOptions}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
              />
            </>
          ) : currentStep === 2 ? (
            <>
              <QuestionSection 
                title="그것을 막는 두려움이 있다면 무엇인지 알려주세요!"
                subtitle="나의 물야 또는 트라우마를 입력 또는 선택해주세요"
              />

              <OptionList 
                options={secondStepOptions}
                selectedOption={selectedTrauma}
                onOptionSelect={handleTraumaSelect}
              />
            </>
          ) : (
            <>
              <QuestionSection 
                title="민수님의 현재 상황은 어떠신가요?"
                subtitle="내가 현재 처해진 상황과 본인의 역량을 입력 또는 선택해주세요"
              />

              <OptionList 
                options={thirdStepOptions}
                selectedOption={selectedSituation}
                onOptionSelect={handleSituationSelect}
              />
            </>
          )}
        </ScrollView>

        <NextButton 
          onPress={handleNext}
          disabled={
            currentStep === 1 ? selectedOption === null : 
            currentStep === 2 ? selectedTrauma === null :
            selectedSituation === null
          }
          title={currentStep === 3 ? "선택완료" : "다음으로"}
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
});
