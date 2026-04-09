export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  CreatePassword: { email: string };
  CreateUsername: { email: string; password: string };
  Login: undefined;
  EnterPassword: { email: string };
};

export type OnboardingStackParamList = {
  ChooseLanguage: undefined;
  KnowledgeLevel: { language: string };
  WhyStudying: { language: string; knowledgeLevel: string };
  LevelCheck: { language: string; knowledgeLevel: string; reason: string };
  ScreeningWelcome: { language: string; knowledgeLevel: string; reason: string };
  ScreeningQuestion: { language: string; knowledgeLevel: string; reason: string; questionIndex: number; answers: number[] };
  ScreeningResult: { language: string; knowledgeLevel: string; reason: string; answers: number[] };
  DailyPractice: { language: string; knowledgeLevel: string; reason: string; level: string };
  Premium: { language: string; knowledgeLevel: string; reason: string; level: string; dailyGoal: number };
  WelcomeFirstLesson: undefined;
  LessonLoading: undefined;
  Quote: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Proficiency: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  Conversation: { friendId: string };
  AddFriend: undefined;
  FriendProfile: { friendId: string };
};

export type ProficiencyStackParamList = {
  ExploreCourses: undefined;
  CourseDetail: { courseId: string };
  LessonMaterial: { courseId: string; lessonId: number };
  ProficiencyQuiz: { courseId: string; lessonId: number };
};

export type HomeStackParamList = {
  ChapterList: undefined;
  LessonDetail: { chapterId: number; lessonIndex: number };
  PracticeQuiz: { chapterId: number };
};
