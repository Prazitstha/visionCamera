import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';

// import slider for the tuning of pitch and speed
import Slider from '@react-native-community/slider';

// import Tts Text to Speech
import Tts from 'react-native-tts';
import Icon from './common/Icon';
const TexttoSpeech = textToRead => {
  console.log('textTOrEAD', textToRead?.textToRead);
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  console.log('ttsStatussss', ttsStatus);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(
    'hello hello hello hellohello hellohello hellohello hello',
  );
  console.log('text.length', text.length);
  const [startText, setStartText] = useState(0);
  const [endText, setEndText] = useState(0);
  console.log('startText EndText', startText, endText);
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
    Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
    Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    Tts.addEventListener(
      'tts-progress',
      event => {
        event && setStartText(event?.start);
        event && setEndText(event?.end);
      },
      // event && setStartText(event?.end),

      // setEndText(event?.end),
    );
  }, []);
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
  const readText = async () => {
    Tts.stop();
    Tts.speak(text);
  };
  const handlePlay = () => {
    Tts.speak(text);
    setIsPlaying(true);
  };

  const handlePause = () => {
    console.log('Pausedddddddddddddd');
    Tts.pause();
    Tts.setIsPlaying(false);
  };

  const handleStop = () => {
    Tts.stop();
    setIsPlaying(false);
  };
  //   const updateSpeechRate = async rate => {
  //     await Tts.setDefaultRate(rate);
  //     setSpeechRate(rate);
  //   };

  //   const updateSpeechPitch = async rate => {
  //     await Tts.setDefaultPitch(rate);
  //     setSpeechPitch(rate);
  //   };

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
  const [hasBookmarked, setHasBookmarked] = useState(false);
  return (
    <View style={styles.container}>
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
      <View style={styles.leftBar}>
        <TouchableOpacity onPress={() => setHasBookmarked(!hasBookmarked)}>
          {!hasBookmarked ? (
            <Icon type={'fa'} name="bookmark-o" size={30} color={'#1E90FF'} />
          ) : (
            <Icon type={'fa'} name="bookmark" size={30} color={'#1E90FF'} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'center',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Icon type={'material'} name="replay-10" size={30} color="#808080" />
        </TouchableOpacity>
        {/* <View>
          <Icon type={'materialCommunity'} name="rewind-10" size={25} />
        </View> */}
        {console.log('isPlaying', isPlaying)}
        {!isPlaying ? (
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
        )}
        <TouchableOpacity
          onPress={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Icon type={'material'} name="forward-10" size={30} color="#808080" />
        </TouchableOpacity>

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
      <TouchableOpacity onPress={() => {}} style={styles.rightBar}>
        {/* <Icon type={'material'} name="forward-10" size={30} color="#808080" />
         */}
        <Text style={{fontSize: 18, fontWeight: '600'}}>1x</Text>
      </TouchableOpacity>
      {/* <Text style={styles.sliderLabel}>Select the Voice from below</Text>
        <FlatList
          style={{width: '100%', marginTop: 5}}
          keyExtractor={item => item.id}
          renderItem={renderVoiceItem}
          extraData={selectedVoice}
          data={voices}
        /> */}
    </View>
  );
};
export default TexttoSpeech;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
  },
  leftBar: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    paddingHorizontal: 20,
  },
  rightBar: {
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
