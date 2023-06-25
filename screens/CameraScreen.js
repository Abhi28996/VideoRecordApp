import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';

const VideoRecorderScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [pause, setPause] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      // Start the timer
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      // Stop and reset the timer
      clearInterval(timerRef.current);
      setTimer(0);
    }

    return () => {
      // Clean up the timer when the component unmounts
      clearInterval(timerRef.current);
    };
  }, [isRecording]);


  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);

      const options = { quality: RNCamera.Constants.VideoQuality['480p'] };
      const { uri, codec = 'mp4' } = await cameraRef.current.recordAsync(options);
      console.log("uri", uri);
      saveRecording(uri);
      setRecordedFilePath(uri);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        const recording = await cameraRef.current.stopRecording();
        console.log('Recording stopped:', recording);

        console.log('Recording path:', recordedFilePath);
        setRecordedFilePath(recordedFilePath);
      } catch (error) {
        console.log('Error stopping recording:', error);
      } finally {
        setIsRecording(false);
      }
    }
  };

  const pauseRecording = async () => {
    if (cameraRef.current && isRecording) {
      setPause(true);
      await cameraRef.current.pausePreview();

    }
  };

  const resumeRecording = async () => {
    if (cameraRef.current && pause) {
      setPause(false);
      await cameraRef.current.resumePreview();

    }
  };

  const saveRecording = async (recordedFilePath) => {
    if (recordedFilePath !== '') {
      const folderPath = RNFS.DocumentDirectoryPath + '/Videos';
      const fileName = `recordedVideo_${Date.now()}.mp4`;
      const filePath = folderPath + '/' + fileName;


      try {

        await RNFS.mkdir(folderPath);
        await RNFS.moveFile(recordedFilePath, filePath);
        console.log('Video saved successfully:', filePath);
      } catch (error) {
        console.log('Error saving video:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>

      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      >

        <View style={{ width: '100%', height: '100%' }}>

          <View style={{ flex: 1, }}>

            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
     
              <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>

              <Text>{formatTime(timer)}</Text>

              <View style={{ margin: 10, height: 10, width: 10, borderRadius: 50, backgroundColor: 'red' }}></View>
              </View>
              <Pressable onPress={() => navigation.navigate('file')} style={{ padding: 10, margin: 10, backgroundColor: 'black',margin :10 }}><Text>Recorded Files</Text></Pressable>



            </View>


            <View style={{ flex: 8, justifyContent: 'flex-end' }}>

              <View style={{ height: 100, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>


                <View style={{ flex: 1 }}>
                  {!isRecording ? (
                    <TouchableOpacity onPress={startRecording} style={{ alignSelf: 'center' }}>
                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Start Recording</Text>
                    </TouchableOpacity>
                  ) : (

                    <></>
                  )}

                </View>

                <View style={{ flex: 2, flexDirection: 'row' }}>




                  {!pause ?
                    (<Pressable onPress={pauseRecording} style={{ padding: 10, margin: 10, backgroundColor: 'black' }}><Text>pause</Text></Pressable>)

                    : (<Pressable onPress={resumeRecording} style={{ padding: 10, margin: 10, backgroundColor: 'black' }}><Text>Resume</Text></Pressable>)
                  }
                  {
                    isRecording ?
                      (<Pressable onPress={stopRecording} style={{ padding: 10, margin: 10, backgroundColor: 'black' }}><Text>Stop</Text></Pressable>) : <></>
                  }
                </View>

              </View>




            </View>

          </View>



        </View>

      </RNCamera>
    </View>
  );
};

export default VideoRecorderScreen;
