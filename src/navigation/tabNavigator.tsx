import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraScreen from '../screen/Camera-screen';
import {createRef} from 'react';
const Tab = createBottomTabNavigator();
export const navigationRef = createRef();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarInactiveTintColor: '#000000',
        tabBarActiveTintColor: 'red',
        tabBarLabelStyle: {
          // fontFamily: 'Inter-Medium',
          fontSize: 10,
          marginBottom: 2,
        },
      })}>
      <Tab.Screen
        name={'Home'}
        component={CameraScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'Add Friday Class Report',
          headerShown: false,
          //   tabBarIcon: ({focused}) => {
          //     return focused ? (
          //       <Icon
          //         type="fa"
          //         name="file-text"
          //         size={23}
          //         color={Colors.primary_color}
          //       />
          //     ) : (
          //       <Icon
          //         type="fa"
          //         name="file-text-o"
          //         size={23}
          //         color={Colors.gray}
          //       />
          //     );
          //   },
        }}
      />
      <Tab.Screen
        name={'Bookmarks'}
        component={CameraScreen}
        options={{
          tabBarLabel: 'Bookmarks',
          title: 'Add Friday Class Report',
          headerShown: false,
          //   tabBarIcon: ({focused}) => {
          //     return focused ? (
          //       <Icon
          //         type="fa"
          //         name="file-text"
          //         size={23}
          //         color={Colors.primary_color}
          //       />
          //     ) : (
          //       <Icon
          //         type="fa"
          //         name="file-text-o"
          //         size={23}
          //         color={Colors.gray}
          //       />
          //     );
          //   },
        }}
      />

      {/* <Tab.Screen
            name="FridayAttendance"
            component={FridayAttendance}
            options={{
              tabBarLabel: 'Friday Attendance',
              tabBarIcon: ({focused}) => {
                return focused ? (
                  <Icon
                    type="fa"
                    name="address-book"
                    size={23}
                    color={Colors.primary_color}
                  />
                ) : (
                  <Icon
                    type="fa"
                    name="address-book-o"
                    size={23}
                    color={Colors.gray}
                  />
                );
              },
            }}
          /> */}
    </Tab.Navigator>
  );
}
