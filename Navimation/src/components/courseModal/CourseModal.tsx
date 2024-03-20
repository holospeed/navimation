import React from 'react';
import {Modal, View, StyleSheet, useWindowDimensions} from 'react-native';
import {ICourseModal} from './types';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import TabCarousel from '../tabCarousel/TabCarousel';

function CourseModal({id, isModalVisible, handleModal}: ICourseModal) {
  console.log('id', id);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    console.log('event', event.contentOffset.y);
    scrollY.value = event.contentOffset.y;
  });

  const height = useWindowDimensions().height;
  const headerImageHight = (height / 3) * 2;

  const headerStyles = useAnimatedStyle(() => {
    return {
      top: 0,
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'red',
      height: interpolate(
        scrollY.value,
        [0, headerImageHight],
        [headerImageHight, 0],
        Extrapolation.EXTEND,
      ),
    };
  });

  const scrollStylesRelative = useAnimatedStyle(() => {
    return {
      backgroundColor: 'yellow',
      position: 'relative',
    };
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={handleModal}>
      <Animated.Image
        style={headerStyles}
        source={{
          uri: 'https://img.freepik.com/free-photo/beauty-portrait-female-face_93675-132045.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais',
        }}
      />
      <Animated.ScrollView
        style={[scrollStylesRelative]}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        nestedScrollEnabled
        directionalLockEnabled={false}
        overScrollMode={'always'}>
        <View style={{marginTop: headerImageHight}} />
        <TabCarousel>
          <TestMe color={'red'} title={'KURZUSRÓL'} />
          <TestMe color={'green'} title={'EPIZÓDOK'} />
        </TabCarousel>
        <View style={{marginTop: headerImageHight}} />
        <View style={{marginTop: headerImageHight}} />
        <View style={{marginTop: headerImageHight}} />
      </Animated.ScrollView>
    </Modal>
  );
}

function TestMe({color, title}: {color: string; title: string}) {
  return (
    <View
      testID={'test-' + title}
      style={[styles.testContainer, {backgroundColor: color}]}
    />
  );
}

const styles = StyleSheet.create({
  testContainer: {flex: 1, height: 300},
});

export default CourseModal;
