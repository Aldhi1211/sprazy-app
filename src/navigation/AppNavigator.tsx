import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, ActivityIndicator } from 'react-native';
import AppIcon from '../components/AppIcon';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../theme/colors';

import {
  RootStackParamList,
  AuthStackParamList,
  OnboardingStackParamList,
  MainTabParamList,
  HomeStackParamList,
  ProficiencyStackParamList,
  ChatStackParamList,
} from './types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import CreatePasswordScreen from '../screens/auth/CreatePasswordScreen';
import CreateUsernameScreen from '../screens/auth/CreateUsernameScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import EnterPasswordScreen from '../screens/auth/EnterPasswordScreen';

import ChooseLanguageScreen from '../screens/onboarding/ChooseLanguageScreen';
import KnowledgeLevelScreen from '../screens/onboarding/KnowledgeLevelScreen';
import WhyStudyingScreen from '../screens/onboarding/WhyStudyingScreen';
import LevelCheckScreen from '../screens/onboarding/LevelCheckScreen';
import ScreeningWelcomeScreen from '../screens/onboarding/ScreeningWelcomeScreen';
import ScreeningQuestionScreen from '../screens/onboarding/ScreeningQuestionScreen';
import ScreeningResultScreen from '../screens/onboarding/ScreeningResultScreen';
import DailyPracticeScreen from '../screens/onboarding/DailyPracticeScreen';
import PremiumScreen from '../screens/onboarding/PremiumScreen';
import WelcomeFirstLessonScreen from '../screens/onboarding/WelcomeFirstLessonScreen';
import LessonLoadingScreen from '../screens/onboarding/LessonLoadingScreen';
import QuoteScreen from '../screens/onboarding/QuoteScreen';

import HomeScreen from '../screens/main/HomeScreen';
import LessonDetailScreen from '../screens/main/LessonDetailScreen';
import PracticeQuizScreen from '../screens/main/PracticeQuizScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ExploreCoursesScreen from '../screens/main/proficiency/ExploreCoursesScreen';
import CourseDetailScreen from '../screens/main/proficiency/CourseDetailScreen';
import LessonMaterialScreen from '../screens/main/proficiency/LessonMaterialScreen';
import ProficiencyQuizScreen from '../screens/main/proficiency/ProficiencyQuizScreen';
import ChatListScreen from '../screens/main/chat/ChatListScreen';
import ConversationScreen from '../screens/main/chat/ConversationScreen';
import AddFriendScreen from '../screens/main/chat/AddFriendScreen';
import FriendProfileScreen from '../screens/main/chat/FriendProfileScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProficiencyStack = createNativeStackNavigator<ProficiencyStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

// ── Auth Navigator ────────────────────────────────────────────────────────────
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <AuthStack.Screen name="Landing" component={LandingScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="CreatePassword" component={CreatePasswordScreen} />
    <AuthStack.Screen name="CreateUsername" component={CreateUsernameScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="EnterPassword" component={EnterPasswordScreen} />
  </AuthStack.Navigator>
);

// ── Onboarding Navigator ──────────────────────────────────────────────────────
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <OnboardingStack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />
    <OnboardingStack.Screen name="KnowledgeLevel" component={KnowledgeLevelScreen} />
    <OnboardingStack.Screen name="WhyStudying" component={WhyStudyingScreen} />
    <OnboardingStack.Screen name="LevelCheck" component={LevelCheckScreen} />
    <OnboardingStack.Screen name="ScreeningWelcome" component={ScreeningWelcomeScreen} />
    <OnboardingStack.Screen name="ScreeningQuestion" component={ScreeningQuestionScreen} />
    <OnboardingStack.Screen name="ScreeningResult" component={ScreeningResultScreen} />
    <OnboardingStack.Screen name="DailyPractice" component={DailyPracticeScreen} />
    <OnboardingStack.Screen name="Premium" component={PremiumScreen} />
    <OnboardingStack.Screen name="WelcomeFirstLesson" component={WelcomeFirstLessonScreen} />
    <OnboardingStack.Screen name="LessonLoading" component={LessonLoadingScreen} />
    <OnboardingStack.Screen name="Quote" component={QuoteScreen} />
  </OnboardingStack.Navigator>
);

// ── Home Stack Navigator ──────────────────────────────────────────────────────
const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <HomeStack.Screen name="ChapterList" component={HomeScreen} />
    <HomeStack.Screen name="LessonDetail" component={LessonDetailScreen} />
    <HomeStack.Screen name="PracticeQuiz" component={PracticeQuizScreen} />
  </HomeStack.Navigator>
);

// ── Proficiency Stack Navigator ───────────────────────────────────────────────
const ProficiencyNavigator = () => (
  <ProficiencyStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <ProficiencyStack.Screen name="ExploreCourses" component={ExploreCoursesScreen} />
    <ProficiencyStack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <ProficiencyStack.Screen name="LessonMaterial" component={LessonMaterialScreen} />
    <ProficiencyStack.Screen name="ProficiencyQuiz" component={ProficiencyQuizScreen} />
  </ProficiencyStack.Navigator>
);

// ── Chat Stack Navigator ──────────────────────────────────────────────────────
const ChatNavigator = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <ChatStack.Screen name="ChatList" component={ChatListScreen} />
    <ChatStack.Screen name="Conversation" component={ConversationScreen} />
    <ChatStack.Screen name="AddFriend" component={AddFriendScreen} />
    <ChatStack.Screen name="FriendProfile" component={FriendProfileScreen} />
  </ChatStack.Navigator>
);

// ── Tab Icon ──────────────────────────────────────────────────────────────────
type TabIconName = 'home' | 'learn' | 'chat' | 'profile';
const TAB_ICON_NAMES: Record<string, TabIconName> = {
  Home: 'home',
  Proficiency: 'learn',
  Chat: 'chat',
  Profile: 'profile',
};
const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Proficiency: 'Proficiency',
  Chat: 'Chat',
  Profile: 'Profile',
};

const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', gap: 3, paddingTop: 4 }}>
    <AppIcon
      name={TAB_ICON_NAMES[label] ?? 'home'}
      size={24}
      opacity={focused ? 1 : 0.35}
    />
    <Text
      style={{
        fontSize: 10,
        fontWeight: '600',
        color: focused ? Colors.primary : '#9E9E9E',
        letterSpacing: 0.2,
      }}>
      {TAB_LABELS[label]}
    </Text>
  </View>
);

// ── Main Tab Navigator ────────────────────────────────────────────────────────
const MainNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          height: 72,
          paddingBottom: 0,
          paddingTop: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: colors.textSub,
        tabBarItemStyle: {
          paddingVertical: 0,
        },
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Proficiency" component={ProficiencyNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// ── Root Navigator ────────────────────────────────────────────────────────────
const AppNavigator = () => {
  const { user, profile, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!user ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !profile?.onboardingComplete ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
