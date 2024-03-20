import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function MyCoursesScreen() {
  return (
    <View style={styles.container}>
      <Text>MyCoursesScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default MyCoursesScreen;
