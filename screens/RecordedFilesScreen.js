import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Pressable,TouchableOpacity,Vid } from 'react-native';
import RNFS from 'react-native-fs';

const RecordedFilesScreen = ({navigation}) => {
  const [recordedFiles, setRecordedFiles] = useState([]);

  useEffect(() => {
    retrieveRecordedFiles();
  }, []);

  const retrieveRecordedFiles = async () => {
    try {
      const folderPath = RNFS.DocumentDirectoryPath + '/Videos';
      const files = await RNFS.readDir(folderPath);
      setRecordedFiles(files);
    } catch (error) {
      console.log('Error retrieving recorded files:', error);
    }
  };


  
  const playVideo = (videoUri) => {
    // You can customize how you want to play the video here
    // For example, you can navigate to a separate screen dedicated to video playback

    // Here, we are simply logging the video URI
    console.log('Playing video:', videoUri);
  };

  const renderRecordedFile = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => playVideo(item.path)} style={{ marginBottom: 20 }}>
        <Video
          source={{ uri: item.path }}
          style={{ width: 300, height: 200 }}
          resizeMode="contain"
          paused={true}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 ,backgroundColor:'grey'}}>
      <FlatList
        data={recordedFiles}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (

          <Pressable style={{ padding: 10 }} onPress={()=>navigation.navigate('playvideo',{videoUri:item.path})}>
            <Text>{item.name}</Text>
            <Text>{item.path}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default RecordedFilesScreen;
