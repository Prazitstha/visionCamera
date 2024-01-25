/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import NavigationContainerComp from './src/navigation/navigationContainer';

function App(): JSX.Element {
  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainerComp />
    </ApplicationProvider>
  );
}

export default App;
