import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import CameraScreen from '../screen/Camera-screen';
import DetailsScreen from '../screen/Details-screen';
import TabNavigator from './tabNavigator';

const Stack = createStackNavigator();

const CameraScreenNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="tab-navigation" component={TabNavigator} />
      <Stack.Screen name="detail-screen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default CameraScreenNav;
