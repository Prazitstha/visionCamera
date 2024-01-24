import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookmarkList from '../screen/bookmark/BookmarkList';

const Stack = createStackNavigator();

const BookmarkNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bookmark-list" component={BookmarkList} />
    </Stack.Navigator>
  );
};

export default BookmarkNavigator;
