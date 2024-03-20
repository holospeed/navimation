import {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  backgroundColor,
  primaryColor,
  secondaryColor,
} from '../../../model/colors';

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconNameExtractor = () => {
          switch (route.name) {
            case 'DiscoveryScreen':
              return 'compass';
            case 'SearchScreen':
              return 'search';
            case 'MyCoursesScreen':
              return 'book';
            case 'ProfileScreen':
              return 'user';
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <Icon
              name={iconNameExtractor() ?? 'home'}
              size={25}
              color={isFocused ? primaryColor : secondaryColor}
            />
            <Text
              style={{
                color: isFocused ? primaryColor : secondaryColor,
                ...styles.text,
              }}>
              {label as ReactNode}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  tab: {
    flex: 1,
    height: 95,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    marginTop: 8,
  },
});

export default MyTabBar;
