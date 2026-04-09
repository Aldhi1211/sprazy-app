export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  fillSentence?: string;
  fillAnswer?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  formulaLabel: string;
  formula: string;
  theoryBody: string;
  examples: string[];
  tip: string;
}

export interface Chapter {
  id: number;
  title: string;
  icon: string;
  iconBg: string;
  estimatedTime: string;
  lessons: Lesson[];
  questions: Question[];
}

export const INTERMEDIATE_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Present Tenses',
    icon: '📖',
    iconBg: '#d4f5e0',
    estimatedTime: '60 min',
    lessons: [
      {
        id: 'c1l1',
        title: 'Simple Present: Habits & Routines',
        icon: '🕐',
        formulaLabel: 'Formula',
        formula: 'Subject + V1 (add -s/-es for he/she/it)',
        theoryBody:
          'The Simple Present describes habits, routines, and general facts. For third-person singular (he/she/it), add -s or -es to the base verb.',
        examples: [
          'She goes to the gym every morning.',
          'He works at a hospital.',
          'The sun rises in the east.',
        ],
        tip: 'Key words: always, usually, often, sometimes, never, every day/week/month.',
      },
      {
        id: 'c1l2',
        title: 'Present Continuous: Right Now',
        icon: '▶️',
        formulaLabel: 'Formula',
        formula: 'Subject + am/is/are + V-ing',
        theoryBody:
          'Use Present Continuous for actions happening at this moment or around the current time. It shows something is in progress right now.',
        examples: [
          'Right now, they are having a meeting.',
          'She is reading a book at the moment.',
          'I am studying for my exam this week.',
        ],
        tip: 'Key words: now, right now, at the moment, currently, today, this week.',
      },
      {
        id: 'c1l3',
        title: 'Present Perfect: Experiences',
        icon: '⭐',
        formulaLabel: 'Formula',
        formula: 'Subject + have/has + past participle',
        theoryBody:
          'The Present Perfect connects the past to the present. Use it for experiences, achievements, or actions whose results affect the present. The exact time is not important.',
        examples: [
          'I have lived in this city since I was born.',
          'She has visited Paris three times.',
          'They have never seen snow.',
        ],
        tip: 'Key words: ever, never, already, just, yet, for, since.',
      },
      {
        id: 'c1l4',
        title: 'Present Perfect Negative: Yet',
        icon: '❌',
        formulaLabel: 'Formula',
        formula: "Subject + haven't/hasn't + past participle",
        theoryBody:
          'Make the Present Perfect negative with "haven\'t" or "hasn\'t." Use "yet" at the end to mean something expected hasn\'t happened up to now.',
        examples: [
          "He hasn't finished his homework yet.",
          "I haven't seen that movie.",
          "They haven't arrived yet.",
        ],
        tip: '"Yet" goes at the END of negative sentences and questions.',
      },
      {
        id: 'c1l5',
        title: 'Present Perfect Continuous',
        icon: '⏳',
        formulaLabel: 'Formula',
        formula: 'Subject + have/has + been + V-ing',
        theoryBody:
          'Shows an ongoing action that started in the past and is still continuing or just stopped. It emphasizes the duration and continuity of the activity.',
        examples: [
          'They have been working in this office for three hours.',
          'I have been studying English since 2020.',
          'She has been waiting for over an hour.',
        ],
        tip: 'Use "for" + duration (for 3 hours) and "since" + starting point (since 9 AM).',
      },
      {
        id: 'c1l6',
        title: 'Stative Verbs: No -ing!',
        icon: '🚫',
        formulaLabel: 'Rule',
        formula: 'Stative verbs are NEVER used in continuous tenses',
        theoryBody:
          'Stative verbs describe states of mind, senses, or possession — NOT actions. They cannot be used in continuous forms. Common stative verbs: know, believe, want, need, love, hate, see, hear, think (opinion), have (possess).',
        examples: [
          'He believes in ghosts. ✓ (NOT "is believing")',
          'I know the answer. ✓ (NOT "am knowing")',
          'She wants more coffee. ✓ (NOT "is wanting")',
        ],
        tip: 'Think: is this a state (emotion, thought, possession) or an action? States → no -ing.',
      },
      {
        id: 'c1l7',
        title: 'Present Perfect: Already & Just',
        icon: '✅',
        formulaLabel: 'Usage',
        formula: 'have/has + already/just + past participle',
        theoryBody:
          '"Already" means before now or earlier than expected. "Just" means a very short time ago. Both go between have/has and the past participle.',
        examples: [
          "We've already watched that film.",
          "I've just finished my homework.",
          "She has already left the office.",
        ],
        tip: '"Already" = sooner than expected. "Just" = very recently (a few minutes ago).',
      },
      {
        id: 'c1l8',
        title: 'Have You Ever...? Questions',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Have/Has + subject + ever + past participle?',
        theoryBody:
          'Use "Have you ever...?" to ask about life experiences. "Ever" means "at any time in your life." Answer with: Yes, I have / No, I haven\'t.',
        examples: [
          'Have you ever eaten sushi?',
          'Has she ever been to London?',
          'Have they ever seen a shooting star?',
        ],
        tip: 'In answers, never use "ever" — use "before" instead: "Yes, I have eaten sushi before."',
      },
    ],
    questions: [
      {
        id: 'c1q1',
        question: 'She _____ to the gym every morning.',
        options: ['is going', 'goes', 'go', 'has gone'],
        correctAnswer: 1,
        explanation:
          '"Goes" is correct. This describes a habit/routine. With he/she/it in Simple Present, we add -s to the verb.',
      },
      {
        id: 'c1q2',
        question: 'Right now, they _____ a meeting in the conference room.',
        fillSentence: 'Right now, they _____ a meeting.',
        fillAnswer: 'are having',
        options: ['have', 'are having', 'has', 'had'],
        correctAnswer: 1,
        explanation:
          '"Are having" is correct. "Right now" signals an action in progress — use Present Continuous.',
      },
      {
        id: 'c1q3',
        question: 'I _____ this city since I was born.',
        options: ['live', 'lived', 'have lived', 'am living'],
        correctAnswer: 2,
        explanation:
          '"Have lived" is correct. "Since I was born" shows a connection from the past to the present — use Present Perfect.',
      },
      {
        id: 'c1q4',
        question: 'He _____ his homework yet.',
        fillSentence: 'He _____ his homework yet.',
        fillAnswer: "hasn't finished",
        options: ["didn't finish", "hasn't finished", "doesn't finish", "isn't finishing"],
        correctAnswer: 1,
        explanation:
          '"Hasn\'t finished" is correct. "Yet" at the end signals Present Perfect negative — the action hasn\'t happened up to now.',
      },
      {
        id: 'c1q5',
        question: 'They _____ in this office for three hours.',
        options: ['work', 'have worked', 'have been working', 'are working'],
        correctAnswer: 2,
        explanation:
          '"Have been working" is correct. "For three hours" with an ongoing action = Present Perfect Continuous.',
      },
      {
        id: 'c1q6',
        question: 'Which sentence is CORRECT? (Stative Verbs)',
        options: [
          'I am knowing the answer.',
          'She is wanting more coffee.',
          'He believes in ghosts.',
          'They are needing help now.',
        ],
        correctAnswer: 2,
        explanation:
          '"He believes in ghosts" is the only correct sentence. "Believe" is a stative verb — it cannot be used in continuous form.',
      },
      {
        id: 'c1q7',
        question: "We _____ already _____ that film. We don't want to watch it again.",
        fillSentence: "We _____ already watched that film.",
        fillAnswer: 'have',
        options: ['have / watched', 'did / watch', 'are / watching', 'had / watched'],
        correctAnswer: 0,
        explanation:
          '"Have watched" is correct. "Already" with a completed action connected to the present = Present Perfect.',
      },
      {
        id: 'c1q8',
        question: '_____ you ever _____ sushi?',
        options: ['Did / eat', 'Have / eaten', 'Are / eating', 'Do / eat'],
        correctAnswer: 1,
        explanation:
          '"Have / eaten" is correct. Questions about life experiences use Present Perfect: Have you ever + past participle.',
      },
    ],
  },
  {
    id: 2,
    title: 'Past & Perfect Tenses',
    icon: '⏰',
    iconBg: '#fff5d6',
    estimatedTime: '65 min',
    lessons: [
      {
        id: 'c2l1',
        title: 'Past Continuous: Interrupted Action',
        icon: '💥',
        formulaLabel: 'Formula',
        formula: 'was/were + V-ing (background) + simple past (interruption)',
        theoryBody:
          'Past Continuous describes an ongoing action in the past. Simple Past describes a shorter action that interrupted it. "When" introduces the interruption; "while" introduces the background.',
        examples: [
          'When I arrived home, my mother was cooking dinner.',
          'She was sleeping when the alarm went off.',
          'While they were playing, it started to rain.',
        ],
        tip: '"When + Simple Past" interrupts "Past Continuous." Think: the longer action was already happening.',
      },
      {
        id: 'c2l2',
        title: 'Past Perfect: Before Another Past',
        icon: '⏪',
        formulaLabel: 'Formula',
        formula: 'Subject + had + past participle',
        theoryBody:
          'Past Perfect shows that one action in the past happened BEFORE another past action. The Past Perfect action happened first.',
        examples: [
          'They had finished the project before the boss arrived.',
          'She had left before he called.',
          'By the time we arrived, the movie had already started.',
        ],
        tip: 'Think of it as "the earlier past." Use it to make the sequence of past events clear.',
      },
      {
        id: 'c2l3',
        title: 'Past Continuous: Background Scene',
        icon: '📻',
        formulaLabel: 'Formula',
        formula: 'Subject + was/were + V-ing',
        theoryBody:
          'Past Continuous describes an action that was in progress at a specific time in the past. It sets the scene or background for another event that happened during it.',
        examples: [
          'She was listening to the radio when the power went out.',
          'At 8 PM yesterday, I was watching TV.',
          'They were studying all night.',
        ],
        tip: 'Key phrases: "at that time," "while," "when [the event happened]," "at 8 PM yesterday."',
      },
      {
        id: 'c2l4',
        title: 'Used To & Would: Past Habits',
        icon: '🔄',
        formulaLabel: 'Formulas',
        formula: 'used to + V1 / would + V1 (for repeated past actions)',
        theoryBody:
          '"Used to" describes past habits or states that no longer exist. "Would" also describes repeated past actions (but NOT past states). Both are valid for habits.',
        examples: [
          'He used to smoke, but he quit five years ago.',
          'When I was young, I would walk to school every day.',
          'She used to love chocolate. (state — NOT "would love")',
        ],
        tip: '"Would" cannot replace "used to" for STATES (used to be/have/love). For actions only!',
      },
      {
        id: 'c2l5',
        title: 'By The Time + Past Perfect',
        icon: '🏁',
        formulaLabel: 'Pattern',
        formula: 'By the time + simple past, subject + had + past participle',
        theoryBody:
          '"By the time" introduces a past deadline. Whatever happened before that deadline uses Past Perfect. It makes the order of events very clear.',
        examples: [
          'By the time we got there, the band had already stopped performing.',
          'By the time she arrived, he had already left.',
          'By 9 AM, they had finished breakfast.',
        ],
        tip: '"By the time" = before a specific past moment. The earlier action uses Past Perfect.',
      },
      {
        id: 'c2l6',
        title: 'Past Perfect Continuous',
        icon: '⏳',
        formulaLabel: 'Formula',
        formula: 'Subject + had + been + V-ing',
        theoryBody:
          'Past Perfect Continuous shows an action that was in progress for a period of time before another past event. It emphasizes duration — how long something had been happening.',
        examples: [
          'She had been studying for three hours before she finally found the answer.',
          'He had been waiting for 20 minutes when the bus arrived.',
          'They had been arguing all morning.',
        ],
        tip: 'Often appears with "for + duration" to emphasize how long the action lasted.',
      },
      {
        id: 'c2l7',
        title: 'While vs When',
        icon: '🔀',
        formulaLabel: 'Rule',
        formula: 'While + continuous action / When + point action',
        theoryBody:
          '"While" introduces a longer, ongoing background action (use with continuous tenses). "When" introduces a shorter, completed action or a specific point in time.',
        examples: [
          'While he was walking to school, he found a wallet.',
          'When she arrived, they were eating dinner.',
          'I was reading while she was cooking.',
        ],
        tip: '"While" = during the time that (ongoing). "When" = at the moment that (event/point).',
      },
      {
        id: 'c2l8',
        title: 'Sequencing Past Events',
        icon: '📝',
        formulaLabel: 'Connectors',
        formula: 'then / after that / before / when / while / after',
        theoryBody:
          'Use time connectors to link past events in a sequence. "Then" and "after that" show the next step. "Before" and "after" show order. "When" and "while" show simultaneous actions.',
        examples: [
          'I went to school, then I did my homework, after that I had dinner.',
          'After I finished work, I went to the gym.',
          'She called him before she left.',
        ],
        tip: '"Then" and "after that" have the same meaning. "After that" is slightly more formal.',
      },
    ],
    questions: [
      {
        id: 'c2q1',
        question: 'When I _____ home, my mother _____ dinner.',
        fillSentence: 'When I _____ home, my mother _____ dinner.',
        fillAnswer: 'arrived / was cooking',
        options: [
          'arrived / was cooking',
          'was arriving / cooked',
          'arrive / is cooking',
          'had arrived / cooked',
        ],
        correctAnswer: 0,
        explanation:
          '"Arrived / was cooking" is correct. Simple Past (arrived) interrupted the Past Continuous (was cooking).',
      },
      {
        id: 'c2q2',
        question: 'They _____ the project before the boss arrived.',
        options: ['finished', 'were finishing', 'had finished', 'have finished'],
        correctAnswer: 2,
        explanation:
          '"Had finished" is correct. The finishing happened BEFORE another past event (boss arriving) — use Past Perfect.',
      },
      {
        id: 'c2q3',
        question: 'She _____ to the radio when the power went out.',
        fillSentence: 'She _____ to the radio when the power went out.',
        fillAnswer: 'was listening',
        options: ['listened', 'was listening', 'had listened', 'has listened'],
        correctAnswer: 1,
        explanation:
          '"Was listening" is correct. She was in the middle of an ongoing action (Past Continuous) when the power went out (interruption).',
      },
      {
        id: 'c2q4',
        question: 'He _____ smoke, but he quit five years ago.',
        options: ['used to', 'would', 'was used to', 'Both A and B'],
        correctAnswer: 3,
        explanation:
          'Both "used to smoke" and "would smoke" are correct for past habits. Both options A and B are valid.',
      },
      {
        id: 'c2q5',
        question: 'By the time we got there, the band _____ already _____ performing.',
        fillSentence: 'By the time we got there, the band _____ already stopped.',
        fillAnswer: 'had',
        options: ['has / stopped', 'had / stopped', 'was / stopping', 'did / stop'],
        correctAnswer: 1,
        explanation:
          '"Had / stopped" is correct. "By the time" signals the band stopped BEFORE we arrived — use Past Perfect.',
      },
      {
        id: 'c2q6',
        question: 'She _____ for three hours before she finally found the answer.',
        options: ['was studying', 'had been studying', 'studied', 'has been studying'],
        correctAnswer: 1,
        explanation:
          '"Had been studying" is correct. An ongoing action for a duration before another past event = Past Perfect Continuous.',
      },
      {
        id: 'c2q7',
        question: '_____ he was walking to school, he found a wallet.',
        options: ['When', 'While', 'Before', 'After'],
        correctAnswer: 1,
        explanation:
          '"While" is correct. "While" introduces a background ongoing action (was walking). "When" would introduce a shorter event.',
      },
      {
        id: 'c2q8',
        question: 'I went to school, _____ I did my homework, _____ I had dinner.',
        options: ['while / after', 'then / after that', 'before / when', 'when / while'],
        correctAnswer: 1,
        explanation:
          '"Then / after that" is correct. These connectors show a sequence of completed past events in order.',
      },
    ],
  },
  {
    id: 3,
    title: 'Modal Verbs',
    icon: '💬',
    iconBg: '#ddeeff',
    estimatedTime: '55 min',
    lessons: [
      {
        id: 'c3l1',
        title: 'Could: Past Ability',
        icon: '💪',
        formulaLabel: 'Formula',
        formula: 'could + base verb (past ability)',
        theoryBody:
          '"Could" is the past form of "can." Use it to describe an ability that someone had in the past but may not have now.',
        examples: [
          'When I was young, I could swim very fast.',
          'She could speak three languages as a child.',
          'He could run 10 km without stopping.',
        ],
        tip: 'Could = was/were able to. For a single specific past achievement, use "was/were able to."',
      },
      {
        id: 'c3l2',
        title: 'Must: Obligation & Law',
        icon: '⚠️',
        formulaLabel: 'Formula',
        formula: 'must + base verb (strong obligation)',
        theoryBody:
          '"Must" expresses strong obligation or necessity, often from a rule, law, or authority. It shows something is required — there is no choice.',
        examples: [
          "You must wear a helmet when riding a motorcycle. It's the law.",
          'Students must submit their assignments by Friday.',
          'You must see a doctor immediately.',
        ],
        tip: '"Must" = rule/law obligation. "Have to" = often an external requirement. They are often interchangeable.',
      },
      {
        id: 'c3l3',
        title: 'Might: Possibility',
        icon: '🤔',
        formulaLabel: 'Formula',
        formula: 'might + base verb (possibility, less than 50%)',
        theoryBody:
          '"Might" expresses a weaker possibility — something could happen but we\'re not sure. It\'s less certain than "will" or "should."',
        examples: [
          'It might rain later. The clouds look dark.',
          'She might come to the party if she finishes work early.',
          'I might visit Japan next year.',
        ],
        tip: 'Certainty: will (very sure) > should (likely) > might/may (possible) > could (slight chance).',
      },
      {
        id: 'c3l4',
        title: 'Must: Present Speculation',
        icon: '🔍',
        formulaLabel: 'Formula',
        formula: 'must + base verb (logical deduction)',
        theoryBody:
          'Use "must" for strong logical deductions about the present. When evidence strongly points to one conclusion, use "must." The opposite (impossible) uses "can\'t."',
        examples: [
          'He must be tired — he just ran a marathon!',
          "She must be home — her lights are on.",
          'This must be the right address.',
        ],
        tip: 'Must (deduction) ≠ Must (obligation). Context tells you which meaning is used.',
      },
      {
        id: 'c3l5',
        title: "Can't Have: Past Speculation",
        icon: '🕵️',
        formulaLabel: 'Formula',
        formula: "can't have / must have / might have + past participle",
        theoryBody:
          'Use modal + have + past participle for speculating about the past. "Can\'t have" = logically impossible. "Must have" = almost certain. "Might have" = possible.',
        examples: [
          "She can't have forgotten the meeting — she never misses one.",
          "He must have left early — his car is gone.",
          "They might have taken the wrong road.",
        ],
        tip: "Can't have = impossible in the past. Must have = almost certain in the past.",
      },
      {
        id: 'c3l6',
        title: 'Should: Advice & Recommendation',
        icon: '💡',
        formulaLabel: 'Formula',
        formula: 'should + base verb (advice/recommendation)',
        theoryBody:
          '"Should" expresses advice, recommendations, or what is the right thing to do. It\'s softer than "must" — it\'s a suggestion, not a strict obligation.',
        examples: [
          "You should eat more vegetables. It's good for your health.",
          'You should call your mother more often.',
          'She should rest — she looks exhausted.',
        ],
        tip: '"Should" = I think this is a good idea. "Must" = this is required. Should for advice; must for rules.',
      },
      {
        id: 'c3l7',
        title: 'Could: Polite Requests',
        icon: '🙏',
        formulaLabel: 'Formula',
        formula: 'Could you + base verb? (polite request)',
        theoryBody:
          '"Could you...?" is used to make polite requests. It\'s more formal and polite than "Can you...?" Other polite request forms: "Would you mind...?" and "Would you...?"',
        examples: [
          'Could you help me carry this box?',
          'Could you please pass the salt?',
          'Could you turn down the music?',
        ],
        tip: '"Could you...?" = polite request. "Could I...?" = polite permission. Both are more formal than "Can."',
      },
    ],
    questions: [
      {
        id: 'c3q1',
        question: 'When I was young, I _____ swim very fast.',
        options: ['can', 'could', 'must', 'should'],
        correctAnswer: 1,
        explanation:
          '"Could" is correct. It\'s the past form of "can" and describes an ability that existed in the past.',
      },
      {
        id: 'c3q2',
        question: "You _____ wear a helmet when riding a motorcycle. It's the law.",
        options: ['should', 'might', 'must', 'could'],
        correctAnswer: 2,
        explanation:
          '"Must" is correct. It expresses strong obligation from an external rule or law.',
      },
      {
        id: 'c3q3',
        question: 'It _____ rain later. The clouds look dark.',
        options: ['must', 'will', 'might', 'should'],
        correctAnswer: 2,
        explanation:
          '"Might" is correct. The speaker is not certain — the dark clouds suggest it\'s possible but not definite.',
      },
      {
        id: 'c3q4',
        question: 'He _____ be tired — he just ran a marathon!',
        fillSentence: 'He _____ be tired — he just ran a marathon!',
        fillAnswer: 'must',
        options: ['should', 'must', 'might', 'could'],
        correctAnswer: 1,
        explanation:
          '"Must" is correct. Running a marathon is strong evidence — this is a logical deduction (near certainty).',
      },
      {
        id: 'c3q5',
        question: 'She _____ have forgotten the meeting. She never misses one.',
        options: ["can't have", 'must have', 'should have', 'might have'],
        correctAnswer: 0,
        explanation:
          '"Can\'t have" is correct. It\'s logically impossible given her track record — she never misses meetings.',
      },
      {
        id: 'c3q6',
        question: "You _____ eat more vegetables. It's good for your health.",
        options: ['must', 'shall', 'should', 'will'],
        correctAnswer: 2,
        explanation:
          '"Should" is correct. This is a recommendation/advice, not a strict rule — use "should."',
      },
      {
        id: 'c3q7',
        question: '_____ you help me carry this box?',
        options: ['Shall', 'Must', 'Could', 'Should'],
        correctAnswer: 2,
        explanation:
          '"Could" is correct. "Could you...?" is a polite way to make a request — more formal than "Can you...?"',
      },
    ],
  },
  {
    id: 4,
    title: 'Passive Voice',
    icon: '📋',
    iconBg: '#ffeee8',
    estimatedTime: '50 min',
    lessons: [
      {
        id: 'c4l1',
        title: 'Present Simple Passive',
        icon: '📄',
        formulaLabel: 'Formula',
        formula: 'Subject + is/are + past participle (+ by agent)',
        theoryBody:
          'In Present Simple Passive, the focus is on the action or the receiver — not who performs it. Use "is" for singular subjects and "are" for plural.',
        examples: [
          'The report is written by the manager every Monday.',
          'English is spoken in many countries.',
          'These cars are made in Japan.',
        ],
        tip: 'Passive focus = WHAT happens to the subject. Active focus = WHO does the action.',
      },
      {
        id: 'c4l2',
        title: 'Past Simple Passive',
        icon: '📬',
        formulaLabel: 'Formula',
        formula: 'Subject + was/were + past participle',
        theoryBody:
          'Past Simple Passive describes completed past actions where the receiver is more important than the doer. Use "was" for singular and "were" for plural subjects.',
        examples: [
          'The package was delivered to your address yesterday.',
          'The Eiffel Tower was built in 1889.',
          'The windows were broken in the storm.',
        ],
        tip: '"By + agent" is optional — only add it if who did the action is important.',
      },
      {
        id: 'c4l3',
        title: 'Modal Passive',
        icon: '⚙️',
        formulaLabel: 'Formula',
        formula: 'Subject + modal + be + past participle',
        theoryBody:
          'Use modal + be + past participle to make passive sentences with modals. The modal expresses obligation, possibility, or other meanings.',
        examples: [
          'This form must be completed before the deadline.',
          'The meeting can be rescheduled.',
          'The problem should be reported immediately.',
        ],
        tip: 'Modal passives: must be done, should be fixed, can be changed, might be cancelled.',
      },
      {
        id: 'c4l4',
        title: 'Present Perfect Passive',
        icon: '🏗️',
        formulaLabel: 'Formula',
        formula: 'Subject + have/has + been + past participle',
        theoryBody:
          'Present Perfect Passive combines Present Perfect with passive voice. Shows a past action whose result affects the present, with focus on the receiver.',
        examples: [
          'The building has been damaged by the earthquake.',
          'The project has been completed.',
          'Three people have been arrested.',
        ],
        tip: 'Present Perfect Passive = have/has + been + past participle. "Been" is always required!',
      },
      {
        id: 'c4l5',
        title: 'Future Passive',
        icon: '🔮',
        formulaLabel: 'Formula',
        formula: 'Subject + will + be + past participle',
        theoryBody:
          "Future Passive is used when we know something will happen but don't know (or don't focus on) who will do it.",
        examples: [
          'The results will be announced tomorrow.',
          'New regulations will be introduced next year.',
          'The package will be delivered by Friday.',
        ],
        tip: "Future Passive: will be + past participle. Don't confuse with 'will be + V-ing' (Future Continuous).",
      },
      {
        id: 'c4l6',
        title: 'Why We Use Passive Voice',
        icon: '📰',
        formulaLabel: 'Contexts',
        formula: 'Use passive: agent unknown, unimportant, or focus is on action',
        theoryBody:
          'Passive voice is preferred in formal writing, news, and science. Use it when: (1) the agent is unknown, (2) the agent is unimportant, (3) you want to focus on the action or result.',
        examples: [
          'The suspect was arrested last night. (news — agent less important)',
          'The results were recorded carefully. (science — focus on process)',
          'The building was destroyed. (unknown agent)',
        ],
        tip: 'In academic and news writing, passive voice sounds more objective and formal.',
      },
    ],
    questions: [
      {
        id: 'c4q1',
        question: 'The report _____ by the manager every Monday.',
        options: ['is written', 'writes', 'was written', 'has been written'],
        correctAnswer: 0,
        explanation:
          '"Is written" is correct. This is Present Simple Passive — a regular, repeated action where the focus is on the report.',
      },
      {
        id: 'c4q2',
        question: 'The package _____ to your address yesterday.',
        options: ['is delivered', 'was delivered', 'has been delivered', 'will be delivered'],
        correctAnswer: 1,
        explanation:
          '"Was delivered" is correct. "Yesterday" signals a completed past action — use Past Simple Passive.',
      },
      {
        id: 'c4q3',
        question: 'This form _____ before the deadline.',
        fillSentence: 'This form _____ before the deadline.',
        fillAnswer: 'must be completed',
        options: ['must complete', 'must completed', 'must be completed', 'must been completed'],
        correctAnswer: 2,
        explanation:
          '"Must be completed" is correct. Modal Passive formula: modal + be + past participle.',
      },
      {
        id: 'c4q4',
        question: 'The building _____ by the earthquake.',
        options: ['has damaged', 'has been damaged', 'had damage', 'was damaging'],
        correctAnswer: 1,
        explanation:
          '"Has been damaged" is correct. Present Perfect Passive = have/has + been + past participle.',
      },
      {
        id: 'c4q5',
        question:
          "Active: 'They will announce the results tomorrow.' → Passive: 'The results _____ tomorrow.'",
        options: ['will announce', 'will be announcing', 'will be announced', 'are announced'],
        correctAnswer: 2,
        explanation:
          '"Will be announced" is correct. Future Passive = will + be + past participle.',
      },
      {
        id: 'c4q6',
        question: 'In news writing, passive is preferred because...',
        options: [
          'It sounds more casual and friendly',
          'The focus is on the action, not who did it',
          'It uses fewer words',
          'It always sounds more exciting',
        ],
        correctAnswer: 1,
        explanation:
          '"The focus is on the action, not who did it." Passive in news writing emphasizes what happened, not the agent.',
      },
    ],
  },
  {
    id: 5,
    title: 'Conditionals',
    icon: '💭',
    iconBg: '#f0eeff',
    estimatedTime: '70 min',
    lessons: [
      {
        id: 'c5l1',
        title: 'Zero Conditional: Facts & Laws',
        icon: '🔬',
        formulaLabel: 'Formula',
        formula: 'If + present simple, present simple',
        theoryBody:
          'Zero Conditional describes things that are always true — scientific facts, natural laws, and general truths. Both clauses use the present simple.',
        examples: [
          'If you heat water to 100°C, it boils.',
          'If it rains, the ground gets wet.',
          'If you mix blue and yellow, you get green.',
        ],
        tip: 'Zero Conditional = universal truth. You can replace "if" with "when" and the meaning stays the same.',
      },
      {
        id: 'c5l2',
        title: 'First Conditional: Real Possibility',
        icon: '☀️',
        formulaLabel: 'Formula',
        formula: 'If + present simple, will + base verb',
        theoryBody:
          'First Conditional describes real, possible future situations and their likely results. The condition is realistic, and the result will follow.',
        examples: [
          'If it rains tomorrow, we will cancel the picnic.',
          'If you study hard, you will pass the exam.',
          'If she calls me, I will tell her the news.',
        ],
        tip: 'Never use "will" in the "if" clause! "If it will rain..." is WRONG. Use present simple there.',
      },
      {
        id: 'c5l3',
        title: 'Second Conditional: Unreal Present',
        icon: '💭',
        formulaLabel: 'Formula',
        formula: 'If + past simple, would + base verb',
        theoryBody:
          'Second Conditional describes imaginary or unlikely present/future situations. The speaker knows the condition is NOT true or very unlikely.',
        examples: [
          'If I had a million dollars, I would travel the world.',
          'If she were the president, she would change many things.',
          'If I lived near the beach, I would swim every day.',
        ],
        tip: 'Use "were" instead of "was" for all subjects in formal/written English: "If I were you..."',
      },
      {
        id: 'c5l4',
        title: 'Third Conditional: Past Regrets',
        icon: '😔',
        formulaLabel: 'Formula',
        formula: 'If + past perfect, would have + past participle',
        theoryBody:
          "Third Conditional talks about imaginary past situations — things that DIDN'T happen. Used for regrets, criticism, or speculating about how the past could have been different.",
        examples: [
          'If she had studied harder, she would have passed the exam.',
          'If I had known, I would have helped.',
          'If they had left earlier, they would have caught the train.',
        ],
        tip: 'Third Conditional = looking back at the past with regret. Nothing can be changed now.',
      },
      {
        id: 'c5l5',
        title: 'Mixed Conditional',
        icon: '🔀',
        formulaLabel: 'Formula',
        formula: 'If + past perfect, would + base verb (now)',
        theoryBody:
          "Mixed Conditional combines Third (past) with Second (present). A past condition affects a present result. The past action didn't happen, so the present situation is different.",
        examples: [
          'If he had saved money, he would be rich now.',
          'If she had studied medicine, she would be a doctor today.',
          'If I had taken that job, I would be living in Paris now.',
        ],
        tip: 'Mixed Conditional: past unreal condition → present unreal result. Key clue: "now" or "today."',
      },
      {
        id: 'c5l6',
        title: 'Unless: Negative Condition',
        icon: '🚫',
        formulaLabel: 'Formula',
        formula: 'Unless + positive = If + negative',
        theoryBody:
          '"Unless" means "if not." It introduces a negative condition. The sentence is true UNLESS the exception happens.',
        examples: [
          "Unless you study hard, you won't pass the exam.",
          "I'll go to the party unless I feel sick.",
          "She won't forgive him unless he apologizes.",
        ],
        tip: '"Unless you study" = "If you don\'t study." Never use "unless" with a negative — it becomes a double negative!',
      },
      {
        id: 'c5l7',
        title: 'Wish: Present Regrets',
        icon: '⭐',
        formulaLabel: 'Formula',
        formula: 'I wish + past simple (present unreal wish)',
        theoryBody:
          '"Wish" + past simple expresses a desire for something to be different NOW, but it isn\'t. It shows dissatisfaction with the present situation.',
        examples: [
          'I wish I had more time to finish the project.',
          'She wishes she lived closer to work.',
          'I wish I could speak Chinese.',
        ],
        tip: 'Wish + past simple = present unreal wish. "I wish I had" (now) vs "I wish I had had" (past).',
      },
      {
        id: 'c5l8',
        title: 'If Only: Strong Past Regret',
        icon: '😞',
        formulaLabel: 'Formula',
        formula: 'If only + past perfect (strong past regret)',
        theoryBody:
          '"If only" + past perfect expresses strong regret about something in the PAST that cannot be changed. It\'s more emphatic and emotional than "I wish."',
        examples: [
          'If only I had told him the truth earlier.',
          "If only she had taken the doctor's advice.",
          'If only we had arrived on time.',
        ],
        tip: '"If only" = stronger, more emotional version of "I wish." Both use past perfect for past regrets.',
      },
    ],
    questions: [
      {
        id: 'c5q1',
        question: 'If you heat water to 100°C, it _____.',
        options: ['would boil', 'boils', 'boiled', 'will boil'],
        correctAnswer: 1,
        explanation:
          '"Boils" is correct. Zero Conditional uses present simple in both clauses — this is a scientific fact.',
      },
      {
        id: 'c5q2',
        question: 'If it _____ tomorrow, we _____ the picnic.',
        fillSentence: 'If it _____ tomorrow, we _____ the picnic.',
        fillAnswer: 'rains / will cancel',
        options: [
          'rains / will cancel',
          'will rain / cancel',
          'rained / would cancel',
          'rains / would cancel',
        ],
        correctAnswer: 0,
        explanation:
          '"Rains / will cancel" is correct. First Conditional: If + present simple, will + base verb. Never use "will" in the "if" clause.',
      },
      {
        id: 'c5q3',
        question: 'If I _____ a million dollars, I _____ travel the world.',
        options: ['have / will', 'had / would', 'had / will', 'have / would'],
        correctAnswer: 1,
        explanation:
          '"Had / would" is correct. Second Conditional: If + past simple, would + base verb. This is an unreal/imaginary situation.',
      },
      {
        id: 'c5q4',
        question: 'If she _____ harder, she _____ the exam.',
        fillSentence: 'If she _____ harder, she _____ the exam.',
        fillAnswer: 'had studied / would have passed',
        options: [
          'studied / would pass',
          'had studied / would have passed',
          'studies / will pass',
          'had studied / would pass',
        ],
        correctAnswer: 1,
        explanation:
          '"Had studied / would have passed" is correct. Third Conditional: past perfect + would have + past participle. This expresses a past regret.',
      },
      {
        id: 'c5q5',
        question: 'If he had saved money, he _____ rich now.',
        options: ['would be', 'would have been', 'will be', 'had been'],
        correctAnswer: 0,
        explanation:
          '"Would be" is correct. Mixed Conditional: past perfect condition → present result (would + base verb). "Now" signals the result is present.',
      },
      {
        id: 'c5q6',
        question: "_____ you study hard, you won't pass the exam.",
        options: ['Unless', 'If', 'Provided that', 'As long as'],
        correctAnswer: 0,
        explanation:
          '"Unless" is correct. "Unless you study hard" = "If you don\'t study hard." Unless introduces a negative condition.',
      },
      {
        id: 'c5q7',
        question: 'I wish I _____ more time to finish the project.',
        fillSentence: 'I wish I _____ more time to finish the project.',
        fillAnswer: 'had',
        options: ['have', 'had', 'will have', 'would have'],
        correctAnswer: 1,
        explanation:
          '"Had" is correct. Wish + past simple expresses a current unreal wish — wanting the present to be different.',
      },
      {
        id: 'c5q8',
        question: 'If only I _____ him the truth earlier.',
        options: ['told', 'tell', 'had told', 'would tell'],
        correctAnswer: 2,
        explanation:
          '"Had told" is correct. "If only" + past perfect = strong regret about a past action that cannot be changed.',
      },
    ],
  },
];

// ── BEGINNER CURRICULUM (A1 / A2) ────────────────────────────────────────────

export const BEGINNER_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Verb To Be',
    icon: '🔤',
    iconBg: '#d4f5e0',
    estimatedTime: '30 min',
    lessons: [
      {
        id: 'b1l1',
        title: 'Am / Is / Are: Who Are You?',
        icon: '👤',
        formulaLabel: 'Formula',
        formula: 'I + am | He/She/It + is | You/We/They + are',
        theoryBody:
          '"To be" has three forms in the present: AM, IS, and ARE. Use them based on the subject of the sentence.',
        examples: [
          'I am a student.',
          'She is my teacher.',
          'They are from Indonesia.',
        ],
        tip: 'Memory trick: "I AM, he/she/it IS, we/you/they ARE."',
      },
      {
        id: 'b1l2',
        title: 'To Be with Names',
        icon: '🏷️',
        formulaLabel: 'Formula',
        formula: 'Name + is + description',
        theoryBody:
          "When the subject is a name or a third-person noun (not I/you/we/they), use IS.",
        examples: [
          'Budi is a doctor.',
          'My mother is kind.',
          'The cat is small.',
        ],
        tip: 'Names and things (singular) always use IS.',
      },
      {
        id: 'b1l3',
        title: 'To Be: Questions',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Am/Is/Are + subject + ...?',
        theoryBody:
          'To make a question with "to be," move Am/Is/Are to the front of the sentence.',
        examples: [
          'Are you tired?',
          'Is she your sister?',
          'Am I late?',
        ],
        tip: 'Short answers: Yes, I am. / No, I am not. (NOT "Yes, I\'m.")',
      },
      {
        id: 'b1l4',
        title: 'To Be: Negative',
        icon: '🚫',
        formulaLabel: 'Formula',
        formula: 'Subject + am/is/are + not',
        theoryBody:
          'To make "to be" negative, add NOT after am/is/are. Common contractions: isn\'t = is not, aren\'t = are not.',
        examples: [
          "He is not at home. / He isn't at home.",
          "They are not students. / They aren't students.",
          "I am not hungry.",
        ],
        tip: '"Am not" has no contraction — "amn\'t" does NOT exist in standard English.',
      },
      {
        id: 'b1l5',
        title: 'To Be: Plural Subjects',
        icon: '👥',
        formulaLabel: 'Formula',
        formula: 'We / You / They + are',
        theoryBody:
          'When you talk about groups of people or things, use ARE. This includes "we," "you" (plural), "they," and plural nouns.',
        examples: [
          'We are friends.',
          'The books are on the desk.',
          'You are very smart.',
        ],
        tip: 'If you can replace the subject with "they," use ARE.',
      },
      {
        id: 'b1l6',
        title: 'To Be: Short Answers',
        icon: '✅',
        formulaLabel: 'Pattern',
        formula: 'Yes, subject + am/is/are. / No, subject + am/is/are + not.',
        theoryBody:
          'In English, we answer yes/no questions with a short answer using "to be." We do NOT repeat the full sentence.',
        examples: [
          'Are you happy? — Yes, I am. / No, I am not.',
          'Is he a teacher? — Yes, he is. / No, he isn\'t.',
          'Are they here? — Yes, they are. / No, they aren\'t.',
        ],
        tip: 'Never say "Yes, I am happy" as a short answer — just "Yes, I am."',
      },
    ],
    questions: [
      {
        id: 'b1q1',
        question: 'I _____ a student.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 0,
        explanation: '"Am" is correct. With the subject "I," we always use AM.',
      },
      {
        id: 'b1q2',
        question: 'She _____ my teacher.',
        fillSentence: 'She _____ my teacher.',
        fillAnswer: 'is',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 1,
        explanation: '"Is" is correct. She is a third-person singular subject — use IS.',
      },
      {
        id: 'b1q3',
        question: 'They _____ from Indonesia.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 2,
        explanation: '"Are" is correct. "They" is a plural subject — use ARE.',
      },
      {
        id: 'b1q4',
        question: '_____ you tired? Yes, I am.',
        fillSentence: '_____ you tired?',
        fillAnswer: 'Are',
        options: ['Am', 'Is', 'Are', 'Be'],
        correctAnswer: 2,
        explanation: '"Are" is correct. Questions with "you" use ARE at the beginning.',
      },
      {
        id: 'b1q5',
        question: 'He _____ not at home right now.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 1,
        explanation: '"Is" is correct. He is a third-person singular subject — use IS not.',
      },
      {
        id: 'b1q6',
        question: 'We _____ friends.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 2,
        explanation: '"Are" is correct. "We" is a plural subject — use ARE.',
      },
    ],
  },
  {
    id: 2,
    title: 'Simple Present',
    icon: '📅',
    iconBg: '#fff5d6',
    estimatedTime: '35 min',
    lessons: [
      {
        id: 'b2l1',
        title: 'Daily Routines: I / You / We / They',
        icon: '🌅',
        formulaLabel: 'Formula',
        formula: 'Subject (I/You/We/They) + base verb',
        theoryBody:
          'Use Simple Present for daily habits and routines. With I, you, we, they — use the base form of the verb (no changes).',
        examples: [
          'I drink coffee every morning.',
          'They live in Jakarta.',
          'We study English at school.',
        ],
        tip: 'Key words: every day, always, usually, often, sometimes, never.',
      },
      {
        id: 'b2l2',
        title: 'He / She / It: Add -s or -es',
        icon: '➕',
        formulaLabel: 'Formula',
        formula: 'He/She/It + verb + -s/-es',
        theoryBody:
          'With he, she, it (third-person singular), add -s or -es to the verb. Verbs ending in -s, -sh, -ch, -x, -o get -es.',
        examples: [
          'She goes to school every day.',
          'He watches TV at night.',
          'My cat eats fish.',
        ],
        tip: 'go→goes, do→does, have→has (irregular!). Others just add -s or -es.',
      },
      {
        id: 'b2l3',
        title: 'Negative: Do Not / Does Not',
        icon: '❌',
        formulaLabel: 'Formula',
        formula: 'I/You/We/They + don\'t + base verb | He/She/It + doesn\'t + base verb',
        theoryBody:
          'To make Simple Present negative, use "don\'t" (do not) or "doesn\'t" (does not). After doesn\'t, always use the base verb (no -s).',
        examples: [
          "I don't like spicy food.",
          "He doesn't eat meat.",
          "They don't have a car.",
        ],
        tip: '"Doesn\'t" already contains the -s. Never say "doesn\'t goes" — always "doesn\'t go."',
      },
      {
        id: 'b2l4',
        title: 'Questions: Do / Does',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Do/Does + subject + base verb?',
        theoryBody:
          'To ask a yes/no question in Simple Present, use DO (for I/you/we/they) or DOES (for he/she/it) at the start.',
        examples: [
          'Do you like music?',
          'Does she speak English?',
          'Do they play football?',
        ],
        tip: 'After "does," the verb stays in base form: "Does she go?" not "Does she goes?"',
      },
      {
        id: 'b2l5',
        title: 'Have vs Has',
        icon: '🎁',
        formulaLabel: 'Formula',
        formula: 'I/You/We/They + have | He/She/It + has',
        theoryBody:
          '"Have" is an irregular verb. With I, you, we, they — use HAVE. With he, she, it — use HAS.',
        examples: [
          'I have a dog.',
          'My father has a car.',
          'They have two children.',
        ],
        tip: '"Have" is one of the most common English verbs. Learn it well!',
      },
      {
        id: 'b2l6',
        title: 'Frequency Adverbs',
        icon: '📊',
        formulaLabel: 'Position',
        formula: 'Subject + frequency adverb + verb',
        theoryBody:
          'Frequency adverbs tell us HOW OFTEN something happens. They go before the main verb (but after "to be").',
        examples: [
          'I always brush my teeth before bed.',
          'She never eats breakfast.',
          'They usually walk to school.',
        ],
        tip: 'Order: always (100%) > usually > often > sometimes > rarely > never (0%).',
      },
    ],
    questions: [
      {
        id: 'b2q1',
        question: 'She _____ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correctAnswer: 1,
        explanation: '"Goes" is correct. She is third-person singular (he/she/it) — add -s to "go" → goes.',
      },
      {
        id: 'b2q2',
        question: 'I _____ coffee every morning.',
        fillSentence: 'I _____ coffee every morning.',
        fillAnswer: 'drink',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        correctAnswer: 0,
        explanation: '"Drink" is correct. With "I," use the base form of the verb — no -s needed.',
      },
      {
        id: 'b2q3',
        question: 'He _____ not like vegetables.',
        options: ['do', 'does', 'is', 'are'],
        correctAnswer: 1,
        explanation: '"Does" is correct. For he/she/it in negative sentences, use "doesn\'t" (does not).',
      },
      {
        id: 'b2q4',
        question: '_____ they live in Jakarta?',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctAnswer: 0,
        explanation: '"Do" is correct. "They" uses DO in questions. (Does is for he/she/it.)',
      },
      {
        id: 'b2q5',
        question: 'My father _____ a car.',
        fillSentence: 'My father _____ a car.',
        fillAnswer: 'has',
        options: ['have', 'has', 'having', 'had'],
        correctAnswer: 1,
        explanation: '"Has" is correct. "My father" = he, so use HAS (the he/she/it form of "have").',
      },
      {
        id: 'b2q6',
        question: 'She _____ eats breakfast. She wakes up too late.',
        options: ['always', 'usually', 'never', 'often'],
        correctAnswer: 2,
        explanation: '"Never" is correct. If she wakes up too late and skips breakfast, she never eats it.',
      },
    ],
  },
  {
    id: 3,
    title: 'There Is / There Are',
    icon: '📍',
    iconBg: '#ddeeff',
    estimatedTime: '25 min',
    lessons: [
      {
        id: 'b3l1',
        title: 'There Is: One Thing',
        icon: '1️⃣',
        formulaLabel: 'Formula',
        formula: 'There is + singular noun',
        theoryBody:
          'Use "there is" to say that ONE thing exists or is in a place. It tells us something exists.',
        examples: [
          'There is a book on the table.',
          'There is a cat in the garden.',
          'There is a school near my house.',
        ],
        tip: '"There is" = one singular thing. Contraction: "There\'s a book on the table."',
      },
      {
        id: 'b3l2',
        title: 'There Are: Multiple Things',
        icon: '🔢',
        formulaLabel: 'Formula',
        formula: 'There are + plural noun',
        theoryBody:
          'Use "there are" when talking about TWO or more things that exist or are in a place.',
        examples: [
          'There are three cats in the garden.',
          'There are many students in the class.',
          'There are two beds in the room.',
        ],
        tip: '"There are" = two or more things. No contraction for "there are" in standard use.',
      },
      {
        id: 'b3l3',
        title: 'Is There? / Are There? Questions',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Is there + singular? / Are there + plural?',
        theoryBody:
          'To ask if something exists, move "is" or "are" to the front.',
        examples: [
          'Is there a bank near here?',
          'Are there any chairs in the room?',
          'Is there milk in the fridge?',
        ],
        tip: 'Short answers: Yes, there is. / No, there isn\'t. | Yes, there are. / No, there aren\'t.',
      },
      {
        id: 'b3l4',
        title: 'There Is / Are: Negative',
        icon: '🚫',
        formulaLabel: 'Formula',
        formula: 'There is not (isn\'t) / There are not (aren\'t)',
        theoryBody:
          'To make "there is/are" negative, add NOT. Use "isn\'t" for singular and "aren\'t" for plural.',
        examples: [
          "There isn't a hospital in this village.",
          "There aren't any chairs in the room.",
          "There isn't any milk.",
        ],
        tip: 'With negative and questions, use "any" (not "some"): "There aren\'t any books."',
      },
      {
        id: 'b3l5',
        title: 'How Many? / How Much?',
        icon: '🔢',
        formulaLabel: 'Formula',
        formula: 'How many + plural noun + are there? / How much + uncountable + is there?',
        theoryBody:
          'Use "how many" to ask about countable nouns (things you can count). Use "how much" for uncountable nouns (water, money, time).',
        examples: [
          'How many students are there in your class?',
          'How many books are there on the shelf?',
          'How much water is there in the bottle?',
        ],
        tip: 'Countable = can count (1 book, 2 books) → "how many." Uncountable (water, rice) → "how much."',
      },
    ],
    questions: [
      {
        id: 'b3q1',
        question: '_____ a book on the table.',
        fillSentence: '_____ a book on the table.',
        fillAnswer: 'There is',
        options: ['There is', 'There are', 'There be', 'Is there'],
        correctAnswer: 0,
        explanation: '"There is" is correct. "A book" is singular (one book) — use "there is."',
      },
      {
        id: 'b3q2',
        question: '_____ three cats in the garden.',
        options: ['There is', 'There are', 'Is there', 'Are there'],
        correctAnswer: 1,
        explanation: '"There are" is correct. "Three cats" is plural — use "there are."',
      },
      {
        id: 'b3q3',
        question: '_____ any milk in the fridge?',
        options: ['Is there', 'Are there', 'There is', 'There are'],
        correctAnswer: 0,
        explanation: '"Is there" is correct. "Milk" is uncountable/singular — use "is there?" for questions.',
      },
      {
        id: 'b3q4',
        question: 'There _____ not any chairs in the room.',
        fillSentence: 'There _____ not any chairs in the room.',
        fillAnswer: 'are',
        options: ['is', 'are', 'be', 'am'],
        correctAnswer: 1,
        explanation: '"Are" is correct. "Chairs" is plural — use "there are not / there aren\'t."',
      },
      {
        id: 'b3q5',
        question: 'How many students _____ in your class?',
        options: ['is there', 'are there', 'there is', 'there are'],
        correctAnswer: 1,
        explanation: '"Are there" is correct. "Students" is plural — use "are there" in the question.',
      },
    ],
  },
  {
    id: 4,
    title: 'Can / Can\'t',
    icon: '💪',
    iconBg: '#ffeee8',
    estimatedTime: '25 min',
    lessons: [
      {
        id: 'b4l1',
        title: 'Can: Ability',
        icon: '✅',
        formulaLabel: 'Formula',
        formula: 'Subject + can + base verb',
        theoryBody:
          '"Can" expresses ability — something you are able to do. The verb after "can" always stays in base form (no -s, no -ing).',
        examples: [
          'She can swim very well.',
          'I can speak two languages.',
          'Birds can fly.',
        ],
        tip: 'After "can," the verb NEVER changes: "She can swim" NOT "She can swims."',
      },
      {
        id: 'b4l2',
        title: "Can't: No Ability",
        icon: '🚫',
        formulaLabel: 'Formula',
        formula: "Subject + can't (cannot) + base verb",
        theoryBody:
          '"Can\'t" (cannot) means you are NOT able to do something. It\'s the negative form of "can."',
        examples: [
          "I can't speak French. I never learned it.",
          "He can't drive a car — he is only 10 years old.",
          "Fish can't walk on land.",
        ],
        tip: '"Can\'t" and "cannot" have the same meaning. "Cannot" is more formal.',
      },
      {
        id: 'b4l3',
        title: 'Can: Questions',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Can + subject + base verb?',
        theoryBody:
          'To ask about ability, move "can" to the front of the sentence.',
        examples: [
          'Can you play the guitar?',
          'Can she cook?',
          'Can they speak Japanese?',
        ],
        tip: 'Short answers: Yes, I can. / No, I can\'t. (Never "Yes, I can swim." — just "Yes, I can.")',
      },
      {
        id: 'b4l4',
        title: 'Can: Permission',
        icon: '🔓',
        formulaLabel: 'Formula',
        formula: 'Can I/we + base verb? (asking permission)',
        theoryBody:
          '"Can" is also used to ask for permission informally. It means "Is it okay if I...?"',
        examples: [
          'Can I open the window?',
          'Can we sit here?',
          'Can I use your phone?',
        ],
        tip: 'For more polite requests, use "May I...?" or "Could I...?" instead of "Can I...?"',
      },
      {
        id: 'b4l5',
        title: 'Natural Abilities',
        icon: '🌿',
        formulaLabel: 'Usage',
        formula: 'Animals/things + can + natural ability',
        theoryBody:
          '"Can" is used for natural abilities — things that are naturally possible for animals, people, or objects.',
        examples: [
          'Cats can see in the dark.',
          'Dogs can hear very well.',
          'Computers can store millions of files.',
        ],
        tip: 'Use "can" for facts about what something is naturally able to do.',
      },
    ],
    questions: [
      {
        id: 'b4q1',
        question: 'She _____ swim very well.',
        fillSentence: 'She _____ swim very well.',
        fillAnswer: 'can',
        options: ['can', 'cans', 'is can', 'be can'],
        correctAnswer: 0,
        explanation: '"Can" is correct. "Can" expresses ability and never changes form — no -s, no changes.',
      },
      {
        id: 'b4q2',
        question: "I _____ speak French. I never learned it.",
        options: ['can', "can't", 'could', "couldn't"],
        correctAnswer: 1,
        explanation: '"Can\'t" is correct. The person never learned French — they are unable to speak it.',
      },
      {
        id: 'b4q3',
        question: '_____ you play the guitar?',
        options: ['Can', 'Could', 'Do', 'Is'],
        correctAnswer: 0,
        explanation: '"Can" is correct. To ask about present ability, use CAN at the beginning of the question.',
      },
      {
        id: 'b4q4',
        question: "He _____ drive a car — he is only 10 years old.",
        options: ['can', "can't", 'must', 'should'],
        correctAnswer: 1,
        explanation: '"Can\'t" is correct. Being 10 years old means he is unable (and not allowed) to drive.',
      },
      {
        id: 'b4q5',
        question: 'Birds _____ fly. It is natural for them.',
        options: ['can', "can't", 'must', 'should'],
        correctAnswer: 0,
        explanation: '"Can" is correct. Flying is a natural ability of birds.',
      },
    ],
  },
  {
    id: 5,
    title: 'Simple Past',
    icon: '⏮️',
    iconBg: '#f0eeff',
    estimatedTime: '40 min',
    lessons: [
      {
        id: 'b5l1',
        title: 'Regular Past: Add -ed',
        icon: '✏️',
        formulaLabel: 'Formula',
        formula: 'Subject + verb + -ed',
        theoryBody:
          'For regular verbs, add -ed to make the Simple Past. Use it for finished actions in the past.',
        examples: [
          'I walked to school yesterday.',
          'She cooked dinner last night.',
          'They played football on Sunday.',
        ],
        tip: 'Spelling rules: verbs ending in -e → add -d (like→liked). Short vowel+consonant → double (stop→stopped).',
      },
      {
        id: 'b5l2',
        title: 'Irregular Past Verbs',
        icon: '⚠️',
        formulaLabel: 'Examples',
        formula: 'go→went, eat→ate, write→wrote, see→saw, have→had',
        theoryBody:
          'Many common English verbs are irregular — they do NOT follow the -ed rule. You need to memorize them.',
        examples: [
          'Yesterday, I went to the market.',
          'She wrote a letter last night.',
          'We saw a great movie yesterday.',
        ],
        tip: 'Common irregular verbs: go→went, eat→ate, write→wrote, see→saw, come→came, buy→bought.',
      },
      {
        id: 'b5l3',
        title: 'To Be in the Past: Was / Were',
        icon: '🕐',
        formulaLabel: 'Formula',
        formula: 'I/He/She/It + was | You/We/They + were',
        theoryBody:
          '"Was" and "were" are the past forms of "to be." Use "was" for singular subjects and "were" for plural.',
        examples: [
          'I was at home yesterday.',
          'They were happy at the party.',
          'The weather was cold last week.',
        ],
        tip: '"Was" = singular (I, he, she, it). "Were" = plural (you, we, they).',
      },
      {
        id: 'b5l4',
        title: 'Negative: Did Not (Didn\'t)',
        icon: '❌',
        formulaLabel: 'Formula',
        formula: 'Subject + didn\'t + base verb',
        theoryBody:
          'To make Simple Past negative, use "didn\'t" (did not) + base verb. The main verb goes back to its base form — no -ed.',
        examples: [
          "He didn't come to school yesterday.",
          "I didn't eat breakfast this morning.",
          "They didn't finish the homework.",
        ],
        tip: '"Didn\'t" already shows past tense. Never say "didn\'t went" — always "didn\'t go."',
      },
      {
        id: 'b5l5',
        title: 'Questions: Did',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Did + subject + base verb?',
        theoryBody:
          'To ask a yes/no question in Simple Past, use DID at the start. The main verb goes back to its base form.',
        examples: [
          'Did you watch TV last night?',
          'Did she pass the exam?',
          'Did they arrive on time?',
        ],
        tip: 'Short answers: Yes, I did. / No, I didn\'t. After "did," always use the base verb.',
      },
    ],
    questions: [
      {
        id: 'b5q1',
        question: 'Yesterday, I _____ to the market.',
        fillSentence: 'Yesterday, I _____ to the market.',
        fillAnswer: 'went',
        options: ['go', 'goes', 'went', 'gone'],
        correctAnswer: 2,
        explanation: '"Went" is correct. "Go" is irregular — its past form is "went," not "goed."',
      },
      {
        id: 'b5q2',
        question: 'She _____ a letter last night.',
        options: ['write', 'writes', 'wrote', 'written'],
        correctAnswer: 2,
        explanation: '"Wrote" is correct. "Write" is irregular — its past form is "wrote."',
      },
      {
        id: 'b5q3',
        question: 'They _____ happy at the party.',
        fillSentence: 'They _____ happy at the party.',
        fillAnswer: 'were',
        options: ['is', 'are', 'was', 'were'],
        correctAnswer: 3,
        explanation: '"Were" is correct. "They" is plural — use "were" as the past form of "to be."',
      },
      {
        id: 'b5q4',
        question: 'He _____ not come to school yesterday.',
        options: ['do', 'does', 'did', 'was'],
        correctAnswer: 2,
        explanation: '"Did" is correct. For Simple Past negative, use "didn\'t" (did not). The main verb stays base form.',
      },
      {
        id: 'b5q5',
        question: '_____ you watch TV last night?',
        options: ['Do', 'Does', 'Did', 'Was'],
        correctAnswer: 2,
        explanation: '"Did" is correct. Simple Past yes/no questions start with DID. (Do/Does are for present tense.)',
      },
      {
        id: 'b5q6',
        question: 'I _____ pizza for dinner yesterday.',
        options: ['eat', 'eats', 'ate', 'eaten'],
        correctAnswer: 2,
        explanation: '"Ate" is correct. "Eat" is irregular — its Simple Past form is "ate."',
      },
    ],
  },
];

// ── ELEMENTARY CURRICULUM (A2) ───────────────────────────────────────────────

export const ELEMENTARY_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Present Simple vs Continuous',
    icon: '🔄',
    iconBg: '#d4f5e0',
    estimatedTime: '40 min',
    lessons: [
      {
        id: 'e1l1',
        title: 'Simple Present: Habits & Facts',
        icon: '📅',
        formulaLabel: 'Formula',
        formula: 'Subject + base verb (-s/-es for he/she/it)',
        theoryBody:
          'Use Simple Present for habits, routines, and general facts. These are things that happen regularly or are always true.',
        examples: [
          'They play football every Sunday.',
          'Water boils at 100°C.',
          'My father works in a hospital.',
        ],
        tip: 'Key words: every day, always, usually, often, sometimes, never.',
      },
      {
        id: 'e1l2',
        title: 'Present Continuous: Happening Now',
        icon: '▶️',
        formulaLabel: 'Formula',
        formula: 'Subject + am/is/are + verb-ing',
        theoryBody:
          'Use Present Continuous for actions happening RIGHT NOW or around the current time. It shows something is in progress at this moment.',
        examples: [
          'Look! The baby is sleeping.',
          'She is washing her hair right now.',
          'I am studying for my exam this week.',
        ],
        tip: 'Key words: now, right now, look!, at the moment, currently, today.',
      },
      {
        id: 'e1l3',
        title: 'Simple Present vs Continuous: The Difference',
        icon: '⚖️',
        formulaLabel: 'Rule',
        formula: 'Habit → Simple Present | Happening now → Continuous',
        theoryBody:
          'The key difference: Simple Present = regular habit. Present Continuous = happening at this exact moment. Context (time words) usually tells you which to use.',
        examples: [
          'She plays tennis on weekends. (habit)',
          'She is playing tennis right now. (happening now)',
          'I usually walk to school, but today I am taking the bus.',
        ],
        tip: 'Ask yourself: Is this something that happens regularly, or is it happening right now?',
      },
      {
        id: 'e1l4',
        title: 'Stative Verbs: No -ing Form',
        icon: '🚫',
        formulaLabel: 'Rule',
        formula: 'Know, like, want, need, love, hate → no -ing',
        theoryBody:
          'Some verbs describe states, not actions. These verbs are NOT used in continuous form. Common ones: know, like, want, need, love, hate, see, hear, have (possess).',
        examples: [
          'I know the answer. ✓ (NOT "I am knowing")',
          'She likes coffee. ✓ (NOT "She is liking")',
          'He wants a new phone. ✓ (NOT "He is wanting")',
        ],
        tip: 'If the verb describes a feeling, thought, or state — never add -ing.',
      },
      {
        id: 'e1l5',
        title: 'Present Continuous: Future Plans',
        icon: '🗓️',
        formulaLabel: 'Usage',
        formula: 'am/is/are + verb-ing (for arranged future)',
        theoryBody:
          'Present Continuous can also describe a fixed plan or arrangement for the near future — something you have already organised.',
        examples: [
          "I'm meeting my friend tomorrow. (already arranged)",
          "We're having a party on Saturday.",
          "She's flying to Bali next week.",
        ],
        tip: 'Future use of Present Continuous = already planned/arranged. "Going to" also works here.',
      },
      {
        id: 'e1l6',
        title: 'Questions & Negatives in Both Tenses',
        icon: '❓',
        formulaLabel: 'Formulas',
        formula: 'Do/Does + base verb? | Am/Is/Are + verb-ing?',
        theoryBody:
          'Questions and negatives follow different patterns for each tense. Simple Present uses do/does. Present Continuous uses am/is/are.',
        examples: [
          'Do you play football? / Does he play football?',
          'Are you playing football now? / Is he playing?',
          "I don't like spicy food. / I'm not eating now.",
        ],
        tip: 'Simple Present negative: don\'t/doesn\'t. Continuous negative: am not/isn\'t/aren\'t + verb-ing.',
      },
    ],
    questions: [
      {
        id: 'e1q1',
        question: 'They _____ football every Sunday.',
        options: ['are playing', 'play', 'plays', 'played'],
        correctAnswer: 1,
        explanation: '"Play" is correct. "Every Sunday" shows a regular habit — use Simple Present.',
      },
      {
        id: 'e1q2',
        question: 'Look! The baby _____.',
        fillSentence: 'Look! The baby _____.',
        fillAnswer: 'is sleeping',
        options: ['sleep', 'sleeps', 'is sleeping', 'slept'],
        correctAnswer: 2,
        explanation: '"Is sleeping" is correct. "Look!" signals something is happening right now — use Present Continuous.',
      },
      {
        id: 'e1q3',
        question: 'Water _____ at 100°C.',
        options: ['is boiling', 'boil', 'boils', 'boiled'],
        correctAnswer: 2,
        explanation: '"Boils" is correct. This is a scientific fact — use Simple Present.',
      },
      {
        id: 'e1q4',
        question: 'She _____ her hair right now.',
        fillSentence: 'She _____ her hair right now.',
        fillAnswer: 'is washing',
        options: ['washes', 'is washing', 'wash', 'washed'],
        correctAnswer: 1,
        explanation: '"Is washing" is correct. "Right now" signals an action in progress — use Present Continuous.',
      },
      {
        id: 'e1q5',
        question: 'I _____ the answer. (state of knowledge)',
        options: ['am knowing', 'knows', 'know', 'am know'],
        correctAnswer: 2,
        explanation: '"Know" is correct. "Know" is a stative verb — it describes a state of mind, not an action. Never use -ing.',
      },
      {
        id: 'e1q6',
        question: "Which sentence is CORRECT?",
        options: [
          'I am wanting a pizza.',
          'She is knowing the answer.',
          'They are playing football right now.',
          'He is having a car.',
        ],
        correctAnswer: 2,
        explanation: '"They are playing football right now" is correct. Want, know, and have (possess) are stative verbs — they cannot use -ing.',
      },
    ],
  },
  {
    id: 2,
    title: 'Simple Past',
    icon: '⏮️',
    iconBg: '#fff5d6',
    estimatedTime: '45 min',
    lessons: [
      {
        id: 'e2l1',
        title: 'Regular Past Verbs: -ed',
        icon: '✏️',
        formulaLabel: 'Formula',
        formula: 'Subject + verb + -ed',
        theoryBody:
          'For regular verbs, add -ed to make the Simple Past. Use it for actions that started AND finished in the past.',
        examples: [
          'I walked to school yesterday.',
          'She cooked dinner last night.',
          'We watched a great movie on Saturday.',
        ],
        tip: 'Verbs ending in -e: add -d (like→liked). Short vowel + consonant: double it (stop→stopped).',
      },
      {
        id: 'e2l2',
        title: 'Irregular Past Verbs',
        icon: '⚠️',
        formulaLabel: 'Key Verbs',
        formula: 'buy→bought, meet→met, go→went, eat→ate, write→wrote, see→saw',
        theoryBody:
          'Many common verbs are irregular — they do NOT use -ed. Their past forms must be memorised. They are the same for all subjects.',
        examples: [
          'He bought a new phone yesterday.',
          'I met my best friend at the park.',
          'They went to Bali last year.',
        ],
        tip: 'More irregular verbs: come→came, get→got, give→gave, take→took, make→made, think→thought.',
      },
      {
        id: 'e2l3',
        title: 'Past Negative: Didn\'t',
        icon: '❌',
        formulaLabel: 'Formula',
        formula: "Subject + didn't + base verb",
        theoryBody:
          "To make Simple Past negative, use \"didn't\" (did not) + base verb. The main verb goes back to base form — no -ed.",
        examples: [
          "We didn't go to school last Monday.",
          "She didn't finish her homework.",
          "I didn't see that movie.",
        ],
        tip: '"Didn\'t" already shows past tense. Never say "didn\'t went" — always "didn\'t go."',
      },
      {
        id: 'e2l4',
        title: 'Past Questions: Did',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'Did + subject + base verb?',
        theoryBody:
          'To ask a yes/no question in Simple Past, put DID first. The main verb goes back to base form. For WH- questions, add the question word before DID.',
        examples: [
          'Did she pass the exam?',
          'Where did you go last weekend?',
          'What did they buy at the market?',
        ],
        tip: 'Short answers: Yes, I did. / No, I didn\'t. WH- questions: What/Where/When/Why/How + did + subject + base verb?',
      },
      {
        id: 'e2l5',
        title: 'Past Time Expressions',
        icon: '📅',
        formulaLabel: 'Key Words',
        formula: 'yesterday, last night/week/year, ago, in 2020',
        theoryBody:
          'Time expressions in Simple Past tell you WHEN in the past the action happened. They usually go at the beginning or end of the sentence.',
        examples: [
          'I visited my grandparents last Sunday.',
          'She graduated three years ago.',
          'They moved to Jakarta in 2019.',
        ],
        tip: '"Ago" always goes AFTER the time period: "two days ago," "a week ago," never "ago two days."',
      },
      {
        id: 'e2l6',
        title: 'Was / Were in the Past',
        icon: '🕐',
        formulaLabel: 'Formula',
        formula: 'I/He/She/It + was | You/We/They + were',
        theoryBody:
          '"Was" and "were" are the past forms of "to be." Use them for past states, descriptions, and locations.',
        examples: [
          'The weather was cold last week.',
          'They were very happy at the party.',
          'I was at home all day yesterday.',
        ],
        tip: 'Negative: wasn\'t / weren\'t. Questions: Was it...? / Were they...?',
      },
    ],
    questions: [
      {
        id: 'e2q1',
        question: 'He _____ a new phone yesterday.',
        fillSentence: 'He _____ a new phone yesterday.',
        fillAnswer: 'bought',
        options: ['buyed', 'bought', 'buys', 'buying'],
        correctAnswer: 1,
        explanation: '"Bought" is correct. "Buy" is an irregular verb — its Simple Past form is "bought," not "buyed."',
      },
      {
        id: 'e2q2',
        question: 'We _____ to school last Monday.',
        options: ["didn't go", "don't go", "wasn't go", "not went"],
        correctAnswer: 0,
        explanation: '"Didn\'t go" is correct. Simple Past negative = didn\'t + base verb. "Go" stays as base form.',
      },
      {
        id: 'e2q3',
        question: '_____ she pass the exam?',
        options: ['Was', 'Does', 'Did', 'Is'],
        correctAnswer: 2,
        explanation: '"Did" is correct. Simple Past yes/no questions start with DID. "Was" is only for "to be."',
      },
      {
        id: 'e2q4',
        question: 'I _____ my best friend at the park.',
        fillSentence: 'I _____ my best friend at the park.',
        fillAnswer: 'met',
        options: ['meeted', 'met', 'meet', 'meets'],
        correctAnswer: 1,
        explanation: '"Met" is correct. "Meet" is irregular — its Simple Past form is "met."',
      },
      {
        id: 'e2q5',
        question: 'Where _____ you go last weekend?',
        options: ['do', 'does', 'did', 'was'],
        correctAnswer: 2,
        explanation: '"Did" is correct. WH- questions in Simple Past: Where/What/When + did + subject + base verb?',
      },
      {
        id: 'e2q6',
        question: 'They _____ very happy at the party.',
        options: ['is', 'are', 'was', 'were'],
        correctAnswer: 3,
        explanation: '"Were" is correct. "They" is plural — use "were" as the past form of "to be."',
      },
    ],
  },
  {
    id: 3,
    title: 'Future: Going To & Will',
    icon: '🚀',
    iconBg: '#ddeeff',
    estimatedTime: '40 min',
    lessons: [
      {
        id: 'e3l1',
        title: 'Going To: Plans & Intentions',
        icon: '📋',
        formulaLabel: 'Formula',
        formula: 'Subject + am/is/are + going to + base verb',
        theoryBody:
          '"Going to" expresses a plan or intention that was decided BEFORE the moment of speaking. You have already thought about it.',
        examples: [
          'I am going to visit my grandmother tomorrow.',
          'She is going to study medicine at university.',
          'We are going to buy a new house next year.',
        ],
        tip: 'If you can say "I\'ve already decided to...", use "going to."',
      },
      {
        id: 'e3l2',
        title: 'Will: Spontaneous Decisions',
        icon: '⚡',
        formulaLabel: 'Formula',
        formula: 'Subject + will + base verb',
        theoryBody:
          '"Will" is used for decisions made AT THE MOMENT of speaking — spontaneous reactions. Also used for promises and offers.',
        examples: [
          'A: "I\'m thirsty." B: "I\'ll get you some water." (spontaneous)',
          'Don\'t worry, I\'ll help you. (promise)',
          'A: "The phone is ringing." B: "I\'ll answer it."',
        ],
        tip: 'If you decide JUST NOW while speaking, use "will." If you decided earlier, use "going to."',
      },
      {
        id: 'e3l3',
        title: 'Going To: Predictions with Evidence',
        icon: '🌩️',
        formulaLabel: 'Usage',
        formula: 'Evidence present → going to (certain prediction)',
        theoryBody:
          'Use "going to" for predictions based on something you can SEE right now — visible evidence that points to a certain outcome.',
        examples: [
          'Look at those clouds! It is going to rain.',
          'Watch out! You are going to fall!',
          'She looks very pale — she is going to faint.',
        ],
        tip: 'If you can see the evidence with your eyes, use "going to." "Will" for more general predictions.',
      },
      {
        id: 'e3l4',
        title: 'Will: General Predictions',
        icon: '🔮',
        formulaLabel: 'Usage',
        formula: 'will + base verb (prediction without present evidence)',
        theoryBody:
          '"Will" is used for general predictions about the future — things you believe or think will happen, without current visible evidence.',
        examples: [
          'I think robots will do many jobs in the future.',
          'She will probably pass the exam — she studies hard.',
          'Technology will change a lot in the next decade.',
        ],
        tip: 'Common with: think, believe, probably, maybe, I\'m sure, I hope.',
      },
      {
        id: 'e3l5',
        title: 'Will: Promises & Offers',
        icon: '🤝',
        formulaLabel: 'Usage',
        formula: "I'll / We'll + base verb (promise or offer)",
        theoryBody:
          '"Will" is used to make promises or offers to help someone. These are also made spontaneously in response to a situation.',
        examples: [
          "I'll call you when I arrive. (promise)",
          "I'll carry that for you. (offer)",
          "We'll finish the project by Friday. (promise)",
        ],
        tip: 'Contraction "\'ll" is very common in spoken English for will.',
      },
      {
        id: 'e3l6',
        title: 'Will vs Going To: Summary',
        icon: '📊',
        formulaLabel: 'Summary',
        formula: 'Plan/intention/evidence → going to | Spontaneous/promise/general prediction → will',
        theoryBody:
          'Both "will" and "going to" talk about the future, but they have different uses. The context and timing of the decision is the key difference.',
        examples: [
          '"I\'m going to study tonight." (already planned)',
          '"Oh! I\'ll study tonight." (just decided now)',
          '"It\'s going to rain." (evidence: dark clouds) vs "It will rain tomorrow." (general prediction)',
        ],
        tip: 'In everyday spoken English, many native speakers use both interchangeably for general future.',
      },
    ],
    questions: [
      {
        id: 'e3q1',
        question: 'I _____ visit my grandmother tomorrow. (already decided)',
        options: ['will', 'am going to', 'go to', 'going to'],
        correctAnswer: 1,
        explanation: '"Am going to" is correct. This is a pre-planned intention decided before speaking.',
      },
      {
        id: 'e3q2',
        question: 'A: "I\'m thirsty." B: "I _____ get you some water."',
        fillSentence: 'A: "I\'m thirsty." B: "I _____ get you some water."',
        fillAnswer: "'ll",
        options: ["'ll", 'am going to', 'go to', 'was going to'],
        correctAnswer: 0,
        explanation: '"\'ll" (will) is correct. This is a spontaneous decision made at the moment of speaking.',
      },
      {
        id: 'e3q3',
        question: 'Look at those clouds! It _____ rain.',
        options: ['will', 'is going to', 'goes to', 'would'],
        correctAnswer: 1,
        explanation: '"Is going to" is correct. The dark clouds are visible evidence — use "going to" for predictions with present evidence.',
      },
      {
        id: 'e3q4',
        question: 'Don\'t worry, I _____ help you. (promise)',
        fillSentence: "Don't worry, I _____ help you.",
        fillAnswer: 'will',
        options: ['will', 'am going to', 'go', 'going to'],
        correctAnswer: 0,
        explanation: '"Will" is correct. Promises use "will," not "going to."',
      },
      {
        id: 'e3q5',
        question: 'I think technology _____ change a lot in the next decade.',
        options: ['is going to', 'goes to', 'will', 'going'],
        correctAnswer: 2,
        explanation: '"Will" is correct. This is a general prediction about the future without specific present evidence — use "will."',
      },
      {
        id: 'e3q6',
        question: 'She _____ be a doctor when she grows up. (her life plan)',
        options: ['will', 'is going to', 'goes to', 'would'],
        correctAnswer: 1,
        explanation: '"Is going to" is correct. This is a long-term plan or intention she has already decided.',
      },
    ],
  },
  {
    id: 4,
    title: 'Comparatives & Superlatives',
    icon: '📊',
    iconBg: '#ffeee8',
    estimatedTime: '35 min',
    lessons: [
      {
        id: 'e4l1',
        title: 'Comparative: Short Adjectives',
        icon: '📏',
        formulaLabel: 'Formula',
        formula: 'Short adjective + -er + than',
        theoryBody:
          'Use comparatives to compare two things. For short adjectives (1 syllable), add -er. Spelling rules: double the final consonant if needed.',
        examples: [
          'My sister is taller than me.',
          'Today is hotter than yesterday.',
          'This bag is cheaper than that one.',
        ],
        tip: 'Spelling: big→bigger, hot→hotter (double consonant). Adjectives ending in -y: happy→happier.',
      },
      {
        id: 'e4l2',
        title: 'Comparative: Long Adjectives',
        icon: '📐',
        formulaLabel: 'Formula',
        formula: 'more + long adjective + than',
        theoryBody:
          'For long adjectives (2+ syllables), use "more" before the adjective instead of adding -er.',
        examples: [
          'This book is more interesting than that one.',
          'She is more intelligent than her brother.',
          'The new phone is more expensive than the old one.',
        ],
        tip: 'Rule of thumb: 1 syllable → add -er. 2+ syllables → use "more." Exception: 2-syllable adjectives ending in -y use -er (happier, easier).',
      },
      {
        id: 'e4l3',
        title: 'Superlative: Short Adjectives',
        icon: '🏆',
        formulaLabel: 'Formula',
        formula: 'the + short adjective + -est',
        theoryBody:
          'Use superlatives to describe the extreme of a quality among THREE or more things. Always use "the" before the superlative.',
        examples: [
          'Mount Everest is the highest mountain in the world.',
          'This is the cheapest restaurant in town.',
          'She is the tallest student in the class.',
        ],
        tip: 'Superlatives always need "the" before them. Compare 3+ things with superlative.',
      },
      {
        id: 'e4l4',
        title: 'Superlative: Long Adjectives',
        icon: '🥇',
        formulaLabel: 'Formula',
        formula: 'the most + long adjective',
        theoryBody:
          'For long adjectives (2+ syllables), use "the most" before the adjective to make the superlative.',
        examples: [
          'That was the most interesting film I have ever seen.',
          'She is the most hardworking person in the office.',
          'This is the most expensive hotel in the city.',
        ],
        tip: 'Pattern matches comparative: short adjective → -est, long adjective → most.',
      },
      {
        id: 'e4l5',
        title: 'Irregular Comparatives & Superlatives',
        icon: '⚠️',
        formulaLabel: 'Key Forms',
        formula: 'good→better→best | bad→worse→worst | far→farther→farthest',
        theoryBody:
          'Some adjectives are completely irregular — their comparative and superlative forms are different words entirely. These must be memorised.',
        examples: [
          'She is the best student in class. (good→best)',
          'This is the worst movie I have seen. (bad→worst)',
          'He is a better cook than his father. (good→better)',
        ],
        tip: 'Most important irregular forms: good/well→better→best, bad→worse→worst, far→farther→farthest.',
      },
    ],
    questions: [
      {
        id: 'e4q1',
        question: 'This book is _____ than that one.',
        fillSentence: 'This book is _____ than that one.',
        fillAnswer: 'more interesting',
        options: ['interestinger', 'more interesting', 'most interesting', 'the most interesting'],
        correctAnswer: 1,
        explanation: '"More interesting" is correct. "Interesting" has 4 syllables — long adjective, use "more + adjective + than."',
      },
      {
        id: 'e4q2',
        question: 'Mount Everest is the _____ mountain in the world.',
        options: ['more high', 'higher', 'highest', 'most high'],
        correctAnswer: 2,
        explanation: '"Highest" is correct. "High" is a short (1-syllable) adjective — superlative = the + adjective + -est.',
      },
      {
        id: 'e4q3',
        question: 'My sister is _____ than me.',
        options: ['more tall', 'tallest', 'the tallest', 'taller'],
        correctAnswer: 3,
        explanation: '"Taller" is correct. Comparing two people — use comparative. "Tall" is short (1 syllable) → add -er.',
      },
      {
        id: 'e4q4',
        question: 'This is the _____ movie I have ever seen.',
        fillSentence: 'This is the _____ movie I have ever seen.',
        fillAnswer: 'worst',
        options: ['baddest', 'most bad', 'worse', 'worst'],
        correctAnswer: 3,
        explanation: '"Worst" is correct. "Bad" is irregular: bad → worse → worst. Superlative of "bad" = worst.',
      },
      {
        id: 'e4q5',
        question: 'Today is _____ than yesterday.',
        options: ['more hot', 'hottest', 'hotter', 'the hotter'],
        correctAnswer: 2,
        explanation: '"Hotter" is correct. Comparing two days — use comparative. "Hot" is short + ends in consonant → double it: hotter.',
      },
      {
        id: 'e4q6',
        question: 'She is the _____ student in class.',
        options: ['more good', 'gooder', 'better', 'best'],
        correctAnswer: 3,
        explanation: '"Best" is correct. "Good" is irregular: good → better → best. Superlative of "good" = best.',
      },
    ],
  },
  {
    id: 5,
    title: 'Some, Any & Articles',
    icon: '🔖',
    iconBg: '#f0eeff',
    estimatedTime: '35 min',
    lessons: [
      {
        id: 'e5l1',
        title: 'A / An: Indefinite Articles',
        icon: '1️⃣',
        formulaLabel: 'Rule',
        formula: 'a + consonant sound | an + vowel sound (a, e, i, o, u)',
        theoryBody:
          'Use "a" or "an" when talking about one non-specific thing for the first time. "A" before consonant sounds, "an" before vowel sounds.',
        examples: [
          'I saw a dog in the park.',
          'She is an engineer.',
          'He ate an apple and a banana.',
        ],
        tip: 'It\'s the SOUND that matters, not the letter: "a university" (sounds like "you"), "an hour" (h is silent).',
      },
      {
        id: 'e5l2',
        title: 'The: Definite Article',
        icon: '🎯',
        formulaLabel: 'Rule',
        formula: 'the = we both know which one',
        theoryBody:
          'Use "the" when both the speaker and listener know which specific thing is being talked about — already mentioned, unique, or specific.',
        examples: [
          'I saw a dog. The dog was very friendly. (second mention)',
          'The sun rises in the east. (unique thing)',
          'Please close the door. (specific door in context)',
        ],
        tip: 'First mention = a/an. Second mention (or specific) = the.',
      },
      {
        id: 'e5l3',
        title: 'Some: Positive Sentences',
        icon: '✅',
        formulaLabel: 'Rule',
        formula: 'some + plural/uncountable noun (positive sentences & offers)',
        theoryBody:
          'Use "some" in positive (affirmative) sentences with plural countable nouns or uncountable nouns. Also used in offers.',
        examples: [
          'There are some apples in the basket.',
          'I need some advice from you.',
          'Would you like some coffee?',
        ],
        tip: '"Some" = a certain amount/number. Use in positive sentences and when offering something.',
      },
      {
        id: 'e5l4',
        title: 'Any: Negatives & Questions',
        icon: '❓',
        formulaLabel: 'Rule',
        formula: 'any + plural/uncountable noun (negatives & questions)',
        theoryBody:
          '"Any" is used in negative sentences and questions. It replaces "some" in these contexts.',
        examples: [
          "She doesn't have any friends in this city.",
          'Is there any milk left?',
          "I don't have any money.",
        ],
        tip: 'Simple rule: positive → some. Negative/question → any.',
      },
      {
        id: 'e5l5',
        title: 'A / An vs Some',
        icon: '⚖️',
        formulaLabel: 'Rule',
        formula: 'a/an = one thing | some = an unspecified amount',
        theoryBody:
          '"A/an" is used for singular countable nouns (one item). "Some" is used for plural countable nouns or uncountable nouns (an unspecified amount).',
        examples: [
          'Can I have a glass of water? (one specific glass)',
          'Can I have some water? (an amount of water)',
          'I bought a book. / I bought some books.',
        ],
        tip: 'A/an → always singular. Some → plural or uncountable. Never "a water" — water is uncountable.',
      },
    ],
    questions: [
      {
        id: 'e5q1',
        question: 'There are _____ apples in the basket.',
        fillSentence: 'There are _____ apples in the basket.',
        fillAnswer: 'some',
        options: ['some', 'any', 'a', 'an'],
        correctAnswer: 0,
        explanation: '"Some" is correct. This is a positive sentence with a plural noun — use "some."',
      },
      {
        id: 'e5q2',
        question: 'Is there _____ milk left?',
        options: ['some', 'any', 'a', 'the'],
        correctAnswer: 1,
        explanation: '"Any" is correct. This is a question — use "any" in questions with uncountable nouns.',
      },
      {
        id: 'e5q3',
        question: 'I need _____ advice from you.',
        options: ['a', 'an', 'some', 'any'],
        correctAnswer: 2,
        explanation: '"Some" is correct. "Advice" is uncountable — never "an advice." Use "some" in positive sentences.',
      },
      {
        id: 'e5q4',
        question: "She doesn't have _____ friends in this city.",
        fillSentence: "She doesn't have _____ friends in this city.",
        fillAnswer: 'any',
        options: ['some', 'any', 'a', 'an'],
        correctAnswer: 1,
        explanation: '"Any" is correct. Negative sentences use "any," not "some."',
      },
      {
        id: 'e5q5',
        question: 'Can I have _____ glass of water?',
        options: ['a', 'an', 'some', 'any'],
        correctAnswer: 0,
        explanation: '"A" is correct. "Glass" is a singular countable noun starting with a consonant sound — use "a."',
      },
      {
        id: 'e5q6',
        question: 'She is _____ engineer.',
        options: ['a', 'an', 'some', 'the'],
        correctAnswer: 1,
        explanation: '"An" is correct. "Engineer" starts with a vowel sound (e) — use "an," not "a."',
      },
    ],
  },
];

// ── UPPER INTERMEDIATE CURRICULUM (B2) ───────────────────────────────────────

export const UPPER_INTERMEDIATE_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Reported Speech',
    icon: '🗣️',
    iconBg: '#d4f5e0',
    estimatedTime: '55 min',
    lessons: [
      {
        id: 'u1l1',
        title: 'Reporting Statements: Tense Backshift',
        icon: '📢',
        formulaLabel: 'Rule',
        formula: 'Direct → Indirect: present→past, will→would, can→could',
        theoryBody:
          'When reporting what someone said, the tense usually shifts back (backshift). Present Simple → Past Simple, Present Continuous → Past Continuous, Will → Would, Can → Could.',
        examples: [
          '"I am tired." → He said that he was tired.',
          '"She works here." → He said she worked there.',
          '"I will call you." → She said she would call me.',
        ],
        tip: 'If the reporting verb (said, told) is past, backshift the tense. If it\'s present (says, tells), no backshift needed.',
      },
      {
        id: 'u1l2',
        title: 'Reporting Questions',
        icon: '❓',
        formulaLabel: 'Formula',
        formula: 'ask + if/whether (yes/no) | ask + WH-word (WH-questions)',
        theoryBody:
          'Reported questions use statement word order (subject + verb), not question word order. Yes/no questions use "if" or "whether." WH-questions keep the question word.',
        examples: [
          '"Do you like coffee?" → She asked me if I liked coffee.',
          '"Where do you live?" → He asked where I lived.',
          '"Are you coming?" → She asked whether I was coming.',
        ],
        tip: 'No question mark in reported questions. Word order: subject + verb (NOT "she asked where did I live").',
      },
      {
        id: 'u1l3',
        title: 'Reporting Commands & Requests',
        icon: '📋',
        formulaLabel: 'Formula',
        formula: 'tell/ask + object + (not) to + base verb',
        theoryBody:
          'Commands and requests in reported speech use "tell" or "ask" + object + to-infinitive. Negative commands add "not" before "to."',
        examples: [
          '"Close the door." → He told me to close the door.',
          '"Please help me." → She asked me to help her.',
          '"Don\'t touch that." → She told him not to touch that.',
        ],
        tip: 'Tell = stronger command. Ask = polite request. Both followed by object + to-infinitive.',
      },
      {
        id: 'u1l4',
        title: 'Reporting Verbs Beyond "Said"',
        icon: '🎭',
        formulaLabel: 'Key Verbs',
        formula: 'admit, deny, suggest, promise, warn, claim, explain, insist',
        theoryBody:
          'English has many specific reporting verbs. Using the right verb adds precision and avoids repetition. Each verb has a specific grammatical pattern.',
        examples: [
          'He admitted stealing the money.',
          'She promised to call me later.',
          'They warned us not to go there.',
        ],
        tip: 'Patterns: verb + -ing (admit, deny, suggest), verb + to-inf (promise, offer, refuse), verb + obj + to-inf (warn, tell, advise).',
      },
      {
        id: 'u1l5',
        title: 'Changes in Time & Place Expressions',
        icon: '📅',
        formulaLabel: 'Changes',
        formula: 'now→then, today→that day, here→there, tomorrow→the next day',
        theoryBody:
          'When reporting speech said at a different time or place, expressions of time and place also change.',
        examples: [
          '"I\'ll see you tomorrow." → She said she would see me the next day.',
          '"I was here yesterday." → He said he had been there the day before.',
          '"I\'m doing this now." → She said she was doing it then.',
        ],
        tip: 'Only change time/place words if the situation is truly different. If reporting immediately, no change needed.',
      },
      {
        id: 'u1l6',
        title: 'No Backshift: General Truths & Recent Speech',
        icon: '💡',
        formulaLabel: 'Exceptions',
        formula: 'No backshift for: general truths, recent speech, present reporting verb',
        theoryBody:
          'Backshift is NOT always required. Skip it when: (1) the information is still true now, (2) you are reporting very recent speech, (3) the reporting verb is present tense.',
        examples: [
          '"The Earth orbits the Sun." → He said the Earth orbits the Sun. (still true)',
          'She says she is coming. (present reporting verb)',
          '"I love you." → He just said he loves me. (very recent)',
        ],
        tip: 'When in doubt, backshift. But general truths (scientific facts) rarely need it.',
      },
    ],
    questions: [
      {
        id: 'u1q1',
        question: 'He said, "I am tired." → He said that he _____ tired.',
        fillSentence: 'He said that he _____ tired.',
        fillAnswer: 'was',
        options: ['is', 'was', 'were', 'has been'],
        correctAnswer: 1,
        explanation: '"Was" is correct. Backshift: "am" (present) → "was" (past) in reported speech.',
      },
      {
        id: 'u1q2',
        question: 'She asked, "Do you like coffee?" → She asked me _____ coffee.',
        options: ['if I liked', 'if I like', 'do I like', 'whether do I like'],
        correctAnswer: 0,
        explanation: '"If I liked" is correct. Yes/no questions use "if/whether" + subject + verb (backshifted, statement order).',
      },
      {
        id: 'u1q3',
        question: '"Please close the door," he said. → He asked me _____ the door.',
        fillSentence: 'He asked me _____ the door.',
        fillAnswer: 'to close',
        options: ['close', 'to close', 'closing', 'closed'],
        correctAnswer: 1,
        explanation: '"To close" is correct. Reported requests: ask + object + to-infinitive.',
      },
      {
        id: 'u1q4',
        question: 'They said, "We will call you tomorrow." → They said they _____ call me the next day.',
        options: ['will', 'would', 'shall', 'should'],
        correctAnswer: 1,
        explanation: '"Would" is correct. Backshift: "will" → "would" in reported speech.',
      },
      {
        id: 'u1q5',
        question: '"Don\'t touch that!" she told him. → She told him _____ that.',
        options: ["don't touch", 'not touch', 'not to touch', 'to not touch'],
        correctAnswer: 2,
        explanation: '"Not to touch" is correct. Negative reported commands: tell + object + not + to-infinitive.',
      },
      {
        id: 'u1q6',
        question: 'He asked, "Where did you go?" → He asked me where I _____.',
        options: ['went', 'had gone', 'go', 'have gone'],
        correctAnswer: 1,
        explanation: '"Had gone" is correct. Backshift: Simple Past → Past Perfect in reported WH-questions.',
      },
    ],
  },
  {
    id: 2,
    title: 'Relative Clauses',
    icon: '🔗',
    iconBg: '#fff5d6',
    estimatedTime: '50 min',
    lessons: [
      {
        id: 'u2l1',
        title: 'Defining Relative Clauses',
        icon: '🎯',
        formulaLabel: 'Pronouns',
        formula: 'who (people), which (things), that (people/things), where (place), when (time)',
        theoryBody:
          'Defining relative clauses identify WHICH person or thing we are talking about. Without this clause, the sentence loses its meaning. No commas used.',
        examples: [
          'The woman who called yesterday is my aunt.',
          'That\'s the book that I told you about.',
          'Paris is the city where they got married.',
        ],
        tip: '"That" can replace "who" or "which" in defining clauses. It cannot be used in non-defining clauses.',
      },
      {
        id: 'u2l2',
        title: 'Non-Defining Relative Clauses',
        icon: '📌',
        formulaLabel: 'Rule',
        formula: 'who/which (NOT that) + commas around the clause',
        theoryBody:
          'Non-defining relative clauses add EXTRA information about something already identified. They are separated by commas. "That" cannot be used here.',
        examples: [
          'My sister, who lives in London, is a doctor.',
          'The Eiffel Tower, which was built in 1889, is very famous.',
          'My boss, who I greatly respect, is retiring next year.',
        ],
        tip: 'Test: remove the clause. If the sentence still makes sense, it\'s non-defining — use commas.',
      },
      {
        id: 'u2l3',
        title: 'Whose: Possession',
        icon: '🏠',
        formulaLabel: 'Formula',
        formula: 'whose + noun (shows possession for people and things)',
        theoryBody:
          '"Whose" is the relative pronoun showing possession. It replaces "his/her/its/their" and is used for both people and things.',
        examples: [
          'The house whose roof was damaged has been repaired.',
          'She is the student whose essay won first prize.',
          'I know a man whose brother is a famous actor.',
        ],
        tip: '"Whose" = "of whom / of which." It always directly precedes a noun.',
      },
      {
        id: 'u2l4',
        title: 'Omitting the Relative Pronoun',
        icon: '✂️',
        formulaLabel: 'Rule',
        formula: 'Omit who/which/that when it is the OBJECT of the clause',
        theoryBody:
          'In defining relative clauses, you can omit the relative pronoun when it is the object of the clause (not the subject). You cannot omit it when it is the subject.',
        examples: [
          'The book (that) I bought was expensive. (omit — "I" is subject)',
          'The man who called me was very polite. (keep — "who" is subject)',
          'The film (which) we watched was brilliant. (omit — "we" is subject)',
        ],
        tip: 'If there is already a subject after the relative pronoun, you can omit the pronoun.',
      },
      {
        id: 'u2l5',
        title: 'Where, When & Why in Relative Clauses',
        icon: '📍',
        formulaLabel: 'Pronouns',
        formula: 'where = in/at which | when = in/on which | why = for which',
        theoryBody:
          '"Where" refers to places, "when" refers to times, and "why" refers to reasons. These can sometimes be replaced with "which" + preposition.',
        examples: [
          'That\'s the restaurant where we first met.',
          'I remember the day when we graduated.',
          'I don\'t understand the reason why he left.',
        ],
        tip: '"The reason why" can be shortened to "the reason" or "why" alone in informal English.',
      },
      {
        id: 'u2l6',
        title: 'Relative Clauses: Common Mistakes',
        icon: '⚠️',
        formulaLabel: 'Rules',
        formula: 'No double pronoun: "the man who I met him" ✗',
        theoryBody:
          'A very common mistake is adding an extra pronoun after the relative clause. In English, the relative pronoun replaces the noun — do not repeat it.',
        examples: [
          'The man (that) I met was very kind. ✓ (NOT "the man that I met him")',
          'The book (which) I bought was expensive. ✓ (NOT "the book which I bought it")',
          'She is the person who helped me. ✓ (NOT "who she helped me")',
        ],
        tip: 'One reference only: either use the relative pronoun OR the extra pronoun — never both.',
      },
    ],
    questions: [
      {
        id: 'u2q1',
        question: 'The woman _____ called yesterday is my aunt.',
        options: ['who', 'which', 'whose', 'whom'],
        correctAnswer: 0,
        explanation: '"Who" is correct. Use "who" for people in defining relative clauses.',
      },
      {
        id: 'u2q2',
        question: 'That\'s the book _____ I told you about.',
        options: ['who', 'whose', 'which', 'whom'],
        correctAnswer: 2,
        explanation: '"Which" is correct. Use "which" (or "that") for things in defining relative clauses.',
      },
      {
        id: 'u2q3',
        question: 'My sister, _____ lives in London, is a doctor.',
        fillSentence: 'My sister, _____ lives in London, is a doctor.',
        fillAnswer: 'who',
        options: ['that', 'which', 'who', 'whose'],
        correctAnswer: 2,
        explanation: '"Who" is correct. This is a non-defining clause (commas used). "That" cannot be used in non-defining clauses.',
      },
      {
        id: 'u2q4',
        question: 'The house _____ roof was damaged has been repaired.',
        options: ['who', 'which', 'whose', 'that'],
        correctAnswer: 2,
        explanation: '"Whose" is correct. It shows possession — the house\'s roof.',
      },
      {
        id: 'u2q5',
        question: 'Paris is the city _____ they got married.',
        options: ['which', 'where', 'that', 'when'],
        correctAnswer: 1,
        explanation: '"Where" is correct. Use "where" for places in relative clauses.',
      },
      {
        id: 'u2q6',
        question: 'Which sentence is CORRECT?',
        options: [
          'The man that I met him was very kind.',
          'The book which I bought it was expensive.',
          'She is the person who helped me.',
          'This is the house where I lived in it.',
        ],
        correctAnswer: 2,
        explanation: '"She is the person who helped me" is correct. The others have double pronouns (met him, bought it, lived in it) which is incorrect.',
      },
    ],
  },
  {
    id: 3,
    title: 'Advanced Passive Voice',
    icon: '🔄',
    iconBg: '#ddeeff',
    estimatedTime: '50 min',
    lessons: [
      {
        id: 'u3l1',
        title: 'Passive with Reporting Verbs',
        icon: '📰',
        formulaLabel: 'Formula',
        formula: 'It is said/believed/reported that... | Subject + is said/believed + to-inf',
        theoryBody:
          'Use passive reporting verbs to describe what people generally believe or report, without specifying who. Two structures: "It is said that..." or subject + "is said to..."',
        examples: [
          'It is believed that the suspect has left the country.',
          'The president is said to be in good health.',
          'It is reported that hundreds of people were affected.',
        ],
        tip: 'Common verbs: say, believe, think, know, report, consider, claim, expect, understand.',
      },
      {
        id: 'u3l2',
        title: 'Causative: Have Something Done',
        icon: '🔧',
        formulaLabel: 'Formula',
        formula: 'have + object + past participle (someone does it FOR you)',
        theoryBody:
          'The causative "have" structure means you arrange for someone else to do something for you. You don\'t do it yourself.',
        examples: [
          'I had my car repaired. (I didn\'t repair it — a mechanic did)',
          'She is having her hair cut tomorrow.',
          'We had the house painted last month.',
        ],
        tip: '"Have something done" = you arranged it. "Get something done" is more informal and means the same thing.',
      },
      {
        id: 'u3l3',
        title: 'Causative: Get Something Done',
        icon: '⚙️',
        formulaLabel: 'Formula',
        formula: 'get + object + past participle (informal causative)',
        theoryBody:
          '"Get something done" is the informal equivalent of "have something done." It is very common in spoken English.',
        examples: [
          'I need to get my laptop fixed.',
          'She got her photo taken by a professional.',
          'You should get your eyes tested.',
        ],
        tip: '"Get something done" can also imply difficulty or effort in arranging something.',
      },
      {
        id: 'u3l4',
        title: 'Passive Infinitives & Gerunds',
        icon: '📝',
        formulaLabel: 'Formulas',
        formula: 'to be + past participle | being + past participle',
        theoryBody:
          'Passive forms can be used as infinitives (to be done) and gerunds (being done) within larger sentence structures.',
        examples: [
          'She expected to be promoted this year.',
          'He hates being interrupted when he\'s working.',
          'The report needs to be submitted by Friday.',
        ],
        tip: 'After prepositions and some verbs (enjoy, hate, mind, avoid), use "being + past participle."',
      },
      {
        id: 'u3l5',
        title: 'Passive: Perfect Infinitive',
        icon: '⏳',
        formulaLabel: 'Formula',
        formula: 'to have been + past participle',
        theoryBody:
          'The passive perfect infinitive is used to talk about a past action that was done (or should have been done) to the subject.',
        examples: [
          'She is said to have been a great musician in her youth.',
          'They are reported to have been arrested last night.',
          'He claims to have been misunderstood.',
        ],
        tip: '"To have been done" refers to a past action. "To be done" refers to a present or future action.',
      },
      {
        id: 'u3l6',
        title: 'Double Object Passives',
        icon: '🔀',
        formulaLabel: 'Rule',
        formula: 'Active: give sb sth → Passive: sb was given sth / sth was given to sb',
        theoryBody:
          'Verbs that take two objects (give, send, show, offer, teach, tell) can form two different passive structures.',
        examples: [
          'They gave her a prize → She was given a prize. / A prize was given to her.',
          'Someone told me the news → I was told the news.',
          'They showed us the way → We were shown the way.',
        ],
        tip: 'The person object usually becomes the subject when both passive forms are possible.',
      },
    ],
    questions: [
      {
        id: 'u3q1',
        question: 'It is believed that the suspect _____ the country.',
        options: ['left', 'has left', 'leaves', 'is leaving'],
        correctAnswer: 1,
        explanation: '"Has left" is correct. The passive reporting structure "It is believed that..." reports current belief about a past action — use Present Perfect.',
      },
      {
        id: 'u3q2',
        question: 'I need to get my car _____.',
        options: ['repair', 'repaired', 'repairing', 'to repair'],
        correctAnswer: 1,
        explanation: '"Repaired" is correct. Causative "get": get + object + past participle. Someone will repair it for me.',
      },
      {
        id: 'u3q3',
        question: 'The new museum _____ by the mayor next month.',
        options: ['will open', 'will be opened', 'is opening', 'opens'],
        correctAnswer: 1,
        explanation: '"Will be opened" is correct. Future passive = will + be + past participle.',
      },
      {
        id: 'u3q4',
        question: 'She had her photo _____ by a professional.',
        fillSentence: 'She had her photo _____ by a professional.',
        fillAnswer: 'taken',
        options: ['take', 'taking', 'taken', 'took'],
        correctAnswer: 2,
        explanation: '"Taken" is correct. Causative "have": have + object + past participle.',
      },
      {
        id: 'u3q5',
        question: 'She expected _____ for the role after her brilliant audition.',
        options: ['to select', 'to be selected', 'being selected', 'to have selected'],
        correctAnswer: 1,
        explanation: '"To be selected" is correct. Passive infinitive = to be + past participle.',
      },
      {
        id: 'u3q6',
        question: 'They are said _____ the company last year.',
        options: ['to sell', 'to have sold', 'selling', 'sold'],
        correctAnswer: 1,
        explanation: '"To have sold" is correct. Passive reporting + past action = subject + is/are said + to have + past participle.',
      },
    ],
  },
  {
    id: 4,
    title: 'Advanced Conditionals',
    icon: '🔀',
    iconBg: '#ffeee8',
    estimatedTime: '55 min',
    lessons: [
      {
        id: 'u4l1',
        title: 'Unless, As Long As & Provided That',
        icon: '📌',
        formulaLabel: 'Meanings',
        formula: 'unless = if not | as long as / provided that = only if (condition)',
        theoryBody:
          '"Unless" introduces a negative condition (= if not). "As long as" and "provided that" introduce a positive condition that must be met.',
        examples: [
          "Unless you study regularly, you won't improve.",
          'You can borrow my car as long as you drive carefully.',
          'Provided that you arrive on time, we can start.',
        ],
        tip: 'Unless = if...not. Never use "unless" with a negative verb — it creates a double negative.',
      },
      {
        id: 'u4l2',
        title: 'In Case vs If',
        icon: '🛡️',
        formulaLabel: 'Difference',
        formula: 'in case = as a precaution (prepare for possibility) | if = condition',
        theoryBody:
          '"In case" means you do something as a precaution for a possible future event. "If" is a condition — the action depends on the event happening.',
        examples: [
          'Take an umbrella in case it rains. (precaution)',
          'Take an umbrella if it rains. (only if it actually rains)',
          'I\'ll write it down in case I forget.',
        ],
        tip: '"In case" = prepare before the event. "If" = react when the event happens.',
      },
      {
        id: 'u4l3',
        title: 'Suppose / Imagine / What If',
        icon: '💭',
        formulaLabel: 'Patterns',
        formula: 'Suppose/Imagine/What if + past simple (hypothetical present)',
        theoryBody:
          '"Suppose," "imagine," and "what if" introduce hypothetical situations. They work like Second Conditional — followed by past simple for unreal present situations.',
        examples: [
          'Suppose you won a million dollars, what would you do?',
          'Imagine you could fly — where would you go?',
          'What if she doesn\'t come? What will we do?',
        ],
        tip: '"Suppose/Imagine + past" = hypothetical (unreal). "What if + present" = real possibility.',
      },
      {
        id: 'u4l4',
        title: "I'd Rather & It's Time",
        icon: '🕐',
        formulaLabel: 'Formulas',
        formula: "I'd rather + subject + past simple | It's (high) time + subject + past simple",
        theoryBody:
          '"I\'d rather" expresses a preference for someone else\'s action. "It\'s (high) time" says that something should have happened already. Both are followed by past simple (subjunctive).',
        examples: [
          "I'd rather you didn't call me so late at night.",
          "It's time we left for the airport.",
          "It's high time you started thinking about your future.",
        ],
        tip: 'The past simple after "I\'d rather" and "It\'s time" does NOT refer to the past — it refers to the present or future.',
      },
      {
        id: 'u4l5',
        title: 'Even If & Whether Or Not',
        icon: '⚡',
        formulaLabel: 'Meanings',
        formula: 'even if = the condition doesn\'t change the result | whether or not = in both cases',
        theoryBody:
          '"Even if" shows that the result is the same regardless of the condition. "Whether or not" covers both possibilities (if X happens or doesn\'t happen).',
        examples: [
          'Even if I had the money, I wouldn\'t buy that car.',
          "I'll finish this project whether or not you help me.",
          "Even if she apologises, I won't forgive her.",
        ],
        tip: '"Even if" emphasises that the condition is surprising or extreme — but still doesn\'t change the outcome.',
      },
      {
        id: 'u4l6',
        title: 'Conditional Inversion (Formal)',
        icon: '🎩',
        formulaLabel: 'Formulas',
        formula: 'Had I known... | Were it not for... | Should you need...',
        theoryBody:
          'In formal English, "if" can be omitted and the auxiliary moved to the front. This is called conditional inversion and sounds very formal or literary.',
        examples: [
          'Had I known, I would have helped. (= If I had known...)',
          'Were it not for your help, we would have failed. (= If it were not for...)',
          'Should you need any assistance, please contact us. (= If you should need...)',
        ],
        tip: 'Inversion: Had / Were / Should + subject → used in formal writing, legal texts, and business English.',
      },
    ],
    questions: [
      {
        id: 'u4q1',
        question: "_____ you study regularly, you won't improve.",
        options: ['Unless', 'If', 'Provided', 'Even if'],
        correctAnswer: 0,
        explanation: '"Unless" is correct. "Unless you study" = "If you don\'t study." The result is negative if the condition isn\'t met.',
      },
      {
        id: 'u4q2',
        question: 'You can borrow my car _____ you drive carefully.',
        options: ['unless', 'even if', 'as long as', 'in case'],
        correctAnswer: 2,
        explanation: '"As long as" is correct. It sets a positive condition that must be met: only if you drive carefully.',
      },
      {
        id: 'u4q3',
        question: 'Suppose you _____ a million dollars, what would you do?',
        fillSentence: 'Suppose you _____ a million dollars, what would you do?',
        fillAnswer: 'won',
        options: ['win', 'won', 'had won', 'have won'],
        correctAnswer: 1,
        explanation: '"Won" is correct. "Suppose + past simple" introduces a hypothetical present situation — like Second Conditional.',
      },
      {
        id: 'u4q4',
        question: "I'd rather you _____ quiet during the film.",
        options: ['keep', 'kept', 'had kept', 'will keep'],
        correctAnswer: 1,
        explanation: '"Kept" is correct. "I\'d rather + subject + past simple" expresses preference about someone else\'s behaviour.',
      },
      {
        id: 'u4q5',
        question: "It's time we _____ for the airport. We're going to be late!",
        options: ['leave', 'left', 'had left', 'are leaving'],
        correctAnswer: 1,
        explanation: '"Left" is correct. "It\'s time + subject + past simple" says something should happen now.',
      },
      {
        id: 'u4q6',
        question: '_____ I known about the problem, I would have helped.',
        options: ['If', 'Did', 'Had', 'Would'],
        correctAnswer: 2,
        explanation: '"Had" is correct. Conditional inversion: "Had I known..." = "If I had known..." — formal structure without "if."',
      },
    ],
  },
  {
    id: 5,
    title: 'Future Perfect & Continuous',
    icon: '🔭',
    iconBg: '#f0eeff',
    estimatedTime: '45 min',
    lessons: [
      {
        id: 'u5l1',
        title: 'Future Perfect: Completed Before a Point',
        icon: '🏁',
        formulaLabel: 'Formula',
        formula: 'will have + past participle',
        theoryBody:
          'Future Perfect describes an action that will be completed BEFORE a specific point in the future. It looks back from a future moment.',
        examples: [
          'By next year, she will have worked here for ten years.',
          'I hope you will have finished the report by the time the boss arrives.',
          'By 2030, scientists will have found a cure.',
        ],
        tip: 'Key words: by (then/next week/the time), before, when (future point).',
      },
      {
        id: 'u5l2',
        title: 'Future Perfect: Negative & Questions',
        icon: '❓',
        formulaLabel: 'Formulas',
        formula: 'will not have + past participle | Will + subject + have + past participle?',
        theoryBody:
          'Make Future Perfect negative with "will not have" (won\'t have). Questions: move "will" to the front.',
        examples: [
          "By Friday, I won't have finished all the work.",
          'Will they have arrived by the time we get there?',
          "She won't have heard the news yet.",
        ],
        tip: '"Won\'t have + past participle" = Future Perfect negative. Very common with "yet" and "by."',
      },
      {
        id: 'u5l3',
        title: 'Future Perfect Continuous',
        icon: '⏳',
        formulaLabel: 'Formula',
        formula: 'will have been + verb-ing',
        theoryBody:
          'Future Perfect Continuous emphasises the DURATION of an activity up to a point in the future. It shows how long something will have been happening.',
        examples: [
          'By next month, I will have been studying English for three years.',
          'She will have been working here for a decade by December.',
          'When you arrive, I will have been waiting for two hours.',
        ],
        tip: 'Use with "for" + duration. Emphasises the ongoing nature and duration, not just completion.',
      },
      {
        id: 'u5l4',
        title: 'Future Continuous: In Progress at a Future Time',
        icon: '▶️',
        formulaLabel: 'Formula',
        formula: 'will be + verb-ing',
        theoryBody:
          'Future Continuous describes an action that will be IN PROGRESS at a specific moment in the future.',
        examples: [
          'At 9 PM tomorrow, I will be watching the game.',
          'This time next week, we will be lying on the beach.',
          "Don't call me at noon — I'll be having lunch.",
        ],
        tip: 'Key phrase: "at this time tomorrow / next week / in two hours" — signals Future Continuous.',
      },
      {
        id: 'u5l5',
        title: 'Future Perfect vs Future Continuous',
        icon: '⚖️',
        formulaLabel: 'Difference',
        formula: 'Perfect = completed before point | Continuous = in progress at point',
        theoryBody:
          'Future Perfect = action completed before a future point. Future Continuous = action in progress at a future point.',
        examples: [
          'By 9 PM, I will have finished dinner. (done before 9 PM)',
          'At 9 PM, I will be eating dinner. (in progress at 9 PM)',
          'By June, she will have graduated. vs In June, she will be graduating.',
        ],
        tip: '"By" → usually Future Perfect. "At" or "this time" → usually Future Continuous.',
      },
    ],
    questions: [
      {
        id: 'u5q1',
        question: 'By next year, she _____ here for ten years.',
        fillSentence: 'By next year, she _____ here for ten years.',
        fillAnswer: 'will have worked',
        options: ['will work', 'will have worked', 'has worked', 'is working'],
        correctAnswer: 1,
        explanation: '"Will have worked" is correct. "By next year" signals Future Perfect — completed before a future point.',
      },
      {
        id: 'u5q2',
        question: 'By next month, I _____ English for three years.',
        options: ['will study', 'will have studied', 'will have been studying', 'have been studying'],
        correctAnswer: 2,
        explanation: '"Will have been studying" is correct. "For three years" with an ongoing activity emphasises duration — use Future Perfect Continuous.',
      },
      {
        id: 'u5q3',
        question: 'At 9 PM tomorrow, I _____ the game.',
        options: ['will watch', 'will have watched', 'will be watching', 'watch'],
        correctAnswer: 2,
        explanation: '"Will be watching" is correct. "At 9 PM tomorrow" is a specific future moment — action in progress = Future Continuous.',
      },
      {
        id: 'u5q4',
        question: '_____ they have arrived by the time we get there?',
        options: ['Will', 'Do', 'Have', 'Are'],
        correctAnswer: 0,
        explanation: '"Will" is correct. Future Perfect question = Will + subject + have + past participle.',
      },
      {
        id: 'u5q5',
        question: "You look tired. You _____ all night again, haven't you?",
        options: [
          'will work',
          'have been working',
          'will have been working',
          'will be working',
        ],
        correctAnswer: 1,
        explanation: '"Have been working" is correct. The evidence (tired) points to an action that started in the past and continued — Present Perfect Continuous.',
      },
      {
        id: 'u5q6',
        question: "I hope you _____ the report by the time the boss arrives.",
        options: ['finish', 'will finish', 'will have finished', 'have finished'],
        correctAnswer: 2,
        explanation: '"Will have finished" is correct. The report must be completed BEFORE the boss arrives — Future Perfect.',
      },
    ],
  },
];

// ── ADVANCED CURRICULUM (C1) ──────────────────────────────────────────────────

export const ADVANCED_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Inversion',
    icon: '🔃',
    iconBg: '#d4f5e0',
    estimatedTime: '55 min',
    lessons: [
      {
        id: 'a1l1',
        title: 'Negative Adverbials: Never, Rarely, Seldom',
        icon: '🚫',
        formulaLabel: 'Formula',
        formula: 'Never/Rarely/Seldom + auxiliary + subject + main verb',
        theoryBody:
          'When a negative adverb (never, rarely, seldom, hardly, barely) is placed at the START of a sentence for emphasis, the subject and auxiliary are inverted — like a question.',
        examples: [
          'Never have I seen such a beautiful sunset.',
          'Rarely do we get weather like this.',
          'Seldom has she been so nervous.',
        ],
        tip: 'Inversion after negative adverbials = very formal/literary. Common in written English, speeches, and advanced writing.',
      },
      {
        id: 'a1l2',
        title: 'Not Only... But Also',
        icon: '➕',
        formulaLabel: 'Formula',
        formula: 'Not only + auxiliary + subject + verb, but (subject) also...',
        theoryBody:
          'When "not only" starts a clause, inversion occurs in that clause. The second clause (but also) uses normal word order.',
        examples: [
          'Not only was he late, but he also forgot his homework.',
          'Not only did she win the prize, but she also broke the record.',
          'Not only is she talented, but she is also hardworking.',
        ],
        tip: '"Not only...but also" is a common structure in formal writing to add emphasis and show two connected points.',
      },
      {
        id: 'a1l3',
        title: 'Hardly / Scarcely / No Sooner',
        icon: '⏱️',
        formulaLabel: 'Formulas',
        formula: 'Hardly/Scarcely + had + subject + pp + when... | No sooner + had + subject + pp + than...',
        theoryBody:
          'These structures describe two past events where one happened almost immediately after the other. Inversion occurs in the first clause.',
        examples: [
          'Hardly had I sat down when the phone rang.',
          'Scarcely had she left when it started to rain.',
          'No sooner had he arrived than the meeting started.',
        ],
        tip: '"Hardly/Scarcely + when" / "No sooner + than." Use Past Perfect in the first clause.',
      },
      {
        id: 'a1l4',
        title: 'Only When / Only After / Only If',
        icon: '🎯',
        formulaLabel: 'Formula',
        formula: 'Only + time/condition expression + auxiliary + subject + verb',
        theoryBody:
          '"Only" followed by a time or conditional expression at the start of a sentence triggers inversion.',
        examples: [
          'Only when he explained did I understand.',
          'Only after the meeting did they reveal the truth.',
          'Only if you work hard will you succeed.',
        ],
        tip: '"Only" at the start = emphasis on restriction. Inversion applies to the MAIN clause, not the "only" clause.',
      },
      {
        id: 'a1l5',
        title: 'So / Such + Inversion',
        icon: '💥',
        formulaLabel: 'Formula',
        formula: 'So + adjective + be + subject... | Such + be + subject...',
        theoryBody:
          '"So" and "such" at the start of a sentence cause inversion to show a strong result or degree. Common in formal and literary contexts.',
        examples: [
          'So tired was she that she fell asleep immediately.',
          'So beautiful was the view that no one spoke.',
          'Such was his talent that everyone admired him.',
        ],
        tip: '"So + adjective + was + subject" = formal and emphatic. The result follows with "that."',
      },
      {
        id: 'a1l6',
        title: 'Under No Circumstances / At No Time',
        icon: '⛔',
        formulaLabel: 'Formula',
        formula: 'Under no circumstances / At no time + auxiliary + subject + verb',
        theoryBody:
          'Phrases like "under no circumstances," "at no time," "on no account," and "in no way" begin with negatives and always cause inversion.',
        examples: [
          'Under no circumstances should you reveal this information.',
          'At no time did he admit his mistake.',
          'On no account are you to leave this building.',
        ],
        tip: 'These phrases are very formal. Common in official instructions, signs, and legal or business English.',
      },
    ],
    questions: [
      {
        id: 'a1q1',
        question: 'Never _____ such a beautiful sunset.',
        fillSentence: 'Never _____ such a beautiful sunset.',
        fillAnswer: 'have I seen',
        options: ['I have seen', 'have I seen', 'did I see', 'I saw'],
        correctAnswer: 1,
        explanation: '"Have I seen" is correct. Negative adverbial inversion: Never + have/has + subject + past participle.',
      },
      {
        id: 'a1q2',
        question: 'Not only _____ late, but he also forgot his homework.',
        options: ['he was', 'was he', 'he had been', 'had he been'],
        correctAnswer: 1,
        explanation: '"Was he" is correct. "Not only" at the start triggers inversion: Not only + was/had + subject.',
      },
      {
        id: 'a1q3',
        question: 'Hardly _____ sat down when the phone rang.',
        options: ['I had', 'had I', 'I have', 'have I'],
        correctAnswer: 1,
        explanation: '"Had I" is correct. "Hardly" + inversion: Hardly + had + subject + past participle + when.',
      },
      {
        id: 'a1q4',
        question: 'Under no circumstances _____ reveal this information.',
        options: ['you should', 'should you', 'you must', 'must you'],
        correctAnswer: 1,
        explanation: '"Should you" is correct. "Under no circumstances" triggers inversion: should + subject.',
      },
      {
        id: 'a1q5',
        question: 'So tired _____ that she fell asleep immediately.',
        options: ['she was', 'was she', 'she had been', 'had she been'],
        correctAnswer: 1,
        explanation: '"Was she" is correct. "So + adjective" at the start inverts subject and verb: So tired was she...',
      },
      {
        id: 'a1q6',
        question: 'Only after the meeting _____ they reveal the truth.',
        options: ['did', 'do', 'have', 'had'],
        correctAnswer: 0,
        explanation: '"Did" is correct. "Only after" triggers inversion in the main clause: Only after... + did + subject + base verb.',
      },
    ],
  },
  {
    id: 2,
    title: 'Wish, If Only & Regret',
    icon: '💫',
    iconBg: '#fff5d6',
    estimatedTime: '50 min',
    lessons: [
      {
        id: 'a2l1',
        title: 'Wish + Past Simple: Present Regret',
        icon: '😔',
        formulaLabel: 'Formula',
        formula: 'I wish + subject + past simple (present unreal wish)',
        theoryBody:
          '"Wish + past simple" expresses dissatisfaction with the PRESENT situation — you want things to be different now.',
        examples: [
          'I wish I lived closer to work.',
          'She wishes she could speak Japanese.',
          'I wish the weather were better today.',
        ],
        tip: '"Were" is used for all subjects (I wish I were, she wishes she were) in formal English — though "was" is acceptable in informal speech.',
      },
      {
        id: 'a2l2',
        title: 'Wish + Past Perfect: Past Regret',
        icon: '😞',
        formulaLabel: 'Formula',
        formula: 'I wish + subject + past perfect (past regret)',
        theoryBody:
          '"Wish + past perfect" expresses regret about something in the PAST that cannot be changed.',
        examples: [
          'I wish I had studied harder at school.',
          'She wishes she had taken that job offer.',
          'They wish they had arrived earlier.',
        ],
        tip: '"Wish + had + past participle" = I regret what happened (or didn\'t happen) in the past.',
      },
      {
        id: 'a2l3',
        title: 'Wish + Would: Annoyance or Desire for Change',
        icon: '😤',
        formulaLabel: 'Formula',
        formula: 'I wish + subject + would + base verb (wanting change in behaviour)',
        theoryBody:
          '"Wish + would" expresses annoyance about someone\'s current behaviour or a desire for them to change. Cannot use "I wish I would."',
        examples: [
          "I wish he would stop smoking.",
          "She wishes her neighbours wouldn't make so much noise.",
          "I wish it would stop raining.",
        ],
        tip: 'Cannot say "I wish I would..." — use "I wish I could..." instead. "Would" implies desire for someone/something else to change.',
      },
      {
        id: 'a2l4',
        title: 'If Only: Stronger Regret',
        icon: '😭',
        formulaLabel: 'Formula',
        formula: 'If only + past simple/past perfect (more emotional than "wish")',
        theoryBody:
          '"If only" follows the same grammar as "wish" but expresses stronger, more emotional regret. It can stand alone as an exclamation.',
        examples: [
          'If only I had more time!',
          'If only she had listened to my advice!',
          'If only we had left earlier — we missed the train.',
        ],
        tip: '"If only" = wish but more emphatic. Often used in emotional contexts, complaints, and dramatic situations.',
      },
      {
        id: 'a2l5',
        title: "It's Time & I'd Rather (Subjunctive)",
        icon: '🕐',
        formulaLabel: 'Formulas',
        formula: "It's (high) time + subject + past simple | I'd rather + subject + past simple",
        theoryBody:
          '"It\'s time" with past simple suggests something should happen now (or is overdue). "I\'d rather" with past simple expresses preference for someone else\'s action.',
        examples: [
          "It's time you started taking your health seriously.",
          "It's high time the government took action.",
          "I'd rather you didn't tell anyone about this.",
        ],
        tip: 'Both structures use past simple but refer to PRESENT or FUTURE situations — not the past.',
      },
      {
        id: 'a2l6',
        title: 'Would Rather vs Prefer',
        icon: '⚖️',
        formulaLabel: 'Formulas',
        formula: "would rather + base verb (than) | prefer + noun/-ing (to) / prefer + to-inf (rather than)",
        theoryBody:
          '"Would rather" and "prefer" both express preference. "Would rather" is followed by base verb. "Prefer" is followed by -ing or to-infinitive depending on structure.',
        examples: [
          "I'd rather stay home than go to the party.",
          'I prefer cooking at home to eating out.',
          "She'd rather you called before coming.",
        ],
        tip: '"Would rather + base verb" for immediate preference. "Prefer + -ing" for general preference.',
      },
    ],
    questions: [
      {
        id: 'a2q1',
        question: 'I wish I _____ harder when I was at school.',
        options: ['study', 'studied', 'had studied', 'would study'],
        correctAnswer: 2,
        explanation: '"Had studied" is correct. Regret about a past situation = wish + past perfect.',
      },
      {
        id: 'a2q2',
        question: 'If only the government _____ something about pollution now.',
        options: ['does', 'did', 'had done', 'would do'],
        correctAnswer: 1,
        explanation: '"Did" is correct. Dissatisfaction with a present situation = if only + past simple.',
      },
      {
        id: 'a2q3',
        question: "I'd rather you _____ call me before coming over.",
        fillSentence: "I'd rather you _____ call me before coming over.",
        fillAnswer: 'would',
        options: ['will', 'would', 'should', 'did'],
        correctAnswer: 1,
        explanation: '"Would" is correct. "I\'d rather + subject + would" expresses desire for someone else\'s future behaviour.',
      },
      {
        id: 'a2q4',
        question: "It's high time you _____ seriously about your future.",
        options: ['think', 'thought', 'had thought', 'are thinking'],
        correctAnswer: 1,
        explanation: '"Thought" is correct. "It\'s (high) time + past simple" = this should happen now (overdue).',
      },
      {
        id: 'a2q5',
        question: 'I wish the weather _____ so unpredictable lately.',
        options: ["wasn't", "weren't", "hadn't been", "wouldn't be"],
        correctAnswer: 2,
        explanation: '"Hadn\'t been" is correct. "Lately" suggests a recent ongoing situation — use past perfect to express regret about it.',
      },
      {
        id: 'a2q6',
        question: "I wish he _____ stop interrupting me when I'm speaking!",
        options: ['will', 'would', 'could', 'should'],
        correctAnswer: 1,
        explanation: '"Would" is correct. Annoyance about someone\'s repeated behaviour = wish + would.',
      },
    ],
  },
  {
    id: 3,
    title: 'Advanced Modal Verbs',
    icon: '⚙️',
    iconBg: '#ddeeff',
    estimatedTime: '55 min',
    lessons: [
      {
        id: 'a3l1',
        title: 'Should Have: Criticism & Regret',
        icon: '😤',
        formulaLabel: 'Formula',
        formula: 'should have + past participle (past obligation not fulfilled)',
        theoryBody:
          '"Should have" expresses that something was the right thing to do in the past, but it wasn\'t done. It can express criticism (of others) or regret (about oneself).',
        examples: [
          'You should have told me about the meeting! I missed it.',
          'I should have studied more — I failed the exam.',
          'She should have called before coming.',
        ],
        tip: '"Should have" = the right action was NOT taken. "Shouldn\'t have" = a wrong action WAS taken.',
      },
      {
        id: 'a3l2',
        title: 'Must Have & Can\'t Have: Past Deduction',
        icon: '🔍',
        formulaLabel: 'Formula',
        formula: 'must have + pp (almost certain) | can\'t have + pp (impossible)',
        theoryBody:
          '"Must have" is used when you are almost certain about a past situation based on evidence. "Can\'t have" is used when you are certain something was impossible.',
        examples: [
          'She must have taken the wrong road — she never arrived.',
          "He can't have passed the exam — he never studied.",
          "They must have been exhausted after running a marathon.",
        ],
        tip: 'Present deduction: must be / can\'t be. Past deduction: must have been / can\'t have been.',
      },
      {
        id: 'a3l3',
        title: 'Could Have & Might Have: Past Possibility',
        icon: '🎲',
        formulaLabel: 'Formula',
        formula: 'could have + pp (unrealised possibility) | might have + pp (uncertain past)',
        theoryBody:
          '"Could have" means something was possible in the past but didn\'t happen. "Might have" expresses uncertainty about what happened in the past.',
        examples: [
          'I could have gone to the party, but I decided to stay home.',
          'She might have taken the wrong bus — I\'m not sure.',
          'You could have been hurt! That was very dangerous.',
        ],
        tip: '"Could have" = had the ability/opportunity but didn\'t use it. "Might have" = maybe it happened, maybe not.',
      },
      {
        id: 'a3l4',
        title: 'Needn\'t Have vs Didn\'t Need To',
        icon: '🤔',
        formulaLabel: 'Difference',
        formula: "needn't have + pp (did it, but unnecessarily) | didn't need to (didn't do it)",
        theoryBody:
          'These two structures look similar but mean different things. "Needn\'t have" = you did something but it wasn\'t necessary. "Didn\'t need to" = it wasn\'t necessary, and you didn\'t do it.',
        examples: [
          "You needn't have bought flowers — I already had some. (you bought them)",
          "I didn't need to buy flowers because my friend brought some. (I didn't buy them)",
          "She needn't have cooked so much food. (she cooked it unnecessarily)",
        ],
        tip: 'Key difference: "needn\'t have" = action happened unnecessarily. "Didn\'t need to" = action didn\'t happen.',
      },
      {
        id: 'a3l5',
        title: 'Would Have: Unrealised Past Intention',
        icon: '💭',
        formulaLabel: 'Formula',
        formula: 'would have + past participle (past intention/plan that didn\'t happen)',
        theoryBody:
          '"Would have" expresses an intention, plan, or willingness in the past that was not fulfilled — usually because something prevented it.',
        examples: [
          "I would have called you, but I lost my phone.",
          "She would have helped, but she didn't know about the problem.",
          'We would have arrived on time, but there was a traffic jam.',
        ],
        tip: '"Would have" in Third Conditional result clauses. Also used alone to explain why something didn\'t happen.',
      },
      {
        id: 'a3l6',
        title: 'Degrees of Certainty: All Modals',
        icon: '📊',
        formulaLabel: 'Scale',
        formula: 'must (95%) > should (80%) > may/might (50%) > could (30%) > can\'t (0%)',
        theoryBody:
          'Modal verbs express different degrees of certainty. Understanding this scale helps you choose the right modal for the right level of confidence.',
        examples: [
          'He must be at home — his lights are on. (95% sure)',
          'She might be in a meeting. (50% sure)',
          "They can't have left — their car is still here. (0% — impossible)",
        ],
        tip: 'Present: must be / might be / can\'t be. Past: must have been / might have been / can\'t have been.',
      },
    ],
    questions: [
      {
        id: 'a3q1',
        question: 'You _____ told me about the meeting! I missed it completely.',
        options: ['should have', 'must have', 'could have', 'would have'],
        correctAnswer: 0,
        explanation: '"Should have" is correct. It expresses criticism — the right action (telling me) was NOT taken.',
      },
      {
        id: 'a3q2',
        question: 'She _____ taken the wrong road — she never arrived.',
        fillSentence: 'She _____ taken the wrong road — she never arrived.',
        fillAnswer: 'must have',
        options: ['must have', "can't have", 'should have', 'would have'],
        correctAnswer: 0,
        explanation: '"Must have" is correct. The evidence (she never arrived) points strongly to this conclusion — near certainty.',
      },
      {
        id: 'a3q3',
        question: "He _____ passed the exam — he never studied.",
        options: ["must have", "can't have", 'should have', 'could have'],
        correctAnswer: 1,
        explanation: '"Can\'t have" is correct. It was logically impossible — he never studied.',
      },
      {
        id: 'a3q4',
        question: 'I _____ gone to that party, but I decided to stay home.',
        options: ['must have', "can't have", 'could have', 'should have'],
        correctAnswer: 2,
        explanation: '"Could have" is correct. The opportunity existed but was not taken — an unrealised past possibility.',
      },
      {
        id: 'a3q5',
        question: "You _____ parked there! Now you have a fine.",
        options: ["mustn't have", "shouldn't have", "can't have", "couldn't have"],
        correctAnswer: 1,
        explanation: '"Shouldn\'t have" is correct. Parking there was the wrong action — it happened but it shouldn\'t have.',
      },
      {
        id: 'a3q6',
        question: "I would have called you, but I _____ my phone.",
        options: ['lose', 'lost', 'had lost', 'was losing'],
        correctAnswer: 2,
        explanation: '"Had lost" is correct. The past perfect explains the reason why the intended action (calling) could not happen.',
      },
    ],
  },
  {
    id: 4,
    title: 'Cleft Sentences',
    icon: '✂️',
    iconBg: '#ffeee8',
    estimatedTime: '45 min',
    lessons: [
      {
        id: 'a4l1',
        title: 'It-Cleft: It is/was... that/who',
        icon: '🎯',
        formulaLabel: 'Formula',
        formula: 'It is/was + focused element + that/who + rest of sentence',
        theoryBody:
          'Cleft sentences split a sentence to put focus on ONE element. "It-cleft" uses "It is/was + focus + that/who..." to highlight a specific part.',
        examples: [
          'It was the noise that disturbed me, not the light.',
          'It was in 1969 that humans first landed on the moon.',
          'It is Maria who handles all the accounts.',
        ],
        tip: 'You can cleft any element: subject, object, adverb, or time expression. The focused element goes right after "It was."',
      },
      {
        id: 'a4l2',
        title: 'What-Cleft: What I need is...',
        icon: '❗',
        formulaLabel: 'Formula',
        formula: 'What + subject + verb + is/was + focused element',
        theoryBody:
          '"What-cleft" (also called pseudo-cleft) uses a "what-clause" as the subject to highlight important information. Common for emphasising needs, wants, and feelings.',
        examples: [
          'What I really need is a long holiday.',
          'What surprised me most was her reaction.',
          'What he did was resign immediately.',
        ],
        tip: '"What" here is not a question — it means "the thing that." The focused element comes after "is/was."',
      },
      {
        id: 'a4l3',
        title: 'All-Cleft: All I want is...',
        icon: '💡',
        formulaLabel: 'Formula',
        formula: 'All + subject + verb + is + base verb/noun',
        theoryBody:
          '"All-cleft" uses "all" instead of "what" to narrow the focus and add restriction. It implies "the only thing."',
        examples: [
          'All I want is a cup of tea.',
          'All he did was complain.',
          'All she needs is some rest.',
        ],
        tip: '"All I want is..." = "The only thing I want is..." Strong restriction and focus on simplicity.',
      },
      {
        id: 'a4l4',
        title: 'Cleft Sentences: Tense Agreement',
        icon: '📐',
        formulaLabel: 'Rule',
        formula: 'It is → present focus | It was → past focus',
        theoryBody:
          'The tense of "be" in a cleft sentence matches the time reference. Use "is" for present situations and "was" for past events.',
        examples: [
          'It is the CEO who makes the final decision. (present)',
          'It was the prime minister who announced the policy. (past)',
          'It will be the new system that solves this problem. (future)',
        ],
        tip: 'The verb "be" in cleft sentences must match the time of the situation you are describing.',
      },
      {
        id: 'a4l5',
        title: 'Fronting for Emphasis',
        icon: '⬆️',
        formulaLabel: 'Rule',
        formula: 'Move element to front + (inversion if needed)',
        theoryBody:
          'Another way to add emphasis is "fronting" — moving an element to the front of the sentence. Unlike cleft sentences, the sentence is not split.',
        examples: [
          'That book I have already read. (fronted object)',
          'Into the room walked a tall stranger. (fronted adverb → inversion)',
          'Brilliant though she is, she still makes mistakes.',
        ],
        tip: 'Fronting adds emphasis by breaking the normal word order. Common in literary and formal English.',
      },
    ],
    questions: [
      {
        id: 'a4q1',
        question: '_____ the noise that disturbed me, not the light.',
        options: ['This was', 'It was', 'That was', 'What was'],
        correctAnswer: 1,
        explanation: '"It was" is correct. It-cleft structure: It was + focused element + that + rest.',
      },
      {
        id: 'a4q2',
        question: '_____ I really need is a long holiday.',
        options: ['That', 'It', 'What', 'Which'],
        correctAnswer: 2,
        explanation: '"What" is correct. What-cleft: What + subject + verb + is + focused element.',
      },
      {
        id: 'a4q3',
        question: '_____ in 1969 that humans first landed on the moon.',
        fillSentence: '_____ in 1969 that humans first landed on the moon.',
        fillAnswer: 'It was',
        options: ['It is', 'It was', 'That was', 'There was'],
        correctAnswer: 1,
        explanation: '"It was" is correct. This is a past event — use "It was + time expression + that."',
      },
      {
        id: 'a4q4',
        question: 'What he did _____ resign immediately.',
        options: ['is', 'was', 'were', 'has been'],
        correctAnswer: 1,
        explanation: '"Was" is correct. What-cleft: What he did was + base verb. Past reference → was.',
      },
      {
        id: 'a4q5',
        question: 'All _____ is a cup of tea.',
        options: ['I want', 'do I want', 'want I', 'I am wanting'],
        correctAnswer: 0,
        explanation: '"I want" is correct. All-cleft: All + subject + want + is + focus. Normal statement word order after "All."',
      },
      {
        id: 'a4q6',
        question: 'It is Maria _____ handles all the accounts.',
        options: ['that', 'which', 'who', 'Both A and C'],
        correctAnswer: 3,
        explanation: '"That" or "who" — both are correct when the focused element is a person in it-cleft sentences.',
      },
    ],
  },
  {
    id: 5,
    title: 'Discourse & Cohesion',
    icon: '📝',
    iconBg: '#f0eeff',
    estimatedTime: '50 min',
    lessons: [
      {
        id: 'a5l1',
        title: 'Concession: Despite, Although, However',
        icon: '🤝',
        formulaLabel: 'Key Connectors',
        formula: 'Despite/In spite of + noun/-ing | Although/Even though + clause | However (sentence connector)',
        theoryBody:
          'Concession connectors show contrast — something is unexpected given the previous information. Choose based on what follows: noun/-ing or a full clause.',
        examples: [
          'Despite the bad weather, the event was a great success.',
          'Although it was raining, we went for a walk.',
          'It was raining. However, we went for a walk.',
        ],
        tip: '"Despite/In spite of" + noun or -ing. "Although/Even though" + full clause. "However" starts a new sentence.',
      },
      {
        id: 'a5l2',
        title: 'Addition: Moreover, Furthermore, In Addition',
        icon: '➕',
        formulaLabel: 'Connectors',
        formula: 'Moreover / Furthermore / In addition / What is more + comma',
        theoryBody:
          'Addition connectors add a new point, often one that is stronger or more surprising than the previous one. They are formal and common in academic writing.',
        examples: [
          'The project was delayed. Moreover, the budget had been exceeded.',
          'She is talented. Furthermore, she is incredibly hardworking.',
          'In addition to the obvious advantages, there are several drawbacks.',
        ],
        tip: '"Moreover" and "furthermore" add a STRONGER point. "In addition" simply adds another point.',
      },
      {
        id: 'a5l3',
        title: 'Result & Consequence: Therefore, Consequently',
        icon: '➡️',
        formulaLabel: 'Connectors',
        formula: 'Therefore / Consequently / As a result / Hence',
        theoryBody:
          'Result connectors show that one event CAUSES another. They connect cause to effect. Common in formal writing, arguments, and analysis.',
        examples: [
          'The product was poorly marketed. Consequently, sales were disappointing.',
          'She studied hard. Therefore, she passed the exam.',
          'The weather was extreme. As a result, the match was cancelled.',
        ],
        tip: '"Therefore" = logical conclusion. "Consequently" = cause and effect (often negative). "Hence" = very formal.',
      },
      {
        id: 'a5l4',
        title: 'Contrast: While, Whereas, On the Other Hand',
        icon: '⚖️',
        formulaLabel: 'Connectors',
        formula: 'While/Whereas + clause | On the other hand (sentence connector)',
        theoryBody:
          'Contrast connectors compare two different (often opposite) ideas. They highlight differences between two subjects or situations.',
        examples: [
          'While some people enjoy risk, others prefer security.',
          'Whereas the north is industrial, the south is mostly agricultural.',
          'Some prefer coffee. On the other hand, others prefer tea.',
        ],
        tip: '"While/Whereas" = in the same sentence. "On the other hand" = starts a new sentence.',
      },
      {
        id: 'a5l5',
        title: 'Not Only... But Also & Both... And',
        icon: '🔗',
        formulaLabel: 'Correlatives',
        formula: 'Not only... but (also) | Both... and | Neither... nor | Either... or',
        theoryBody:
          'Correlative conjunctions link two equal elements. They must be grammatically parallel — the same grammatical structure must follow each part.',
        examples: [
          'Not only is she talented, but she is also hardworking.',
          'Both the quality and the price have improved.',
          'Neither the manager nor the staff were informed.',
        ],
        tip: 'Parallelism rule: "Both A and B" — A and B must be the same grammatical form (noun+noun, verb+verb, etc.).',
      },
      {
        id: 'a5l6',
        title: 'Hedging Language: Formal Qualification',
        icon: '🎯',
        formulaLabel: 'Expressions',
        formula: 'It appears/seems that... | would seem | tend to | to some extent | arguably',
        theoryBody:
          'Hedging language makes claims less absolute — it shows awareness of complexity, exceptions, and uncertainty. Essential in academic writing.',
        examples: [
          'It would appear that the policy has had some success.',
          'There tends to be a correlation between education and income.',
          'To some extent, the results confirm our hypothesis.',
        ],
        tip: 'In academic writing, overconfident claims weaken your argument. Hedging = nuanced, mature language.',
      },
    ],
    questions: [
      {
        id: 'a5q1',
        question: '_____ the bad weather, the event was a great success.',
        options: ['Despite', 'Although', 'However', 'Even though'],
        correctAnswer: 0,
        explanation: '"Despite" is correct. "Despite/In spite of" is followed by a noun phrase, not a full clause.',
      },
      {
        id: 'a5q2',
        question: 'The project was delayed. _____, the final result exceeded expectations.',
        options: ['Despite', 'Although', 'Nevertheless', 'Even though'],
        correctAnswer: 2,
        explanation: '"Nevertheless" is correct. It connects two sentences showing unexpected contrast — "despite what was just said, this is also true."',
      },
      {
        id: 'a5q3',
        question: 'Not only is she talented, _____ she is incredibly hardworking.',
        fillSentence: 'Not only is she talented, _____ she is incredibly hardworking.',
        fillAnswer: 'but also',
        options: ['but also', 'and also', 'however', 'moreover'],
        correctAnswer: 0,
        explanation: '"But also" is correct. "Not only... but also" is a fixed correlative conjunction pair.',
      },
      {
        id: 'a5q4',
        question: 'He failed the exam. _____, he has decided to try again.',
        options: ['Although', 'Even so', 'Despite', 'As a result'],
        correctAnswer: 1,
        explanation: '"Even so" is correct. It means "despite that" and introduces a sentence that contrasts with or is unexpected after the previous one.',
      },
      {
        id: 'a5q5',
        question: 'The product was poorly marketed. _____, sales were disappointing.',
        options: ['Nevertheless', 'In spite of', 'Consequently', 'Although'],
        correctAnswer: 2,
        explanation: '"Consequently" is correct. It shows that poor marketing CAUSED the disappointing sales — cause and effect.',
      },
      {
        id: 'a5q6',
        question: '_____ some people enjoy risk, others prefer security.',
        options: ['Despite', 'However', 'While', 'In spite of'],
        correctAnswer: 2,
        explanation: '"While" is correct. "While/Whereas" + clause contrasts two different groups within the same sentence.',
      },
    ],
  },
];

// ── Level Router ──────────────────────────────────────────────────────────────

export const getCurriculumByLevel = (level: string): Chapter[] => {
  switch (level) {
    case 'A1':
      return BEGINNER_CHAPTERS;
    case 'A2':
      return ELEMENTARY_CHAPTERS;
    case 'B1':
      return INTERMEDIATE_CHAPTERS;
    case 'B2':
      return UPPER_INTERMEDIATE_CHAPTERS;
    case 'C1':
    case 'C2':
      return ADVANCED_CHAPTERS;
    default:
      return INTERMEDIATE_CHAPTERS;
  }
};
