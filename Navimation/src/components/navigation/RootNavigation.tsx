import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './tabNavigator/TabNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';

function RootNavigation() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
