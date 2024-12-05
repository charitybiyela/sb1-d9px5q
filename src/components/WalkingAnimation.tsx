import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface WalkingAnimationProps {
  progress: number;
}

const WalkingAnimation: React.FC<WalkingAnimationProps> = ({ progress }) => {
  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        initial={{ x: 0 }}
        animate={{ x: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{ x: `-50%` }}
      >
        <User className="w-6 h-6 text-indigo-600" />
      </motion.div>
    </div>
  );
};

export default WalkingAnimation;