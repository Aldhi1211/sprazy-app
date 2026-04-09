import React, { useState } from 'react';
import { Image, View, Text, ImageStyle, ViewStyle } from 'react-native';

interface SafeImageProps {
  source: any;
  style?: ImageStyle;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  fallbackText?: string;
  fallbackStyle?: ViewStyle;
}

/**
 * Image component that shows a text fallback if the image file doesn't exist yet.
 */
const SafeImage = ({
  source,
  style,
  resizeMode = 'contain',
  fallbackText = '🖼️',
  fallbackStyle,
}: SafeImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[style as ViewStyle, { alignItems: 'center', justifyContent: 'center' }, fallbackStyle]}>
        <Text style={{ fontSize: 40 }}>{fallbackText}</Text>
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
