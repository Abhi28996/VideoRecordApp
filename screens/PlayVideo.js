import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const PlayVideo = ({ route }) => {

const {videoUri} = route.params;

    return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode="contain"
        controls={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default PlayVideo;
