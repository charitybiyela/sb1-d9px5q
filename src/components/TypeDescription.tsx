import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface TypeDescriptionProps {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
}

const TypeDescription: React.FC<TypeDescriptionProps> = ({
  type,
  title,
  description,
  imageUrl
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={`${type} - ${title}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {type} - {title}
        </h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={`/type/${type.toLowerCase()}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          Learn more about {type}
          <ExternalLink className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default TypeDescription;