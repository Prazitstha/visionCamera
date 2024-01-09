/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {
  Camera,
  useCameraDevice,
  // useCameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  //   frame => {
  //     'worklet';
  //     if (model.state !== 'loaded') return;

  //     const data = frame.toArrayBuffer();
  //     // do RGB conversion if the Frame is not already in RGB Format
  //     const outputs = model.model.runSync([data]);

  //     const detection_boxes = outputs[0];
  //     const detection_classes = outputs[1];
  //     const detection_scores = outputs[2];
  //     const num_detections = outputs[3];
  //     console.log(`Detected ${num_detections[0]} objects!`);

  //     for (let i = 0; i < detection_boxes.length; i += 4) {
  //       const confidence = detection_scores[i / 4];
  //       if (confidence > 0.7) {
  //         // Draw a red box around the object!
  //         const left = detection_boxes[i];
  //         const top = detection_boxes[i + 1];
  //         const right = detection_boxes[i + 2];
  //         const bottom = detection_boxes[i + 3];
  //         console.log('sssssssssssssssssssss', left, top, right, bottom);
  //         // const rect = SkRect.Make(left, top, right, bottom);
  //         // frame.drawRect(rect, SkColors.Red);
  //       }
  //     }
  //   },
  //   [model],
  // );

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log('hello');
    // Frame processing logic
  }, []);
  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);
  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      // setImageSource(photo.path);
      // setShowCamera(false);
      console.log(photo.path);
    }
  };
  const device = useCameraDevice('back');
  // const device = devices.back;

  // if (!hasPermission) {
  //   return (
  //     <View>
  //       <Text>No permission</Text>
  //     </View>
  //   );
  // }
  if (device == null) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
            frameProcessor={frameProcessor}
            // frameProcessorFps={1}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
});

export default App;
