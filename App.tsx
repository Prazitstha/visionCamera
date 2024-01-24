/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import Modal from 'react-native-modal';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {
  Camera,
  Templates,
  useCameraDevice,
  // useCameraDevice,
  useCameraDevices,
  useCameraFormat,
  useCodeScanner,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import NavigationContainerComp from './src/navigation/navigationContainer';
type SectionProps = PropsWithChildren<{
  title: string;
}>;
const data = {
  bhairab: {
    id: '12345',
    name: 'Bhairav',
    desc: 'Bhairava originates from the word bhīru, which means "fearsome". Bhairava means "terribly fearsome form". It is also known as one who destroys fear or one who is beyond fear. One interpretation is that he protects his devotees from dreadful enemies, greed, lust, and anger. These enemies are dangerous as they never allow humans to seek God within. There is also another interpretation: Bha means creation, ra means sustenance and va means destruction. Therefore, Bhairava is the one who creates, sustains and dissolves the three stages of life. Therefore, he becomes the ultimate or the supreme.',
    img: require('./assets/bhairav.jpg'),
  },
  hanuman: {
    id: '22212',
    name: 'Hanuman',
    desc: 'Hanuman (/ˈhʌnʊˌmɑːn/; Sanskrit: हनुमान्, IAST: Hanumān),[5] also known as Maruti, Bajrangabali, and Anjaneya,[6] is a deity in Hinduism, revered as a divine vanara and a devoted companion of the deity Rama. Central to the Ramayana, Hanuman is celebrated for his unwavering devotion to Rama and is considered a chiranjivi. He is traditionally believed to be the spiritual offspring of the wind deity Vayu, who is said to have played a significant role in his birth.[7][8] His tales are recounted not only in the Ramayana but also in the Mahabharata and various Puranas.',
    img: require('./assets/hanuman.jpg'),
  },
};

function App(): JSX.Element {
  const camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      // if (enableOnCodeScanned) {
      let value = codes[0]?.value;
      console.log('value', value);
      if (value === 'bhairav') {
        setSelectedData(data.bhairab);
        setModalVisible(true);
      } else if (value === 'hanuman') {
        setSelectedData(data.hanuman);
        setModalVisible(true);
      }
    },
  });
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
  const [cameraType, setCameraType] = useState('back');
  const device = useCameraDevice(cameraType);
  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);
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
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainerComp />
    </ApplicationProvider>
    // <View style={styles.container}>
    //   {showCamera ? (
    //     <>
    //       <Camera
    //         ref={camera}
    //         style={StyleSheet.absoluteFill}
    //         device={device}
    //         format={format}
    //         isActive={showCamera}
    //         photo={true}
    //         // frameProcessor={frameProcessor}
    //         codeScanner={codeScanner}
    //         exposure={0}
    //       />

    //       <View style={styles.buttonContainer}>
    //         <TouchableOpacity
    //           onPress={() =>
    //             cameraType === 'back'
    //               ? setCameraType('front')
    //               : setCameraType('back')
    //           }>
    //           <Text
    //             style={{
    //               backgroundColor: '#FFFFFF',
    //               marginRight: 20,
    //               padding: 10,
    //             }}>
    //             Switch
    //           </Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={styles.camButton}
    //           onPress={() => capturePhoto()}
    //         />
    //       </View>
    //     </>
    //   ) : (
    //     <>
    //       {imageSource !== '' ? (
    //         <Image
    //           style={styles.image}
    //           source={{
    //             uri: `file://'${imageSource}`,
    //           }}
    //         />
    //       ) : null}

    //       <View style={styles.backButton}>
    //         <TouchableOpacity
    //           style={{
    //             backgroundColor: 'rgba(0,0,0,0.2)',
    //             padding: 10,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 10,
    //             borderWidth: 2,
    //             borderColor: '#fff',
    //             width: 100,
    //           }}
    //           onPress={() => setShowCamera(true)}>
    //           <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.buttonContainer}>
    //         <View style={styles.buttons}>
    //           <TouchableOpacity
    //             style={{
    //               backgroundColor: '#fff',
    //               padding: 10,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               borderRadius: 10,
    //               borderWidth: 2,
    //               borderColor: '#77c3ec',
    //             }}
    //             onPress={() => setShowCamera(true)}>
    //             <Text style={{color: '#77c3ec', fontWeight: '500'}}>
    //               Retake
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             style={{
    //               backgroundColor: '#77c3ec',
    //               padding: 10,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               borderRadius: 10,
    //               borderWidth: 2,
    //               borderColor: 'white',
    //             }}
    //             onPress={() => setShowCamera(true)}>
    //             <Text style={{color: 'white', fontWeight: '500'}}>
    //               Use Photo
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </>
    //   )}
    //   <Modal
    //     isVisible={isModalVisible}
    //     onSwipeComplete={() => setModalVisible(false)}
    //     style={{display: 'flex', justifyContent: 'flex-end', margin: 0}}
    //     swipeDirection="left">
    //     <View style={{backgroundColor: '#FFFFFF'}}>
    //       <TouchableOpacity
    //         onPress={() => setModalVisible(false)}
    //         style={{
    //           width: '100%',
    //           flexDirection: 'row',
    //           justifyContent: 'flex-end',
    //           padding: 10,
    //         }}>
    //         <Text style={{fontSize: 20, fontWeight: '800'}}>X</Text>
    //       </TouchableOpacity>
    //       <View
    //         style={{
    //           alignItems: 'center',
    //           paddingHorizontal: 10,
    //           paddingTop: 10,
    //           paddingBottom: 30,
    //         }}>
    //         {console.log('ssssssssssssssssssss', selectedData)}
    //         <Image
    //           source={selectedData?.img}
    //           style={{height: 150, width: 150}}
    //         />
    //         <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 10}}>
    //           {selectedData?.name}
    //         </Text>
    //         <Text style={{fontSize: 16}}>{selectedData?.desc}</Text>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>
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
    flexDirection: 'row',
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
