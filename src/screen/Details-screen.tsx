import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TexttoSpeech from '../components/TexttoSpeech';
import Icon from '../components/common/Icon';
import Swiper from 'react-native-swiper';
import {Text} from '@ui-kitten/components';

const DetailsScreen = ({route, navigation}) => {
  const selectedData = route?.params?.selectedData;
  console.log('routess', route?.params?.selectedData);

  return (
    <></>
    // <View
    //   style={{
    //     flex: 1,
    //     // maxHeight: '70%',
    //     backgroundColor: '#fed38a',
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    //     overflow: 'hidden',
    //   }}>
    //   <View
    //     style={{
    //       backgroundColor: '#ffffff',
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //     }}>
    //     <View style={{}}>
    //       <Image
    //         source={require('../../assets/icons/Logo.png')}
    //         style={{height: 60, width: 60, resizeMode: 'contain'}}
    //       />
    //     </View>
    //     <View style={{justifyContent: 'center'}}>
    //       <Text category="h5">Golden Temple 金廟</Text>
    //     </View>
    //     <TouchableOpacity
    //       onPress={() => {
    //         //   handleToggleCamera(), setModalVisible(false);
    //       }}
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         padding: 10,
    //       }}>
    //       <Icon type={'ant'} name="close" size={22} color="#4d4d4d" />
    //       {/* <Text style={{fontSize: 20, fontWeight: '800'}}>X</Text> */}
    //     </TouchableOpacity>
    //   </View>
    //   <ScrollView>
    //     <View
    //       style={{
    //         alignItems: 'center',
    //         // paddingHorizontal: 10,
    //         // paddingTop: 10,
    //         paddingBottom: 30,
    //       }}>
    //       <Swiper
    //         style={{position: 'relative'}}
    //         showsButtons={false}
    //         height={200}
    //         // height={swiperHeight}
    //         showsPagination={true}
    //         autoplay={true}
    //         autoplayTimeout={4}
    //         paginationStyle={{
    //           bottom: -20,
    //           // backgroundColor: '#00000050',
    //           paddingVertical: 5,
    //           // right: 0,
    //           // backgroundColor: 'blue',
    //           // width: 50,
    //           // justifyContent: 'flex-end',
    //           // paddingRight: 30,
    //         }}
    //         loop={true}
    //         // height={190}
    //         // animated={true}
    //         bounces={true}
    //         removeClippedSubviews={false}
    //         activeDot={
    //           <View
    //             style={{
    //               backgroundColor: '#1E90FF',
    //               width: 16,
    //               height: 6,
    //               borderRadius: 4,
    //               marginLeft: 3,
    //               marginRight: 3,
    //               marginTop: 3,
    //               marginBottom: 3,
    //             }}
    //           />
    //         }
    //         dot={
    //           <View
    //             style={{
    //               backgroundColor: '#ccc',
    //               width: 6,
    //               height: 6,
    //               borderRadius: 4,
    //               marginLeft: 3,
    //               marginRight: 3,
    //               marginTop: 3,
    //               marginBottom: 3,
    //             }}
    //           />
    //         }>
    //         <View style={{paddingHorizontal: 0}}>
    //           <Image
    //             source={require('../../assets/images/threebuddha.jpg')}
    //             style={{
    //               height: 200,
    //               width: '100%',
    //               resizeMode: 'contain',
    //               borderRadius: 1,
    //             }}
    //           />
    //         </View>
    //         <View style={{paddingHorizontal: 0}}>
    //           <Image
    //             source={require('../../assets/images/shakyamunibuddha.jpg')}
    //             style={{
    //               height: 200,
    //               width: '100%',
    //               resizeMode: 'contain',
    //               borderRadius: 1,
    //             }}
    //           />
    //         </View>
    //         <View style={{paddingHorizontal: 0}}>
    //           <Image
    //             source={require('../../assets/images/threebuddha.jpg')}
    //             style={{
    //               height: 200,
    //               width: '100%',
    //               resizeMode: 'contain',
    //               borderRadius: 1,
    //             }}
    //           />
    //         </View>
    //       </Swiper>
    //       {/* <Image
    //       source={selectedData?.img}
    //       style={{
    //         height: 200,
    //         width: '100%',
    //         resizeMode: 'contain',
    //         borderRadius: 5,
    //       }}
    //     /> */}
    //       <View style={{marginTop: 20, paddingHorizontal: 10}}>
    //         <Text style={{fontSize: 20, fontWeight: '600'}}>
    //           {selectedData?.desc}
    //         </Text>
    //         {/* <Text style={{fontSize: 16}}>{selectedData?.desc}</Text>
    //       <Text style={{fontSize: 16}}>{selectedData?.desc}</Text>
    //       <Text style={{fontSize: 16}}>{selectedData?.desc}</Text> */}
    //       </View>
    //     </View>
    //   </ScrollView>
    //   <View style={styles.bottomBar}>
    //     {/* <View style={styles.centerBar}> */}
    //     <TexttoSpeech
    //       textToRead={selectedData?.desc}
    //       handleToggleCamera={() => navigation}
    //     />
    //     {/* </View> */}
    //   </View>
    // </View>
  );
};
export default DetailsScreen;
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
