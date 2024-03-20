import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import DiscoveryScreen from '../../../screens/DiscoveryScreen/DiscoveryScreen';
import SearchScreen from '../../../screens/SearchScreen/SearchScreen';
import MyCoursesScreen from '../../../screens/MyCoursesScreen/MyCoursesScreen';
import ProfileScreen from '../../../screens/ProfilScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="DiscoveryScreen"
        component={DiscoveryScreen}
        options={{
          title: 'Felfedezés',
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Keresés',
        }}
      />
      <Tab.Screen
        name="MyCoursesScreen"
        component={MyCoursesScreen}
        options={{
          title: 'Kurzusaim',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
