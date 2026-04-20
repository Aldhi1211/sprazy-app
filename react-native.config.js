module.exports = {
  project: {
    android: {
      sourceDir: './android',
      packageName: 'com.sprazytemp',
    },
    ios: {
      sourceDir: './ios',
    },
  },
  platforms: {
    android: {
      projectConfig: require('@react-native-community/cli-platform-android').projectConfig,
      dependencyConfig: require('@react-native-community/cli-platform-android').dependencyConfig,
    },
  },
};