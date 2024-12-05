import React from 'react';
import { motion } from 'framer-motion';
import { X, Facebook, Twitter, Link2, Share2 } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
  personalityType: string;
}

export default function ShareModal({ onClose, personalityType }: ShareModalProps) {
  const shareUrl = window.location.href;
  const shareText = `I just discovered I'm a ${personalityType} personality type!`;

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Share',
      icon: Share2,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6">Share Your Results</h3>

        <div className="space-y-4">
          {shareButtons.map((button) => (
            <a
              key={button.name}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition-colors ${button.color}`}
            >
              <button.icon className="w-5 h-5" />
              Share on {button.name}
            </a>
          ))}

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Link2 className="w-5 h-5" />
            Copy Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}