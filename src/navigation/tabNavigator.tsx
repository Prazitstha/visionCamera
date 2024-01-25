import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraScreen from '../screen/Camera-screen';
import {createRef} from 'react';
import Icon from '../components/common/Icon';
import BookmarkNavigator from './CameraScreenNav';
import CameraScreenNav from './CameraScreenNav';
const Tab = createBottomTabNavigator();
export const navigationRef = createRef();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarInactiveTintColor: '#808080',
        tabBarActiveTintColor: '#1E90FF',
        tabBarStyle: {
          paddingTop: 5,
          // height: 50,
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
        },
        tabBarLabelStyle: {
          // fontFamily: 'Inter-Medium',
          fontSize: 12,
          fontWeight: '800',
          marginBottom: 2,
        },
      })}>
      <Tab.Screen
        name={'Home'}
        component={CameraScreen}
        options={{
          tabBarLabel: 'Scan QR',
          title: 'Scan QR',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Icon
                type="materialCommunity"
                name="qrcode-scan"
                size={23}
                color={'#1E90FF'}
              />
            ) : (
              <Icon
                type="materialCommunity"
                name="qrcode-scan"
                size={23}
                color={'#808080'}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name={'Bookmarks'}
        component={BookmarkNavigator}
        options={{
          tabBarLabel: 'Bookmarks',
          title: 'Bookmarks',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Icon type="fa" name="bookmark" size={23} color={'#1E90FF'} />
            ) : (
              <Icon type="fa" name="bookmark-o" size={23} color={'#808080'} />
            );
          },
        }}
      /> */}

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
