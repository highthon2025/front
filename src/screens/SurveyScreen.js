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
  const [selectedOption, setSelectedOption] = useState(null);

  const surveyOptions = [
    '직접작성 할래요!',
    '백엔드를 잘하는 개발자가 되고싶어요!',
    '편집 디자인을 잘하는 디자이너가 되고싶어요!',
    '화면 디자인을 잘하는 UI디자이너가 되고 싶어요!',
    'SNS 피드, 광고 디자인을 잘 하고 싶어요!'
  ];

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    console.log('Selected option:', selectedOption);
    // 여기에 다음 단계 로직을 추가할 수 있습니다
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
          current={1}
          total={3}
        />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionSection 
            title="어떤 목표를 위해 계획을 세우고 있나요?"
            subtitle="목표를 선택하시면 그에 맞는 추천 계획을 제공해드려요"
          />

          <OptionList 
            options={surveyOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        </ScrollView>

        <NextButton 
          onPress={handleNext}
          disabled={selectedOption === null}
          title="다음"
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
