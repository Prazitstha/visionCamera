import Modal from 'react-native-modal';
import {
  Alert,
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
// import {
//   Camera,
//   Templates,
//   useCameraDevice,
//   // useCameraDevice,
//   useCameraDevices,
//   useCameraFormat,
//   useCodeScanner,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
import TexttoSpeech from '../components/TexttoSpeech';
import Icon from '../components/common/Icon';
import Swiper from 'react-native-swiper';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {Camera, CameraType} from 'react-native-camera-kit';
const data = {
  sample1: {
    id: '12345',
    name: 'Shakya Muni Buddha',
    desc: 'In the main courtyard, there is this three storeyed building which is covered with golden metal sheets facing East (call it West wing). One can see multiple roofing at different storeys of the building with several statues studed in walls and windows along with various other carvings. This wing has a raised platform with a narrow corridor at basement covered with golden metal sheets. A centrally placed and highly decorated silver door here opens to a room called Ganda-kuti where the main statue, Buddha Sakyamuni is enshrined. A silver torana is placed over this door wherein Panch Buddhas are engraved very distinctly.',
    img: require('../../assets/images/shakyamunibuddha1.jpg'),
  },
  sample2: {
    id: '22212',
    name: 'Green tara',
    desc: 'sample 2',
    img: require('../../assets/images/greentara.jpg'),
  },
  sample3: {
    id: '22212',
    name: 'Amitabha Buddha',
    desc: 'In the main courtyard, there is this three storeyed building which is covered with golden metal sheets facing East (call it West wing). One can see multiple roofing at different storeys of the building with several statues studed in walls and windows along with various other carvings. This wing has a raised platform with a narrow corridor at basement covered with golden metal sheets. A centrally placed and highly decorated silver door here opens to a room called Ganda-kuti where the main statue, Buddha Sakyamuni is enshrined. A silver torana is placed over this door wherein Panch Buddhas are engraved very distinctly.',
    img: require('../../assets/images/amitabh.jpg'),
  },
};
const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  console.log('showCamera', showCamera);
  const [imageSource, setImageSource] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleQrevent = event => {
    const scannedData = event?.nativeEvent?.codeStringValue;
    if (scannedData && data[scannedData]) {
      setSelectedData(data[[scannedData]]);
      setModalVisible(true);
      // Navigate to 'detail-screen' and pass the matched object
      // navigation.navigate('detail-screen', {selectedData: data[scannedData]});
    }
  };
  const handleToggleCamera = () => {
    setShowCamera(!showCamera);
  };
  return (
    // <View style={styles.container}>
    <>
      {showCamera && (
        <Camera
          style={{flex: 1}}
          scanBarcode={true}
          onReadCode={event => handleQrevent(event)} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
          laserColor="white" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />
      )}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut={'slideOutDown'}
        animationInTiming={600}
        animationOutTiming={600}
        coverScreen={true}
        onModalShow={handleToggleCamera}
        // onSwipeComplete={() => setModalVisible(false)}
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
          padding: 0,
        }}
        // swipeDirection="left"
      >
        <View
          style={{
            flex: 1,
            // maxHeight: '70%',
            backgroundColor: '#fed38a',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Image
                source={require('../../assets/icons/Logo.png')}
                style={{height: 60, width: 60, resizeMode: 'contain'}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text category="h5">Golden Temple 金廟</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleToggleCamera(), setModalVisible(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Icon type={'ant'} name="close" size={22} color="#4d4d4d" />
              {/* <Text style={{fontSize: 20, fontWeight: '800'}}>X</Text> */}
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                alignItems: 'center',
                // paddingHorizontal: 10,
                // paddingTop: 10,
                paddingBottom: 30,
              }}>
              {/* <Swiper
                style={{position: 'relative'}}
                showsButtons={false}
                height={200}
                // height={swiperHeight}
                showsPagination={true}
                autoplay={true}
                autoplayTimeout={4}
                paginationStyle={{
                  bottom: -20,
                  // backgroundColor: '#00000050',
                  paddingVertical: 5,
                  // right: 0,
                  // backgroundColor: 'blue',
                  // width: 50,
                  // justifyContent: 'flex-end',
                  // paddingRight: 30,
                }}
                loop={true}
                // height={190}
                // animated={true}
                bounces={true}
                removeClippedSubviews={false}
                activeDot={
                  <View
                    style={{
                      backgroundColor: '#1E90FF',
                      width: 16,
                      height: 6,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }
                dot={
                  <View
                    style={{
                      backgroundColor: '#ccc',
                      width: 6,
                      height: 6,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }>
                <View style={{paddingHorizontal: 0}}>
                  <Image
                    source={require('../../assets/images/threebuddha.jpg')}
                    style={{
                      height: 200,
                      width: '100%',
                      resizeMode: 'contain',
                      borderRadius: 1,
                    }}
                  />
                </View>
                <View style={{paddingHorizontal: 0}}>
                  <Image
                    source={require('../../assets/images/shakyamunibuddha.jpg')}
                    style={{
                      height: 200,
                      width: '100%',
                      resizeMode: 'contain',
                      borderRadius: 1,
                    }}
                  />
                </View>
                <View style={{paddingHorizontal: 0}}>
                  <Image
                    source={require('../../assets/images/threebuddha.jpg')}
                    style={{
                      height: 200,
                      width: '100%',
                      resizeMode: 'contain',
                      borderRadius: 1,
                    }}
                  />
                </View>
              </Swiper> */}
              <View style={{width: '100%', maxHeight: 260}}>
                <Image
                  source={selectedData?.img}
                  style={{
                    width: '100%', // Set width to 100% of the parent container
                    height: '100%', // Set height to 100% of the parent container
                    resizeMode: 'contain', // or 'contain' based on your preference
                  }}
                />
              </View>

              <View style={{marginTop: 20, paddingHorizontal: 10}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  {selectedData?.desc}
                </Text>
                {/* <Text style={{fontSize: 16}}>{selectedData?.desc}</Text>
                <Text style={{fontSize: 16}}>{selectedData?.desc}</Text>
                <Text style={{fontSize: 16}}>{selectedData?.desc}</Text> */}
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomBar}>
            {/* <View style={styles.centerBar}> */}
            <TexttoSpeech
              textToRead={selectedData?.desc}
              handleToggleCamera={handleToggleCamera}
            />
            {/* </View> */}
          </View>
        </View>
      </Modal>
    </>
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
