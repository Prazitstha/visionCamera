import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator, {navigationRef} from './tabNavigator';
import CameraScreenNav from './CameraScreenNav';

const NavigationContainerComp = () => (
  <NavigationContainer ref={navigationRef}>
    <CameraScreenNav />
    {/* <TabNavigator /> */}
  </NavigationContainer>
);

export default NavigationContainerComp;
