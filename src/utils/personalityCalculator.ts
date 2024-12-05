import { questions } from '../data/questions';

interface Traits {
  [key: string]: number;
}

export function calculatePersonalityType(answers: (number | null)[]): {
  personalityType: string;
  traits: Traits;
} {
  // Initialize trait scores
  const scores = {
    E: 0, I: 0,  // Extraversion vs Introversion
    S: 0, N: 0,  // Sensing vs Intuition
    T: 0, F: 0,  // Thinking vs Feeling
    J: 0, P: 0   // Judging vs Perceiving
  };

  // Weight for each question (can be adjusted based on importance)
  const weights = {
    EI: 2.5,  // Questions about social interaction
    SN: 2.0,  // Questions about information processing
    TF: 2.0,  // Questions about decision making
    JP: 2.0   // Questions about lifestyle
  };

  // Process each answer with weighted scoring
  answers.forEach((answer, index) => {
    if (answer === null) return;
    
    const question = questions[index];
    if (!question) return;

    const value = answer * weights[question.trait as keyof typeof weights];
    
    switch (question.trait) {
      case 'EI':
        value > 0 ? scores.E += Math.abs(value) : scores.I += Math.abs(value);
        break;
      case 'SN':
        value > 0 ? scores.S += Math.abs(value) : scores.N += Math.abs(value);
        break;
      case 'TF':
        value > 0 ? scores.T += Math.abs(value) : scores.F += Math.abs(value);
        break;
      case 'JP':
        value > 0 ? scores.J += Math.abs(value) : scores.P += Math.abs(value);
        break;
    }
  });

  // Calculate percentages and determine type
  const total = {
    EI: scores.E + scores.I,
    SN: scores.S + scores.N,
    TF: scores.T + scores.F,
    JP: scores.J + scores.P
  };

  const type = [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');

  const traits = {
    Extraversion: Math.round((scores.E / (scores.E + scores.I)) * 100) || 50,
    Sensing: Math.round((scores.S / (scores.S + scores.N)) * 100) || 50,
    Thinking: Math.round((scores.T / (scores.T + scores.F)) * 100) || 50,
    Judging: Math.round((scores.J / (scores.J + scores.P)) * 100) || 50
  };

  return {
    personalityType: type,
    traits
  };
}