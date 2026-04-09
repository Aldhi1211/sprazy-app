import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

// ── SVG imports ───────────────────────────────────────────────────────────────
import IcAddFriend from '../../assets/icons/ic_add_friend.svg';
import IcArrowRight from '../../assets/icons/ic_arrow_right.svg';
import IcAttach from '../../assets/icons/ic_attach.svg';
import IcBack from '../../assets/icons/ic_back.svg';
import IcBook from '../../assets/icons/ic_book.svg';
import IcCall from '../../assets/icons/ic_call.svg';
import IcChallenge from '../../assets/icons/ic_challenge.svg';
import IcChat from '../../assets/icons/ic_chat.svg';
import IcChatOutline from '../../assets/icons/ic_chat_outline.svg';
import IcCheckCircle from '../../assets/icons/ic_check_circle.svg';
import IcClose from '../../assets/icons/ic_close.svg';
import IcEmail from '../../assets/icons/ic_email.svg';
import IcEmoji from '../../assets/icons/ic_emoji.svg';
import IcFire from '../../assets/icons/ic_fire.svg';
import IcFriends from '../../assets/icons/ic_friends.svg';
import IcGrammar from '../../assets/icons/ic_grammar.svg';
import IcHome from '../../assets/icons/ic_home.svg';
import IcHomeOutline from '../../assets/icons/ic_home_outline.svg';
import IcInterview from '../../assets/icons/ic_interview.svg';
import IcLearn from '../../assets/icons/ic_learn.svg';
import IcListening from '../../assets/icons/ic_listening.svg';
import IcLock from '../../assets/icons/ic_lock.svg';
import IcMedal from '../../assets/icons/ic_medal.svg';
import IcMedical from '../../assets/icons/ic_medical.svg';
import IcMeeting from '../../assets/icons/ic_meeting.svg';
import IcMicrophone from '../../assets/icons/ic_microphone.svg';
import IcMore from '../../assets/icons/ic_more.svg';
import IcNotification from '../../assets/icons/ic_notification.svg';
import IcPlay from '../../assets/icons/ic_play.svg';
import IcProfile from '../../assets/icons/ic_profile.svg';
import IcProgressChart from '../../assets/icons/ic_progress_chart.svg';
import IcQuiz from '../../assets/icons/ic_quiz.svg';
import IcReading from '../../assets/icons/ic_reading.svg';
import IcRestaurant from '../../assets/icons/ic_restaurant.svg';
import IcSearch from '../../assets/icons/ic_search.svg';
import IcSend from '../../assets/icons/ic_send.svg';
import IcSettings from '../../assets/icons/ic_settings.svg';
import IcShare from '../../assets/icons/ic_share.svg';
import IcSpeaker from '../../assets/icons/ic_speaker.svg';
import IcStar from '../../assets/icons/ic_star.svg';
import IcStarOutline from '../../assets/icons/ic_star_outline.svg';
import IcTarget from '../../assets/icons/ic_target.svg';
import IcTravel from '../../assets/icons/ic_travel.svg';
import IcTrophy from '../../assets/icons/ic_trophy.svg';
import IcVocabulary from '../../assets/icons/ic_vocabulary.svg';
import IcXpBolt from '../../assets/icons/ic_xp_bolt.svg';

// ── Icon name map ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<SvgProps>> = {
  add_friend: IcAddFriend,
  arrow_right: IcArrowRight,
  attach: IcAttach,
  back: IcBack,
  book: IcBook,
  call: IcCall,
  challenge: IcChallenge,
  chat: IcChat,
  chat_outline: IcChatOutline,
  check_circle: IcCheckCircle,
  close: IcClose,
  email: IcEmail,
  emoji: IcEmoji,
  fire: IcFire,
  friends: IcFriends,
  grammar: IcGrammar,
  home: IcHome,
  home_outline: IcHomeOutline,
  interview: IcInterview,
  learn: IcLearn,
  listening: IcListening,
  lock: IcLock,
  medal: IcMedal,
  medical: IcMedical,
  meeting: IcMeeting,
  microphone: IcMicrophone,
  more: IcMore,
  notification: IcNotification,
  play: IcPlay,
  profile: IcProfile,
  progress_chart: IcProgressChart,
  quiz: IcQuiz,
  reading: IcReading,
  restaurant: IcRestaurant,
  search: IcSearch,
  send: IcSend,
  settings: IcSettings,
  share: IcShare,
  speaker: IcSpeaker,
  star: IcStar,
  star_outline: IcStarOutline,
  target: IcTarget,
  travel: IcTravel,
  trophy: IcTrophy,
  vocabulary: IcVocabulary,
  xp_bolt: IcXpBolt,
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface AppIconProps extends SvgProps {
  name: keyof typeof ICON_MAP;
  size?: number;
  /** 0–1 opacity wrapper, useful for inactive tab icons */
  opacity?: number;
}

// ── Component ─────────────────────────────────────────────────────────────────
const AppIcon: React.FC<AppIconProps> = ({ name, size = 24, opacity, ...rest }) => {
  const Icon = ICON_MAP[name];
  if (!Icon) { return null; }

  const icon = <Icon width={size} height={size} {...rest} />;

  if (opacity !== undefined && opacity !== 1) {
    return <View style={{ opacity }}>{icon}</View>;
  }
  return icon;
};

export default AppIcon;
