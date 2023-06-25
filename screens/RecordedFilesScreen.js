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
