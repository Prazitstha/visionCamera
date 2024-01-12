import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator, {navigationRef} from './tabNavigator';

const NavigationContainerComp = () => (
  <NavigationContainer ref={navigationRef}>
    <TabNavigator />
  </NavigationContainer>
);

export default NavigationContainerComp;
