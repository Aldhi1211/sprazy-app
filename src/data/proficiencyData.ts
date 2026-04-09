// ── Types ─────────────────────────────────────────────────────────────────────

export interface VocabItem {
  word: string;
  definition: string;
}

export interface DialogueLine {
  side: 'left' | 'right';
  avatarLabel: string;
  speakerLabel: string;
  text: string;
}

export interface QuizQuestion {
  questionType: string;
  question: string;
  context?: { label: string; text: string; boldWords?: string[] };
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export interface ProficiencyLesson {
  id: number;
  title: string;
  subtitle: string;
  lessonTag: string;
  lessonTitle: string;
  vocabulary: VocabItem[];
  dialogue: DialogueLine[];
  tip: string;
  quiz: QuizQuestion[];
}

export interface ProficiencyCourse {
  id: string;
  categoryId: string;
  icon: string;
  title: string;
  level: string;
  isFree: boolean;
  duration: string;
  studentsCount: string;
  rating: number;
  badge?: 'New' | 'Hot';
  lessons: ProficiencyLesson[];
}

export interface ProficiencyCategory {
  id: string;
  icon: string;
  title: string;
  coursesCount: number;
  colorBg: string;
  colorBorder: string;
}

// ── Categories ────────────────────────────────────────────────────────────────

export const PROFICIENCY_CATEGORIES: ProficiencyCategory[] = [
  { id: 'interview',   icon: '💼', title: 'Interview',    coursesCount: 8, colorBg: '#edfaf2', colorBorder: '#b5e8ca' },
  { id: 'meeting',     icon: '🤝', title: 'Meeting',      coursesCount: 6, colorBg: '#fff8e6', colorBorder: '#fde68a' },
  { id: 'holiday',     icon: '✈️', title: 'Holiday',      coursesCount: 5, colorBg: '#eef3ff', colorBorder: '#c3d4ff' },
  { id: 'restaurant',  icon: '🍽️', title: 'Restaurant',   coursesCount: 4, colorBg: '#fff0f5', colorBorder: '#ffcde0' },
  { id: 'medical',     icon: '🏥', title: 'Medical',      coursesCount: 5, colorBg: '#f0fffe', colorBorder: '#b5e8e2' },
  { id: 'email',       icon: '📧', title: 'Email Writing', coursesCount: 7, colorBg: '#f5f0ff', colorBorder: '#d4c3ff' },
];

// ── Lesson content ────────────────────────────────────────────────────────────

const JOB_INTERVIEW_LESSONS: ProficiencyLesson[] = [
  {
    id: 1,
    title: 'Self Introduction',
    subtitle: 'Vocabulary + Dialogue',
    lessonTag: 'Vocabulary + Dialogue',
    lessonTitle: 'How to Introduce Yourself in an Interview',
    vocabulary: [
      { word: 'Background',    definition: 'Your education, experience, and career history' },
      { word: 'Strengths',     definition: 'Positive qualities or skills you bring to the role' },
      { word: 'Motivated',     definition: 'Feeling enthusiastic and driven to achieve goals' },
      { word: 'Relevant',      definition: 'Closely connected to the topic or job in question' },
    ],
    dialogue: [
      { side: 'left',  avatarLabel: 'INT', speakerLabel: 'Interviewer', text: '"Tell me a little bit about yourself."' },
      { side: 'right', avatarLabel: 'YOU', speakerLabel: 'You', text: '"I\'m a marketing professional with 5 years of experience. I specialize in digital campaigns and I\'m passionate about data-driven results."' },
    ],
    tip: 'Keep your introduction under 2 minutes. Focus on your professional background — not personal details.',
    quiz: [
      {
        questionType: 'Best Response',
        question: 'How should you start a self-introduction in an interview?',
        options: [
          'Talk about your hobbies and weekend plans',
          'Summarize your professional background and key strengths',
          'Ask the interviewer about their company first',
          'Apologize for being nervous',
        ],
        correctAnswer: 1,
        feedback: 'Always open with your professional summary — education, experience, and what makes you valuable.',
      },
      {
        questionType: 'Vocabulary',
        question: 'Which word best describes your positive qualities as a candidate?',
        options: ['Liability', 'Strengths', 'Weakness', 'Obstacle'],
        correctAnswer: 1,
        feedback: '"Strengths" refers to the positive skills and qualities you bring to the role.',
      },
      {
        questionType: 'Fill in the Blank',
        question: 'Complete the sentence: "I bring _____ experience in project management and team leadership."',
        options: ['irrelevant', 'personal', 'relevant', 'optional'],
        correctAnswer: 2,
        feedback: '"Relevant" means closely connected to what the job requires — always highlight relevant experience.',
      },
      {
        questionType: 'Situational Response',
        question: 'The interviewer says "Tell me about yourself." What should you avoid doing?',
        options: [
          'Mentioning your most recent job role',
          'Talking about your childhood and family history',
          'Highlighting your key skills',
          'Keeping it under 2 minutes',
        ],
        correctAnswer: 1,
        feedback: 'Avoid personal details like family or childhood. Keep it professional and focused on your career.',
      },
      {
        questionType: 'Best Response',
        question: 'Which closing line best ends a self-introduction?',
        options: [
          '"That\'s all I have to say."',
          '"I\'m very excited about this opportunity and believe my skills align well with this role."',
          '"I don\'t know what else to add."',
          '"Can we skip this question?"',
        ],
        correctAnswer: 1,
        feedback: 'End by connecting your skills to the role — it shows genuine interest and confidence.',
      },
    ],
  },
  {
    id: 2,
    title: 'Strengths & Weaknesses',
    subtitle: 'Phrases + Practice',
    lessonTag: 'Phrases + Practice',
    lessonTitle: 'Talking About Your Strengths & Weaknesses',
    vocabulary: [
      { word: 'Asset',           definition: 'A valuable quality or skill that benefits the team' },
      { word: 'Proficiency',     definition: 'A high degree of skill or expertise in something' },
      { word: 'Limitation',      definition: 'A weakness or area that needs improvement' },
      { word: 'Growth mindset',  definition: 'Belief that abilities can be developed through effort' },
    ],
    dialogue: [
      { side: 'left',  avatarLabel: 'INT', speakerLabel: 'Interviewer', text: '"What would you say is your greatest strength?"' },
      { side: 'right', avatarLabel: 'YOU', speakerLabel: 'You', text: '"My greatest strength is my ability to stay calm under pressure. In my last role, I managed three simultaneous projects and delivered all of them on schedule."' },
    ],
    tip: 'Match your strength to a requirement in the job description. It shows you did your homework!',
    quiz: [
      {
        questionType: 'Best Response',
        question: 'When asked about your greatest strength, what is the BEST approach?',
        options: [
          'Name a strength and back it up with a specific example',
          'Say you are perfect and have no weaknesses',
          'List as many strengths as possible',
          'Say "I\'m not sure, I\'m still learning"',
        ],
        correctAnswer: 0,
        feedback: 'Always pair your strength with a real example — it makes your answer credible and memorable.',
      },
      {
        questionType: 'Situational Response',
        question: 'The interviewer asks: "What is your greatest weakness?" Which answer is BEST?',
        context: {
          label: 'Context',
          text: 'You are interviewing for a Marketing Manager position.',
        },
        options: [
          '"I don\'t really have any weaknesses."',
          '"I used to struggle with public speaking, but I joined a course and now I present confidently."',
          '"I work too hard and I care too much."',
          '"I am sometimes late to submit reports."',
        ],
        correctAnswer: 1,
        feedback: 'Option B shows self-awareness AND proactive improvement — the ideal weakness answer!',
      },
      {
        questionType: 'Vocabulary',
        question: 'Which word means "a valuable quality that benefits the team"?',
        options: ['Liability', 'Asset', 'Deficit', 'Burden'],
        correctAnswer: 1,
        feedback: '"Asset" is used to describe a positive quality or resource that adds value.',
      },
      {
        questionType: 'Fill in the Blank',
        question: 'Complete: "I have a growth _____, so I actively seek feedback to improve."',
        options: ['fear', 'mindset', 'block', 'issue'],
        correctAnswer: 1,
        feedback: 'A "growth mindset" means you believe your skills can be developed — highly valued by employers.',
      },
      {
        questionType: 'Best Response',
        question: 'Which phrase is the MOST professional way to mention a weakness?',
        options: [
          '"I\'m terrible at everything technical."',
          '"One area I\'m actively developing is my data analysis skills — I\'ve been taking an online course."',
          '"My weakness is that I\'m too honest."',
          '"I have no limitations in my work."',
        ],
        correctAnswer: 1,
        feedback: 'Mention a real area for growth AND show that you are already addressing it.',
      },
    ],
  },
  {
    id: 3,
    title: 'Answering Tough Questions',
    subtitle: 'STAR Method + Quiz',
    lessonTag: 'Vocabulary + Dialogue',
    lessonTitle: 'Answering Tough Questions – The STAR Method',
    vocabulary: [
      { word: 'Situation', definition: 'Describe the context or background of the story' },
      { word: 'Task',      definition: 'Explain your responsibility in that situation' },
      { word: 'Action',    definition: 'What specific steps did you take?' },
      { word: 'Result',    definition: 'What was the outcome? Use numbers if possible' },
    ],
    dialogue: [
      { side: 'left',  avatarLabel: 'INT', speakerLabel: 'Interviewer', text: '"Tell me about a time you handled a difficult situation at work."' },
      { side: 'right', avatarLabel: 'YOU', speakerLabel: 'You', text: '"In my previous role, our team faced a tight deadline. I coordinated with 3 departments and we delivered on time — improving client satisfaction by 20%."' },
    ],
    tip: 'Pro tip: Always end with a measurable result. Numbers make your answer more convincing and memorable!',
    quiz: [
      {
        questionType: 'Conceptual',
        question: 'In the STAR method, what does the "A" stand for?',
        options: ['Achievement', 'Attitude', 'Action', 'Awareness'],
        correctAnswer: 2,
        feedback: '"A" stands for Action — the specific steps you took to handle the situation.',
      },
      {
        questionType: 'Situational Response',
        question: 'The interviewer asks: "What is your greatest weakness?" — Which answer uses the BEST strategy?',
        context: {
          label: 'Context',
          text: 'You are in a job interview for a Marketing Manager position. The interviewer wants to test your self-awareness and growth mindset.',
        },
        options: [
          '"I don\'t really have any weaknesses."',
          '"I used to struggle with public speaking, but I joined a course and now I present confidently."',
          '"I work too hard and I care too much about my job."',
          '"I am sometimes late to submit reports."',
        ],
        correctAnswer: 1,
        feedback: 'Excellent! Option B shows self-awareness + proactive improvement. This is the STAR approach applied to weakness questions!',
      },
      {
        questionType: 'Fill in the Blank',
        question: 'Complete the STAR answer: "The _____ was that our client satisfaction improved by 20%."',
        options: ['Situation', 'Task', 'Action', 'Result'],
        correctAnswer: 3,
        feedback: '"Result" is the final step — always quantify your outcome to make it more impactful.',
      },
      {
        questionType: 'Best Response',
        question: 'Which STAR answer is the most effective?',
        options: [
          '"I once helped my team finish a project."',
          '"When our system crashed before launch, I led a 6-person team to restore it in 4 hours, preventing $50k in lost revenue."',
          '"I always do my best in every situation."',
          '"My team and I worked hard and eventually it got done."',
        ],
        correctAnswer: 1,
        feedback: 'The best STAR answers include specific context, clear actions, and measurable results.',
      },
      {
        questionType: 'Vocabulary',
        question: 'In STAR, which element describes your role and responsibility in the situation?',
        options: ['Situation', 'Task', 'Action', 'Result'],
        correctAnswer: 1,
        feedback: '"Task" describes what YOUR responsibility was — distinguishing your role from the broader situation.',
      },
    ],
  },
  {
    id: 4,
    title: 'Salary Negotiation',
    subtitle: 'Dialogue + Role Play',
    lessonTag: 'Dialogue + Role Play',
    lessonTitle: 'Negotiating Your Salary with Confidence',
    vocabulary: [
      { word: 'Compensation', definition: 'Total pay including salary, bonuses, and benefits' },
      { word: 'Negotiate',    definition: 'Discuss terms to reach a mutually agreeable outcome' },
      { word: 'Counter-offer', definition: 'A response to an offer proposing different terms' },
      { word: 'Market rate',  definition: 'The typical salary paid for a role in the industry' },
    ],
    dialogue: [
      { side: 'left',  avatarLabel: 'INT', speakerLabel: 'Interviewer', text: '"What are your salary expectations for this role?"' },
      { side: 'right', avatarLabel: 'YOU', speakerLabel: 'You', text: '"Based on my research and experience, I\'m looking for a range of $75,000–$85,000. However, I\'m open to discussing the full compensation package."' },
    ],
    tip: 'Always research the market rate before negotiating. Give a range, not a single number — it shows flexibility.',
    quiz: [
      {
        questionType: 'Best Response',
        question: 'When asked "What is your salary expectation?", what is the BEST approach?',
        options: [
          'Say any number quickly to avoid awkward silence',
          'Research market rates and give a well-reasoned range',
          'Say "I\'ll accept whatever you offer"',
          'Refuse to discuss salary at this stage',
        ],
        correctAnswer: 1,
        feedback: 'Always research market rates beforehand. A range shows flexibility while anchoring the negotiation.',
      },
      {
        questionType: 'Vocabulary',
        question: 'What does "compensation package" include?',
        options: [
          'Only the base salary',
          'Just bonuses',
          'Salary, bonuses, benefits, and other perks',
          'Only health insurance',
        ],
        correctAnswer: 2,
        feedback: 'Compensation package covers everything: base pay, bonuses, health benefits, equity, and more.',
      },
      {
        questionType: 'Situational Response',
        question: 'The employer\'s offer is below your expectation. What should you say?',
        options: [
          '"That\'s fine, I\'ll take it."',
          '"That\'s insulting, I\'m leaving."',
          '"Thank you for the offer. Based on my experience, I was hoping for something closer to $80k. Is there flexibility?"',
          '"Can I have some time to decide?" (and never respond)',
        ],
        correctAnswer: 2,
        feedback: 'Be polite, specific, and leave room for discussion. Never accept immediately if it\'s below expectation.',
      },
      {
        questionType: 'Fill in the Blank',
        question: 'Complete: "I\'d like to make a _____ — instead of $70k, could we consider $78k?"',
        options: ['demand', 'complaint', 'counter-offer', 'resignation'],
        correctAnswer: 2,
        feedback: 'A "counter-offer" is a professional way to respond to an initial offer with your preferred terms.',
      },
      {
        questionType: 'Best Response',
        question: 'Which phrase BEST opens a salary negotiation?',
        options: [
          '"I need more money or I won\'t join."',
          '"I\'m flexible on everything."',
          '"Based on my research and the value I bring, I believe a range of X–Y is fair."',
          '"Whatever you decide is fine with me."',
        ],
        correctAnswer: 2,
        feedback: 'Reference your research and value — this makes your ask logical, not just personal.',
      },
    ],
  },
  {
    id: 5,
    title: 'Closing the Interview',
    subtitle: 'Phrases + Quiz',
    lessonTag: 'Phrases + Quiz',
    lessonTitle: 'How to Close an Interview Professionally',
    vocabulary: [
      { word: 'Follow up',    definition: 'Contact someone after an initial meeting or event' },
      { word: 'Timeline',     definition: 'A schedule of when decisions or actions will happen' },
      { word: 'Appreciation', definition: 'Recognition and gratitude for someone\'s time or effort' },
      { word: 'Enthusiasm',   definition: 'Strong interest and excitement about an opportunity' },
    ],
    dialogue: [
      { side: 'left',  avatarLabel: 'INT', speakerLabel: 'Interviewer', text: '"Do you have any questions for us?"' },
      { side: 'right', avatarLabel: 'YOU', speakerLabel: 'You', text: '"Yes — what does success look like in this role during the first 90 days? Also, what are the next steps in your hiring process?"' },
    ],
    tip: 'Always prepare 2–3 questions. Asking nothing signals low interest. Avoid asking about salary at this stage.',
    quiz: [
      {
        questionType: 'Best Response',
        question: 'When the interviewer says "Any questions?", what should you do?',
        options: [
          'Say "No, I think you\'ve covered everything"',
          'Ask thoughtful questions about the role and next steps',
          'Ask how much vacation time you\'ll get',
          'Ask when you\'ll hear back and then immediately leave',
        ],
        correctAnswer: 1,
        feedback: 'Asking thoughtful questions demonstrates genuine interest and preparation.',
      },
      {
        questionType: 'Vocabulary',
        question: 'Which word means "contacting someone after the interview to express continued interest"?',
        options: ['Ghosting', 'Follow up', 'Withdraw', 'Disconnect'],
        correctAnswer: 1,
        feedback: '"Follow up" is a professional courtesy — send a thank-you email within 24 hours.',
      },
      {
        questionType: 'Situational Response',
        question: 'How should you close the interview before leaving?',
        options: [
          'Just say "Bye" and walk out',
          'Thank the interviewer, restate your interest, and ask about next steps',
          'Ask if you got the job immediately',
          'Say you\'ll think about whether you want the role',
        ],
        correctAnswer: 1,
        feedback: 'A strong close: thank them, reinforce your enthusiasm, and clarify the hiring timeline.',
      },
      {
        questionType: 'Fill in the Blank',
        question: 'Complete: "Thank you for your time. I\'m very _____ about this opportunity."',
        options: ['nervous', 'confused', 'enthusiastic', 'unsure'],
        correctAnswer: 2,
        feedback: '"Enthusiastic" expresses positive energy — it leaves a lasting good impression.',
      },
      {
        questionType: 'Best Response',
        question: 'Which question is BEST to ask the interviewer at the end?',
        options: [
          '"When is payday?"',
          '"Can I work from home every day?"',
          '"What qualities does your most successful employee in this role demonstrate?"',
          '"How many people got fired last year?"',
        ],
        correctAnswer: 2,
        feedback: 'This question shows strategic thinking and genuine interest in excelling in the role.',
      },
    ],
  },
  { id: 6,  title: 'Follow-up Email Writing', subtitle: 'Writing + Template', lessonTag: 'Writing + Template', lessonTitle: 'Writing a Professional Follow-up Email', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 7,  title: 'Body Language & Confidence', subtitle: 'Tips + Practice', lessonTag: 'Tips + Practice', lessonTitle: 'Communicating Confidence Non-Verbally', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 8,  title: 'Remote Interview Tips', subtitle: 'Video Call Etiquette', lessonTag: 'Video Call Etiquette', lessonTitle: 'Acing Your Video Interview', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 9,  title: 'Cultural Fit Questions', subtitle: 'Values + Teamwork', lessonTag: 'Values + Teamwork', lessonTitle: 'Answering Culture Fit Questions', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 10, title: 'Case Study Interviews', subtitle: 'Problem Solving', lessonTag: 'Problem Solving', lessonTitle: 'Structuring Your Case Study Answer', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 11, title: 'Leadership Questions', subtitle: 'Management Style', lessonTag: 'Management Style', lessonTitle: 'Demonstrating Leadership in Answers', vocabulary: [], dialogue: [], tip: '', quiz: [] },
  { id: 12, title: 'Mock Interview Practice', subtitle: 'Full Simulation', lessonTag: 'Full Simulation', lessonTitle: 'Complete Mock Interview Walkthrough', vocabulary: [], dialogue: [], tip: '', quiz: [] },
];

// ── Courses ───────────────────────────────────────────────────────────────────

export const PROFICIENCY_COURSES: ProficiencyCourse[] = [
  // ── Interview ──
  {
    id: 'interview-mastery',
    categoryId: 'interview',
    icon: '💼',
    title: 'Job Interview Mastery',
    level: 'B1–B2',
    isFree: true,
    duration: '90m',
    studentsCount: '2.4k',
    rating: 4.8,
    badge: 'Hot',
    lessons: JOB_INTERVIEW_LESSONS,
  },
  {
    id: 'common-interview-questions',
    categoryId: 'interview',
    icon: '💬',
    title: 'Common Interview Questions',
    level: 'A2–B1',
    isFree: true,
    duration: '75m',
    studentsCount: '1.9k',
    rating: 4.7,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Practice',
      lessonTag: 'Phrases + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'technical-interview-english',
    categoryId: 'interview',
    icon: '💻',
    title: 'Technical Interview English',
    level: 'B2',
    isFree: false,
    duration: '60m',
    studentsCount: '980',
    rating: 4.6,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Practice',
      lessonTag: 'Vocabulary + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'hr-behavioral-questions',
    categoryId: 'interview',
    icon: '🤔',
    title: 'HR & Behavioral Questions',
    level: 'B1',
    isFree: true,
    duration: '70m',
    studentsCount: '1.2k',
    rating: 4.5,
    lessons: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Situational + Practice',
      lessonTag: 'Situational + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'interview-vocabulary',
    categoryId: 'interview',
    icon: '📚',
    title: 'Interview Vocabulary',
    level: 'A2–B2',
    isFree: true,
    duration: '90m',
    studentsCount: '2.4k',
    rating: 4.9,
    badge: 'Hot',
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Flashcards',
      lessonTag: 'Vocabulary + Flashcards', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'executive-interview',
    categoryId: 'interview',
    icon: '🏆',
    title: 'Executive-Level Interviews',
    level: 'C1',
    isFree: false,
    duration: '80m',
    studentsCount: '540',
    rating: 4.8,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Advanced Strategy',
      lessonTag: 'Advanced Strategy', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'interview-follow-up',
    categoryId: 'interview',
    icon: '✉️',
    title: 'Interview Follow-up Emails',
    level: 'B1',
    isFree: true,
    duration: '40m',
    studentsCount: '760',
    rating: 4.4,
    badge: 'New',
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Email Writing',
      lessonTag: 'Email Writing', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'phone-interview',
    categoryId: 'interview',
    icon: '📞',
    title: 'Phone & Video Interviews',
    level: 'B1',
    isFree: true,
    duration: '50m',
    studentsCount: '890',
    rating: 4.6,
    lessons: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Tips',
      lessonTag: 'Phrases + Tips', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },

  // ── Meeting ──
  {
    id: 'opening-closing-meeting',
    categoryId: 'meeting',
    icon: '🤝',
    title: 'Opening & Closing a Meeting',
    level: 'B1',
    isFree: true,
    duration: '60m',
    studentsCount: '1.1k',
    rating: 4.6,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Dialogue',
      lessonTag: 'Phrases + Dialogue', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'giving-opinions',
    categoryId: 'meeting',
    icon: '💡',
    title: 'Giving Opinions Professionally',
    level: 'B1–B2',
    isFree: true,
    duration: '55m',
    studentsCount: '980',
    rating: 4.5,
    lessons: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Practice',
      lessonTag: 'Phrases + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'handling-disagreements',
    categoryId: 'meeting',
    icon: '🕊️',
    title: 'Handling Disagreements',
    level: 'B2',
    isFree: false,
    duration: '45m',
    studentsCount: '720',
    rating: 4.7,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Dialogue + Role Play',
      lessonTag: 'Dialogue + Role Play', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'online-meeting-etiquette',
    categoryId: 'meeting',
    icon: '💻',
    title: 'Online Meeting Etiquette',
    level: 'A2–B1',
    isFree: true,
    duration: '40m',
    studentsCount: '1.5k',
    rating: 4.4,
    badge: 'New',
    lessons: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Tips + Phrases',
      lessonTag: 'Tips + Phrases', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'business-meeting-phrases',
    categoryId: 'meeting',
    icon: '📋',
    title: 'Business Meeting Phrases',
    level: 'B1',
    isFree: true,
    duration: '75m',
    studentsCount: '1.8k',
    rating: 4.8,
    badge: 'New',
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Practice',
      lessonTag: 'Vocabulary + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'chairing-meetings',
    categoryId: 'meeting',
    icon: '👔',
    title: 'Chairing & Facilitating Meetings',
    level: 'B2',
    isFree: false,
    duration: '60m',
    studentsCount: '440',
    rating: 4.6,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Advanced Facilitation',
      lessonTag: 'Advanced Facilitation', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },

  // ── Holiday / Travel ──
  {
    id: 'airport-immigration',
    categoryId: 'holiday',
    icon: '✈️',
    title: 'Airport & Immigration',
    level: 'A2–B1',
    isFree: true,
    duration: '60m',
    studentsCount: '2.2k',
    rating: 4.7,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Dialogue',
      lessonTag: 'Vocabulary + Dialogue', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'hotel-check-in',
    categoryId: 'holiday',
    icon: '🏨',
    title: 'Hotel Check-in / Check-out',
    level: 'A2',
    isFree: true,
    duration: '45m',
    studentsCount: '1.6k',
    rating: 4.5,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Dialogue',
      lessonTag: 'Phrases + Dialogue', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'asking-directions',
    categoryId: 'holiday',
    icon: '🗺️',
    title: 'Asking for Directions',
    level: 'A1–A2',
    isFree: true,
    duration: '35m',
    studentsCount: '3.1k',
    rating: 4.8,
    badge: 'Hot',
    lessons: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Practice',
      lessonTag: 'Phrases + Practice', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'shopping-abroad',
    categoryId: 'holiday',
    icon: '🛍️',
    title: 'Shopping Abroad',
    level: 'A2',
    isFree: true,
    duration: '45m',
    studentsCount: '1.4k',
    rating: 4.4,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Bargaining + Vocab',
      lessonTag: 'Bargaining + Vocab', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'travel-english-survival',
    categoryId: 'holiday',
    icon: '🌍',
    title: 'Travel English Survival',
    level: 'A2–B1',
    isFree: true,
    duration: '70m',
    studentsCount: '3.1k',
    rating: 4.9,
    badge: 'Hot',
    lessons: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Essential Phrases',
      lessonTag: 'Essential Phrases', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },

  // ── Restaurant ──
  {
    id: 'ordering-food',
    categoryId: 'restaurant',
    icon: '🍽️',
    title: 'Ordering Food & Drinks',
    level: 'A1–A2',
    isFree: true,
    duration: '50m',
    studentsCount: '2.8k',
    rating: 4.7,
    badge: 'Hot',
    lessons: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Dialogue',
      lessonTag: 'Vocabulary + Dialogue', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'making-reservations',
    categoryId: 'restaurant',
    icon: '📞',
    title: 'Making Reservations',
    level: 'A2',
    isFree: true,
    duration: '35m',
    studentsCount: '1.1k',
    rating: 4.5,
    lessons: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phone + Online Phrases',
      lessonTag: 'Phone + Online Phrases', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'complaining-politely',
    categoryId: 'restaurant',
    icon: '😟',
    title: 'Complaining Politely',
    level: 'B1',
    isFree: true,
    duration: '30m',
    studentsCount: '870',
    rating: 4.4,
    lessons: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Polite Phrases',
      lessonTag: 'Polite Phrases', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'tipping-paying',
    categoryId: 'restaurant',
    icon: '💳',
    title: 'Tipping & Paying the Bill',
    level: 'A2',
    isFree: true,
    duration: '30m',
    studentsCount: '650',
    rating: 4.3,
    lessons: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Culture',
      lessonTag: 'Phrases + Culture', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },

  // ── Medical ──
  {
    id: 'doctor-consultation',
    categoryId: 'medical',
    icon: '👨‍⚕️',
    title: 'Doctor Consultation',
    level: 'B1',
    isFree: true,
    duration: '60m',
    studentsCount: '1.4k',
    rating: 4.7,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Symptoms + Vocab',
      lessonTag: 'Symptoms + Vocab', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'at-the-pharmacy',
    categoryId: 'medical',
    icon: '💊',
    title: 'At the Pharmacy',
    level: 'A2–B1',
    isFree: true,
    duration: '35m',
    studentsCount: '900',
    rating: 4.5,
    badge: 'New',
    lessons: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Medicine + Instructions',
      lessonTag: 'Medicine + Instructions', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'emergency-situations',
    categoryId: 'medical',
    icon: '🚑',
    title: 'Emergency Situations',
    level: 'B1',
    isFree: true,
    duration: '45m',
    studentsCount: '1.1k',
    rating: 4.8,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Emergency Vocab',
      lessonTag: 'Emergency Vocab', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'mental-health-english',
    categoryId: 'medical',
    icon: '🧠',
    title: 'Mental Health English',
    level: 'B1–B2',
    isFree: false,
    duration: '50m',
    studentsCount: '560',
    rating: 4.6,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Vocabulary + Phrases',
      lessonTag: 'Vocabulary + Phrases', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'insurance-medical',
    categoryId: 'medical',
    icon: '📋',
    title: 'Medical Insurance & Forms',
    level: 'B1',
    isFree: false,
    duration: '40m',
    studentsCount: '380',
    rating: 4.4,
    lessons: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Forms + Vocabulary',
      lessonTag: 'Forms + Vocabulary', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },

  // ── Email Writing ──
  {
    id: 'formal-email-structure',
    categoryId: 'email',
    icon: '📧',
    title: 'Formal Email Structure',
    level: 'B1',
    isFree: true,
    duration: '60m',
    studentsCount: '2.1k',
    rating: 4.7,
    badge: 'Hot',
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Structure + Templates',
      lessonTag: 'Structure + Templates', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'making-requests-email',
    categoryId: 'email',
    icon: '🙏',
    title: 'Making Requests by Email',
    level: 'B1',
    isFree: true,
    duration: '45m',
    studentsCount: '1.3k',
    rating: 4.5,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Phrases + Follow-ups',
      lessonTag: 'Phrases + Follow-ups', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'complaint-apology-email',
    categoryId: 'email',
    icon: '😔',
    title: 'Complaint & Apology Email',
    level: 'B1–B2',
    isFree: true,
    duration: '55m',
    studentsCount: '980',
    rating: 4.6,
    lessons: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Professional Tone',
      lessonTag: 'Professional Tone', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'job-application-letter',
    categoryId: 'email',
    icon: '📝',
    title: 'Job Application Letter',
    level: 'B1–B2',
    isFree: false,
    duration: '65m',
    studentsCount: '1.7k',
    rating: 4.8,
    badge: 'Hot',
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Cover Letter + Tips',
      lessonTag: 'Cover Letter + Tips', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'email-etiquette',
    categoryId: 'email',
    icon: '✅',
    title: 'Email Etiquette & Tone',
    level: 'B1',
    isFree: true,
    duration: '40m',
    studentsCount: '1.0k',
    rating: 4.4,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Tone + Formality',
      lessonTag: 'Tone + Formality', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'meeting-summary-email',
    categoryId: 'email',
    icon: '📋',
    title: 'Meeting Summary & Minutes',
    level: 'B2',
    isFree: false,
    duration: '50m',
    studentsCount: '580',
    rating: 4.6,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Writing + Format',
      lessonTag: 'Writing + Format', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
  {
    id: 'newsletter-promo-email',
    categoryId: 'email',
    icon: '📢',
    title: 'Newsletter & Promo Emails',
    level: 'B2',
    isFree: false,
    duration: '55m',
    studentsCount: '420',
    rating: 4.5,
    lessons: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1, title: `Lesson ${i + 1}`, subtitle: 'Marketing Language',
      lessonTag: 'Marketing Language', lessonTitle: `Lesson ${i + 1}`,
      vocabulary: [], dialogue: [], tip: '', quiz: [],
    })),
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export const getCoursesByCategory = (categoryId: string): ProficiencyCourse[] =>
  PROFICIENCY_COURSES.filter(c => c.categoryId === categoryId);

export const getCourseById = (id: string): ProficiencyCourse | undefined =>
  PROFICIENCY_COURSES.find(c => c.id === id);

export const getPopularCourses = (): ProficiencyCourse[] =>
  PROFICIENCY_COURSES.filter(c => c.badge === 'Hot' || c.badge === 'New').slice(0, 3);

export const getFeaturedCourse = (): ProficiencyCourse =>
  PROFICIENCY_COURSES.find(c => c.id === 'interview-mastery')!;
