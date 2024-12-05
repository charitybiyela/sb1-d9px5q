import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import TestQuestion from './TestQuestion';
import ResultsPage from './ResultsPage';
import WalkingAnimation from './WalkingAnimation';

function PersonalityTest() {
  const { t } = useTranslation();
  const { currentQuestion, questions, answers, completed } = useTestStore();

  if (completed) {
    return <ResultsPage />;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-gray-500 block text-center mb-4">
            {t('Question')} {currentQuestion + 1} {t('of')} {questions.length}
          </span>
          <WalkingAnimation progress={progress} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <TestQuestion
            question={questions[currentQuestion]}
            onAnswer={(value) => {
              const newAnswers = [...answers];
              newAnswers[currentQuestion] = value;
              
              if (currentQuestion === questions.length - 1) {
                useTestStore.setState({
                  answers: newAnswers,
                  completed: true
                });
              } else {
                useTestStore.setState({
                  answers: newAnswers,
                  currentQuestion: currentQuestion + 1
                });
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default PersonalityTest;