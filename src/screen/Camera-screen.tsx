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
import TrackPlayer, {useProgress} from 'react-native-track-player';
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
import TexttoSpeech from '../components/TexttoSpeech';
import Icon from '../components/common/Icon';
import Swiper from 'react-native-swiper';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
const data = {
  sample1: {
    id: '12345',
    name: 'Shakya Muni Buddha',
    desc: 'Bhairava originates from the word bhīru, which means "fearsome". Bhairava means "terribly fearsome form". It is also known as one who destroys fear or one who is beyond fear. One interpretation is that he protects his devotees from dreadful enemies, greed, lust, and anger. These enemies are dangerous as they never allow humans to seek God within. There is also another interpretation: Bha means creation, ra means sustenance and va means destruction. Therefore, Bhairava is the one who creates, sustains and dissolves the three stages of life. Therefore, he becomes the ultimate or the supreme.',
    img: require('../../assets/bhairav.jpg'),
  },
  sample2: {
    id: '22212',
    name: 'Green tara',
    desc: 'Hanuman (/ˈhʌnʊˌmɑːn/; Sanskrit: हनुमान्, IAST: Hanumān),[5] also known as Maruti, Bajrangabali, and Anjaneya,[6] is a deity in Hinduism, revered as a divine vanara and a devoted companion of the deity Rama. Central to the Ramayana, Hanuman is celebrated for his unwavering devotion to Rama and is considered a chiranjivi. He is traditionally believed to be the spiritual offspring of the wind deity Vayu, who is said to have played a significant role in his birth.[7][8] His tales are recounted not only in the Ramayana but also in the Mahabharata and various Puranas.',
    img: require('../../assets/hanuman.jpg'),
  },
  sample3: {
    id: '22212',
    name: 'Amitabha Buddha',
    desc: 'Hanuman (/ˈhʌnʊˌmɑːn/; Sanskrit: हनुमान्, IAST: Hanumān),[5] also known as Maruti, Bajrangabali, and Anjaneya,[6] is a deity in Hinduism, revered as a divine vanara and a devoted companion of the deity Rama. Central to the Ramayana, Hanuman is celebrated for his unwavering devotion to Rama and is considered a chiranjivi. He is traditionally believed to be the spiritual offspring of the wind deity Vayu, who is said to have played a significant role in his birth.[7][8] His tales are recounted not only in the Ramayana but also in the Mahabharata and various Puranas.',
    img: require('../../assets/hanuman.jpg'),
  },
};
const CameraScreen = ({navigation}) => {
  const camera = useRef(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  console.log('showCamera', showCamera);
  const [imageSource, setImageSource] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowCamera(true);
    }, 200);
  }, []);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      let value = codes[0]?.value;
      console.log('value', value);
      if (value && data[value]) {
        // Navigate to 'detail-screen' and pass the matched object
        navigation.navigate('detail-screen', {selectedData: data[value]});
      }
      // if (value) {
      //   // Iterate over the keys in the data object
      //   for (const key in data) {
      //     if (data.hasOwnProperty(key)) {
      //       console.log('111111111111111111111111111');
      //       // Check if the value matches the name
      //       if (value === data[key]?.name.toLowerCase()) {
      //         console.log('22222222222222222222222');

      //         // Use the useNavigation hook to get the navigation object
      //         // const navigation = useNavigation();

      //         // Navigate to 'detail-screen' and pass the matched object
      //         navigation.navigate('detail-screen', {object: data[key]});
      //         return; // Stop further iteration since we found a match
      //       }
      //     }
      //   }
      // }
    },
  });
  const codeScannesr = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      let value = codes[0]?.value;
      console.log('value', value);
      if (value) {
      }
      // if (value === 'sample1') {
      //   setSelectedData(data.shakyamunibuddha);
      //   setModalVisible(true);
      //   navigation.navigate('detail-screen', {
      //     selectedData: data.shakyamunibuddha,
      //   });
      // } else if (value === 'sample2') {
      //   setSelectedData(data.greentara);
      //   setModalVisible(true);
      // } else if (value === 'sample3') {
      //   setSelectedData(data.amitabhabuddha);
      //   setModalVisible(true);
      // }
    },
  });

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
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const handleToggleCamera = () => {
    setShowCamera(!showCamera);
  };
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        format={format}
        isActive={showCamera}
        photo={true}
        // frameProcessor={frameProcessor}
        codeScanner={codeScanner}
        exposure={0}
      />
    </View>
  );
};
export default CameraScreen;
const styles = StyleSheet.create({
  leftBar: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    elevation: 25,
    width: '100%',
    backgroundColor: '#fcf7ef',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderTopWidth: 0.5,
    // borderTopColor: '#ccc',
    // backgroundColor: 'red',
    // elevation: 1,
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },
  centerBar: {
    width: '100%',

    // backgroundColor: 'cyan',
  },
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
