import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, BookOpen, Heart, Briefcase, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { useTestStore } from '../store/testStore';
import { getPersonalityData } from '../utils/personalityData';
import PersonalityOverview from './results/PersonalityOverview';
import RelationshipInsights from './results/RelationshipInsights';
import CareerSuggestions from './results/CareerSuggestions';
import CoreValues from './results/CoreValues';
import TabButton from './results/TabButton';
import SpotifyPlayer from './SpotifyPlayer';

export default function ResultsPage() {
  const { t } = useTranslation();
  const { personalityType } = useTestStore();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  const personalityData = personalityType ? getPersonalityData(personalityType) : null;

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const shareOnFacebook = () => {
    const url = window.location.href;
    const text = `I just discovered I'm a ${personalityType} (${personalityData?.title})! Take the test to find out your personality type:`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (!personalityData) return null;

  const tabs = [
    { id: 'overview', label: t('Overview'), icon: BookOpen },
    { id: 'relationships', label: t('Relationships'), icon: Heart },
    { id: 'careers', label: t('Careers'), icon: Briefcase },
    { id: 'values', label: t('Core Values'), icon: Star }
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={personalityData.imageUrl}
                  alt={`${personalityType} - ${personalityData.title}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-3xl font-bold text-gray-900">
                  {personalityType} - {personalityData.title}
                </h2>
                <p className="text-lg text-gray-600 mt-2">{personalityData.description}</p>
              </motion.div>
            </div>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  {...tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>

            <div className="mt-6">
              {activeTab === 'overview' && (
                <PersonalityOverview overview={personalityData.overview} />
              )}
              {activeTab === 'relationships' && (
                <RelationshipInsights relationships={personalityData.relationships} />
              )}
              {activeTab === 'careers' && (
                <CareerSuggestions careers={personalityData.careers} />
              )}
              {activeTab === 'values' && (
                <CoreValues values={personalityData.coreValues} />
              )}
            </div>

            <div className="mt-8 space-y-6">
              <SpotifyPlayer personalityType={personalityType} />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareOnFacebook}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#1664d4] transition-colors shadow-lg"
              >
                <Share2 className="w-5 h-5" />
                {t('Share Your Results')}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}