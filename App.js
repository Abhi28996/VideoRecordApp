import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid ,StyleSheet,Alert} from 'react-native';
import RNFS from 'react-native-fs';
import VideoRecorderScreen from './screens/CameraScreen';
import { NavigationContainer } from '@react-navigation/native';
import RecordedFilesScreen from './screens/RecordedFilesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayVideo from './screens/PlayVideo';


const App = () => {
  useEffect(() => {
   
    const requestPermissions = async () => {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions);

        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Camera and storage permissions granted');
          //writeAndReadFile();
        } else {
          console.log('Camera or storage permission denied');
          //showAlert();
          requestPermissions()
        }
      } catch (error) {
        console.log('Error requesting permissions:', error);
        requestPermissions();
      }
    };


    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);
  const Stack = createNativeStackNavigator();

  return (
<NavigationContainer>
    <Stack.Navigator  initialRouteName="Video" >
    <Stack.Screen name="Video" component={VideoRecorderScreen} />
    <Stack.Screen name="file" component={RecordedFilesScreen} />
    <Stack.Screen name="playvideo" component={PlayVideo} />

  </Stack.Navigator>
  </NavigationContainer>
 
  );
}

export default App

const styles = StyleSheet.create({})

