import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, ChevronRight } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import AuthButton from './components/AuthButton';
import PersonalityTest from './components/PersonalityTest';
import TypeDetails from './components/TypeDetails';
import { useTestStore } from './store/testStore';
import { personalityData } from './utils/personalityData';
import TypeDescription from './components/TypeDescription';

function App() {
  const { t } = useTranslation();
  const { testStarted, setTestStarted } = useTestStore();

  if (testStarted) {
    return <PersonalityTest />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">OFSU Personality Test</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4">
        <Routes>
          <Route path="/type/:typeId" element={<TypeDetails />} />
          <Route path="/" element={
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                  {t('Free Personality Test')}
                </h2>
                <p className="text-xl text-gray-600 mb-12 text-center">
                  {t('Discover your personality type in just 12 minutes')}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTestStarted(true)}
                  className="mx-auto block px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('Start Test')}
                  <ChevronRight className="ml-2 w-5 h-5 inline" />
                </motion.button>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {Object.entries(personalityData).map(([type, data]) => (
                    <TypeDescription
                      key={type}
                      type={type}
                      title={data.title}
                      description={data.description}
                      imageUrl={data.imageUrl}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;