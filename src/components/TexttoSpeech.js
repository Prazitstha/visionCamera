import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
  IndexPath,
  Text,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
} from '@ui-kitten/components';
// import slider for the tuning of pitch and speed
import Slider from '@react-native-community/slider';

// import Tts Text to Speech
import Tts from 'react-native-tts';
import Icon from './common/Icon';
import {ProgressBar} from '@ui-kitten/components';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
const placements = [
  'top',
  'top start',
  'top end',
  'bottom',
  'bottom start',
  'bottom end',
  'left',
  'left start',
  'left end',
  'right',
  'right start',
  'right end',
];
const speechRates = [
  {
    name: '2',
    value: 1,
  },
  {
    name: '1.5',
    value: 0.75,
  },
  {
    name: '1',
    value: 0.5,
  },
  {
    name: '0.75',
    value: 0.25,
  },
  {
    name: '0.5',
    value: 0.05,
  },
];
const speed = ['4', '2', '1', '0.75', '0.5', '0.25'];

const TexttoSpeech = (textToRead, {handleToggleCamera}) => {
  console.log('textTOrEAD', textToRead?.textToRead);
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  console.log('ttsStatussss', ttsStatus);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  const [remainText, setRemainText] = useState('');
  console.log('texttexttexttexttexttexttext', text);
  console.log('textLength', text.length);

  const [startText, setStartText] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  console.log('currentTextIndexttttttttttttttt', currentTextIndex);
  const [progress, setProgress] = useState(0);
  const [totalLength, setTotalLength] = useState(526);
  // console.log('startText EndText', startText, endText);
  // console.log('progress', progress);

  useEffect(() => {
    if (textToRead) {
      setText(textToRead?.textToRead);
    }
  }, [textToRead]);
  useEffect(() => {
    // Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
    // Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
    // Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    Tts.getInitStatus().then(initTts);
  }, []);
  useEffect(() => {
    Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
    Tts.addEventListener('tts-finish', _event => {
      setIsPlaying(false);
      setText(textToRead?.textToRead);
      setTtsStatus('finished');
    });
    Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    // Tts.addEventListener(
    //   'tts-progress',
    //   handleTtsProgress,
    //   // event => {
    //   //   event && setStartText(event?.start);
    //   //   event && setEndText(event?.end);
    //   // },
    //   // event && setStartText(event?.end),

    //   // setEndText(event?.end),
    // );
  }, []);
  useEffect(() => {
    const handleTtsProgress = event => {
      if (event) {
        setStartText(event.start);
        setCurrentTextIndex(event.end);
      }
    };

    Tts.addEventListener('tts-progress', handleTtsProgress);

    // Calculate progress based on the latest state
    const calculatedProgress = currentTextIndex / text.length;
    console.log('currentTextIndextttttttttt', currentTextIndex);
    console.log('CalculatedProgress', calculatedProgress);
    setProgress(calculatedProgress);

    // Cleanup event listener on component unmount
  }, [currentTextIndex, totalLength]);

  // const handleTtsProgress = event => {
  //   if (event) {
  //     setStartText(event.start);
  //     setcurrentTextIndex(event.end);

  //     if (currentTextIndex > 0 && startText >= 0 && currentTextIndex >= startText) {
  //       const calculatedProgress = currentTextIndex / totalLength;
  //       console.log('currentTextIndextttttttttt', currentTextIndex);
  //       console.log('CalculatedProgress', calculatedProgress);
  //       setProgress(calculatedProgress);
  //     }
  //   }
  // };
  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        //Samsung S9 has always this error:
        //"Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };

  useEffect(() => {
    if (selectedSpeed) {
      const updateSpeechRate = async rate => {
        await Tts.setDefaultRate(rate);
        setSpeechRate(rate);
      };
      console.log('selectedSpeed----------------------------', selectedSpeed);
      updateSpeechRate(selectedSpeed);
    }
  }, [selectedSpeed]);

  const updateSpeechRate = async rate => {
    console.log('Type offfffff', typeof rate);
    // await Tts.setDefaultPitch(rate);
    // setSpeechPitch(rate);
  };

  const onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };

  const renderVoiceItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: selectedVoice === item.id ? '#DDA0DD' : '#5F9EA0',
        }}
        onPress={() => onVoicePress(item)}>
        <Text style={styles.buttonTextStyle}>
          {`${item.language} - ${item.name || item.id}`}
        </Text>
      </TouchableOpacity>
    );
  };
  const [visible, setVisible] = React.useState(false);

  const [selectedSpeed, setSelectedSpeed] = useState(0.5);
  const [selectedSpeedName, setSelectedSpeedName] = useState('1');
  console.log('Sleccccccccccccccccccted', selectedSpeed, selectedSpeedName);
  const handleMenuItemClick = async item => {
    const num = item.value;
    // console.log('itemmmmmmmmmmmmmmsa', typeof parseInt(item));
    await Tts.setDefaultRate(num);
    setSelectedSpeed(num);
    setSelectedSpeedName(item.name);
    setVisible(false); // Close the menu after clicking
  };
  const renderToggleButton = () => (
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.rightBar}>
      <Text style={{fontSize: 18, fontWeight: '600'}}>
        {selectedSpeedName}x
      </Text>
    </TouchableOpacity>
  );

  const renderPlacementItem = title => <SelectItem title={title} />;
  const speak = () => {
    if (!isPlaying) {
      Tts.speak(text);
      setPauseState('pause');
      setIsPlaying(true);
    } else {
      Tts.stop();
      setIsPlaying(false);
    }
  };

  const pause = () => {
    Tts.stop();
    setPauseState('resume');
    const remainingText = text.substring(currentTextIndex);
    setText(remainingText);
    // setIsPlaying(false);
  };

  const stop = () => {
    Tts.stop();
    setText(textToRead?.textToRead);
    setIsPlaying(false);
  };

  const resume = () => {
    // const remainingText = text.substring(currentTextIndex);
    // console.log(
    //   'RemainingTextttttttttt----------------------------',
    //   remainingText,
    // );
    Tts.speak(text);
    setPauseState('pause');
    setIsPlaying(true);
  };
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [pauseState, setPauseState] = useState('pause');
  // const [fullText, setFullText] = useState('Hello my name is react native!');
  // const [partialText, setPartialText] = useState('');
  // const handleFunc = () => {
  //   const text = fullText.substring(25);
  //   setPartialText(text);
  // };
  // console.log('Lengthhhhhhhhhhhhhhhhh', fullText.length);
  // console.log(
  //   'partialTexttttttttttttttttttttttttttttttttttttttttt',
  //   partialText,
  // );
  return (
    <View
      style={{
        marginTop: 0,
        paddingTop: 0,
        // borderTopWidth: 0.5,
        // borderTopColor: '#ccc',
        width: '100%',
      }}>
      {/* <View style={{marginBottom: 10}}>
      </View> */}
      {/* <ProgressBar progress={progress} size="tiny" /> */}
      {/* <Text>Hello</Text> */}
      {/* <Text style={styles.titleText}>
          Text to Speech Conversion with Natural Voices
        </Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Speed: ${speechRate.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            value={speechRate}
            onSlidingComplete={updateSpeechRate}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Pitch: ${speechPitch.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            value={speechPitch}
            onSlidingComplete={updateSpeechPitch}
          />
        </View> */}
      {/* <Text style={styles.sliderContainer}>
          {`Selected Voice: ${selectedVoice || ''}`}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setText(text)}
          value={text}
          onSubmitEditing={Keyboard.dismiss}
        /> */}
      <View style={styles.ttscontainer}>
        <View style={styles.leftBar}>
          {/* <TouchableOpacity onPress={() => setHasBookmarked(!hasBookmarked)}>
            {!hasBookmarked ? (
              <Icon type={'fa'} name="bookmark-o" size={25} color={'#1E90FF'} />
            ) : (
              <Icon type={'fa'} name="bookmark" size={25} color={'#1E90FF'} />
            )}
          </TouchableOpacity> */}
          {!isPlaying ? (
            <TouchableOpacity onPress={speak}>
              <Icon type={'fa6'} name={'play'} size={35} color={'#3c1a00'} />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={pauseState === 'pause' ? pause : resume}>
                {pauseState === 'pause' ? (
                  <Icon
                    type={'fa'}
                    name={'pause'}
                    size={35}
                    color={'#3c1a00'}
                  />
                ) : (
                  <Icon
                    type={'fa6'}
                    name={'play'}
                    size={35}
                    color={'#3c1a00'}
                  />
                )}
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={stop}>
                <Icon type={'fa'} name={'stop'} size={30} color={'#ffffff'} />
              </TouchableOpacity> */}
            </View>
          )}
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            width: '50%',
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // display: 'flex',
            // flexWrap: 'wrap',
          }}>
          {console.log('isPlaying', isPlaying)}
          <TouchableOpacity
            onPress={handleToggleCamera}
            style={{
              backgroundColor: '#3c1a00',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: '#ffffff'}} category="h6">
              Continue
            </Text>
          </TouchableOpacity>
          {/* {isPlaying && <Button title="Pause" onPress={pause} />}
          {!isPlaying && currentTextIndex < text.length && (
            <Button title="Resume" onPress={resume} />
          )} */}
          {/* {!isPlaying ? (
            <TouchableOpacity onPress={handlePlay}>
              <Icon
                type={'fa'}
                name={'play-circle'}
                size={65}
                color={'#1E90FF'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStop}>
              <Icon type="fa" name="stop-circle" size={65} color={'#1E90FF'} />
            </TouchableOpacity>
          )} */}
          {/* <TouchableOpacity
            onPress={() => {
              setCurrentTextIndex(prev => prev + 10);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Icon
              type={'material'}
              name="forward-10"
              size={30}
              color="#808080"
            />
          </TouchableOpacity> */}

          {/* <View>
          <Icon type={'materialCommunity'} name="fast-forward-10" size={25} />
        </View> */}
          {/* <TouchableOpacity style={styles.buttonStyle} onPress={readText}>
              {console.log('ttsStatus', ttsStatus)}
              <Image
              source={require('../../assets/icons/play.png')}
              style={{width: 30, height: 30}}
              />
            </TouchableOpacity> */}
        </View>

        {/* <Select
          placeholder="Select Placement"
          value={placement}
          selectedIndex={placementIndex}
          onSelect={onPlacementSelect}>
          {placements.map(renderPlacementItem)}
        </Select> */}

        <View
          style={{
            width: '25%',
            // backgroundColor: 'cyan',
            alignItems: 'center',
            justifyContent: 'center',
            // marginRight: 30,
          }}>
          <OverflowMenu
            style={{width: 100}}
            anchor={renderToggleButton}
            visible={visible}
            placement={'top'}
            onBackdropPress={() => setVisible(false)}>
            {speechRates.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  title={item.name}
                  onPress={() => handleMenuItemClick(item)}
                />
              );
            })}
          </OverflowMenu>
        </View>
        {/* <Slider
          style={styles.slider}
          minimumValue={0.01}
          maximumValue={0.99}
          value={speechRate}
          onSlidingComplete={updateSpeechRate}
        /> */}
        {/* <Text style={styles.sliderLabel}>Select the Voice from below</Text>
        <FlatList
        style={{width: '100%', marginTop: 5}}
        keyExtractor={item => item.id}
        renderItem={renderVoiceItem}
        extraData={selectedVoice}
        data={voices}
      /> */}
      </View>
    </View>
  );
};
export default TexttoSpeech;
const styles = StyleSheet.create({
  ttscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  leftBar: {
    // backgroundColor: 'cyan',

    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',

    // backgroundColor: '#3c1a00',
    // flexDirection: 'row',
    // gap: 20,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // marginVertical: 7,
    // borderRadius: 40,

    // backgroundColor: 'cyan',
    // paddingHorizontal: 20,
  },
  rightBar: {
    // width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderRadius: 60,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    marginRight: 20,
  },
  slider: {
    flex: 1,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    width: '100%',
    textAlign: 'center',
    height: 40,
  },
});
