import React from 'react';
import { BookOpen } from 'lucide-react';

interface PersonalityOverviewProps {
  overview: {
    strengths: string[];
    weaknesses: string[];
    workStyle: string;
    communicationStyle: string;
  };
}

export default function PersonalityOverview({ overview }: PersonalityOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3 className="text-2xl font-bold mb-4">Strengths</h3>
        <ul className="list-disc pl-5">
          {overview.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mt-6 mb-4">Areas for Growth</h3>
        <ul className="list-disc pl-5">
          {overview.weaknesses.map((weakness) => (
            <li key={weakness}>{weakness}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mt-6 mb-4">Work Style</h3>
        <p>{overview.workStyle}</p>

        <h3 className="text-2xl font-bold mt-6 mb-4">Communication Style</h3>
        <p>{overview.communicationStyle}</p>
      </div>
    </div>
  );
}