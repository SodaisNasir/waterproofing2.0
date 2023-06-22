import React from 'react';
import {Text, StyleSheet, ActivityIndicator, View} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={styles.mainView}>
      <LottieView
        style={styles.lootie}
        source={require('../../assets/Lootie/Loader.json')}
        autoPlay
        loop
        speed={0.7}
        autoSize={false}
      />
    </View>
  );
};
export default Loading;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lootie: {
    width: '10%',
    aspectRatio: 1 / 1,
  },
});
