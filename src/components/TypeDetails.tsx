import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Briefcase, Heart, Star } from 'lucide-react';
import { getPersonalityData, getCelebrities } from '../utils/personalityData';

const TypeDetails: React.FC = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const type = typeId?.toUpperCase() || '';
  const data = getPersonalityData(type);
  const celebrities = getCelebrities(type);

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Type not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <img
          src={data.imageUrl}
          alt={`${type} - ${data.title}`}
          className="w-full h-64 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {type} - {data.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{data.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-indigo-600" />
                Famous {type}s
              </h2>
              <ul className="space-y-2">
                {celebrities.map((celebrity) => (
                  <li key={celebrity} className="text-gray-700">{celebrity}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                Career Paths
              </h2>
              <ul className="space-y-2">
                {data.careers.map((career) => (
                  <li key={career} className="text-gray-700">{career}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-indigo-600" />
              Relationships
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Strengths</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.relationships.strengths.map((strength) => (
                    <li key={strength} className="text-gray-700">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Best Matches</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.relationships.bestMatches.map((match) => (
                    <li key={match} className="text-gray-700">{match}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-indigo-600" />
              Core Values
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.coreValues.map((value) => (
                <span
                  key={value}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TypeDetails;