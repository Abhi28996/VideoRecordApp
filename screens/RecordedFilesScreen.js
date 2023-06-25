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
      console.log(files);
      setRecordedFiles(files);
    } catch (error) {
      console.log('Error retrieving recorded files:', error);
    }
  };


  
  return (
    <View style={{ flex: 1 ,backgroundColor:'black'}}>
      <FlatList
        data={recordedFiles}
        keyExtractor={(item) => item.name}
        renderItem={({ item,key }) => (

          <Pressable style={{ padding: 10 ,margin:10,borderRadius:10,borderColor:'white',borderWidth:1 }} onPress={()=>navigation.navigate('playvideo',{videoUri:item.path})}>
            <Text>{'Recorded File '}</Text>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default RecordedFilesScreen;
