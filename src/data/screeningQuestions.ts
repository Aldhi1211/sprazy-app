export type QuestionType = 'grammar' | 'vocabulary' | 'reading' | 'listening';

export interface Question {
  id: number;
  type: QuestionType;
  level: string;
  passage?: string;      // untuk reading
  audioText?: string;    // teks audio (simulasi listening)
  audioDuration?: string;
  question: string;
  options: string[];
  correctIndex: number;  // 0-based index jawaban benar
}

export const READING_PASSAGE =
  'Sarah has been learning English for three years. She can understand most ' +
  'movies without subtitles, but she still struggles with academic writing. ' +
  'Her goal is to take the IELTS exam next year.';

export const SCREENING_QUESTIONS: Question[] = [
  // ─── GRAMMAR (7 soal) ────────────────────────────────────────────────────
  {
    id: 1,
    type: 'grammar',
    level: 'A1',
    question: '"___ she a student?"',
    options: ['Is', 'Are', 'Am', 'Be'],
    correctIndex: 0,
  },
  {
    id: 2,
    type: 'grammar',
    level: 'A2',
    question: '"I ___ to the market yesterday."',
    options: ['go', 'goes', 'went', 'gone'],
    correctIndex: 2,
  },
  {
    id: 3,
    type: 'grammar',
    level: 'A2',
    question: '"She doesn\'t like spicy food." — Which is correct?',
    options: [
      "She don't like...",
      "She doesn't like...",
      "She isn't like...",
      "She not like...",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    type: 'grammar',
    level: 'B1',
    question: '"If I ___ more time, I would study harder."',
    options: ['have', 'had', 'will have', 'would have'],
    correctIndex: 1,
  },
  {
    id: 5,
    type: 'grammar',
    level: 'B1',
    question: '"The report ___ by the manager before 5 PM."',
    options: ['submit', 'submitted', 'must submitted', 'must be submitted'],
    correctIndex: 3,
  },
  {
    id: 6,
    type: 'grammar',
    level: 'B2',
    question: '"By the time she arrived, the meeting ___."',
    options: [
      'already ended',
      'has already ended',
      'had already ended',
      'already had ended',
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    type: 'grammar',
    level: 'B2',
    question: '"___ he known the truth, he wouldn\'t have lied."',
    options: ['If', 'When', 'Had', 'Should'],
    correctIndex: 2,
  },

  // ─── VOCABULARY (6 soal) ─────────────────────────────────────────────────
  {
    id: 8,
    type: 'vocabulary',
    level: 'A1',
    question: 'What does "big" mean?',
    options: ['Kecil', 'Besar', 'Cepat', 'Jauh'],
    correctIndex: 1,
  },
  {
    id: 9,
    type: 'vocabulary',
    level: 'A2',
    question: 'Choose the synonym of "happy":',
    options: ['Angry', 'Sad', 'Joyful', 'Tired'],
    correctIndex: 2,
  },
  {
    id: 10,
    type: 'vocabulary',
    level: 'A2',
    question: '"She is very ___. She always helps others."',
    options: ['rude', 'generous', 'selfish', 'boring'],
    correctIndex: 1,
  },
  {
    id: 11,
    type: 'vocabulary',
    level: 'B1',
    question: '"The new policy will ___ the company\'s profits."',
    options: ['expand', 'enhance', 'extend', 'exceed'],
    correctIndex: 1,
  },
  {
    id: 12,
    type: 'vocabulary',
    level: 'B1',
    question: 'What does "ambiguous" mean?',
    options: ['Jelas', 'Tidak pasti', 'Berbahaya', 'Penting'],
    correctIndex: 1,
  },
  {
    id: 13,
    type: 'vocabulary',
    level: 'B2',
    question: '"Despite his ___ attitude, his team respected him."',
    options: ['condescending', 'enthusiastic', 'supportive', 'humble'],
    correctIndex: 0,
  },

  // ─── READING (4 soal) ────────────────────────────────────────────────────
  {
    id: 14,
    type: 'reading',
    level: 'A2',
    passage: READING_PASSAGE,
    question: 'How long has Sarah been learning English?',
    options: ['One year', 'Two years', 'Three years', 'Four years'],
    correctIndex: 2,
  },
  {
    id: 15,
    type: 'reading',
    level: 'B1',
    passage: READING_PASSAGE,
    question: "What is Sarah's main weakness?",
    options: ['Speaking', 'Listening', 'Academic writing', 'Reading'],
    correctIndex: 2,
  },
  {
    id: 16,
    type: 'reading',
    level: 'B1',
    passage: READING_PASSAGE,
    question: "What can we infer about Sarah's future plan?",
    options: [
      'She wants to travel',
      'She wants to take an exam',
      'She wants to become a teacher',
      'She wants to watch movies',
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    type: 'reading',
    level: 'B2',
    passage: READING_PASSAGE,
    question:
      'The word "struggles" in the passage is closest in meaning to:',
    options: [
      'enjoys',
      'finds easy',
      'has difficulty with',
      'avoids',
    ],
    correctIndex: 2,
  },

  // ─── LISTENING (3 soal) ──────────────────────────────────────────────────
  {
    id: 18,
    type: 'listening',
    level: 'A2',
    audioText: '"The train departs at half past eight in the morning."',
    audioDuration: '0:05',
    question: 'When does the train depart?',
    options: ['7:30', '8:00', '8:30', '9:30'],
    correctIndex: 2,
  },
  {
    id: 19,
    type: 'listening',
    level: 'B1',
    audioText:
      '"Hi, I just got a call from the client — they need to push the meeting to next week. Can we reschedule it for Thursday?"',
    audioDuration: '0:12',
    question: 'Why is the meeting being rescheduled?',
    options: [
      'The manager is sick',
      'The client requested it',
      'The room is already booked',
      "It's a public holiday",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    type: 'listening',
    level: 'B2',
    audioText:
      '"Scientists warn that without immediate government intervention, global temperatures could rise by 2°C within the next decade, causing irreversible damage to ecosystems worldwide."',
    audioDuration: '0:18',
    question: "What is the speaker's main argument?",
    options: [
      'Governments must act now',
      'Technology will solve everything',
      "Citizens don't care",
      'The economy is more important',
    ],
    correctIndex: 0,
  },
];

// ─── Scoring ─────────────────────────────────────────────────────────────────
export interface LevelResult {
  level: string;
  label: string;
  emoji: string;
  description: string;
}

export const calculateLevel = (answers: number[]): { score: number; result: LevelResult } => {
  let score = 0;
  answers.forEach((ans, idx) => {
    if (ans === SCREENING_QUESTIONS[idx].correctIndex) score++;
  });

  let result: LevelResult;
  if (score <= 5) {
    result = { level: 'A1', label: 'Beginner', emoji: '🌱', description: 'You are just starting your English journey!' };
  } else if (score <= 10) {
    result = { level: 'A2', label: 'Elementary', emoji: '📖', description: 'You know the basics and are building your skills.' };
  } else if (score <= 14) {
    result = { level: 'B1', label: 'Intermediate', emoji: '🚀', description: 'You have solid everyday English skills!' };
  } else if (score <= 17) {
    result = { level: 'B2', label: 'Upper Intermediate', emoji: '⭐', description: 'You communicate confidently in most situations.' };
  } else {
    result = { level: 'C1', label: 'Advanced', emoji: '🏆', description: 'You have near-native proficiency in English!' };
  }

  return { score, result };
};

// Hitung score per section
export const calculateSectionScores = (answers: number[]) => {
  const sections = [
    { name: 'Grammar', start: 0, end: 7 },
    { name: 'Vocabulary', start: 7, end: 13 },
    { name: 'Reading', start: 13, end: 17 },
    { name: 'Listening', start: 17, end: 20 },
  ];

  return sections.map(s => {
    const total = s.end - s.start;
    let correct = 0;
    for (let i = s.start; i < s.end; i++) {
      if (answers[i] === SCREENING_QUESTIONS[i].correctIndex) correct++;
    }
    return { name: s.name, correct, total, pct: Math.round((correct / total) * 100) };
  });
};
