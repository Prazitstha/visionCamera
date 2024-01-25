/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
// import {Camera} from 'react-native-vision-camera';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import NavigationContainerComp from './src/navigation/navigationContainer';
import {request, PERMISSIONS} from 'react-native-permissions';
function App(): JSX.Element {
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    // Request camera permission before rendering the camera screen
    requestCameraPermission();
  }, []);
  async function requestCameraPermission() {
    try {
      const status = await request(PERMISSIONS.ANDROID.CAMERA);

      if (status === 'granted') {
        console.log('Camera permission granted');
        setHasPermission(true);
        return true;
      } else {
        setHasPermission(false);
        console.log('Camera permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
      return false;
    }
  }
  // useEffect(() => {
  //   async function getPermission() {
  //     const permission = await Camera.requestCameraPermission();
  //     console.log(`Camera permission status: ${permission}`);
  //     if (permission === 'denied') await Linking.openSettings();
  //   }
  //   getPermission();
  // }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {hasPermission && <NavigationContainerComp />}
    </ApplicationProvider>
  );
}

export default App;
