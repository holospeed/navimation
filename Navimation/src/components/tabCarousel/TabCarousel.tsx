import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TabCarouselProps} from './types';
import {primaryColor} from '../../model/colors';

function TabCarousel({children}: TabCarouselProps) {
  const pressed = useSharedValue(false);

  const savedOffset = useSharedValue(0);
  const offset = useSharedValue(0);

  const screenWidth = useWindowDimensions().width;
  const childrenLength = Array.isArray(children) ? children.length : 1;

  const lineOffset = useSharedValue(screenWidth / childrenLength);

  const [titles, setTitles] = useState<string[]>([]);

  const [index, setIndex] = useState(0);

  interface IScreenDimension {
    xStart: number;
    xEnd: number;
    xFirstQuarter: number;
    xThirdQuarter: number;
  }
  const [screenDimensions, setScreenDimensions] = useState<IScreenDimension[]>(
    [],
  );

  useEffect(() => {
    for (let i = 0; i < childrenLength; i++) {
      setScreenDimensions(prev => [
        ...prev,
        {
          xStart: screenWidth * i + 1,
          xEnd: screenWidth * (i + 1),
          xFirstQuarter: screenWidth * i + screenWidth / 4,
          xThirdQuarter: screenWidth * i + (screenWidth / 4) * 3,
        },
      ]);
      if (children && children[i] && children[i].props) {
        setTitles(prev => {
          const set = new Set([
            ...prev,
            children[i].props?.title ?? 'No title',
          ]);
          return Array.from(set);
        });
      }
    }
  }, [screenWidth, childrenLength, children]);

  useEffect(() => {
    lineOffset.value = withSpring((screenWidth / childrenLength) * index);
  }, [childrenLength, index, lineOffset, screenWidth]);

  const onFinalizeEvent = () => {
    if (screenDimensions.length === 0) {
      return;
    }

    const lastIndex = screenDimensions.length - 1;
    const currentScreen = screenDimensions[index];
    const x = offset.value;

    if (-currentScreen.xStart > x) {
      if (-currentScreen.xFirstQuarter <= x) {
        savedOffset.value = -currentScreen.xStart;
        offset.value = withSpring(-currentScreen.xStart);

        /// LINE ANIMATION
        lineOffset.value = withSpring((screenWidth / childrenLength) * index);
      } else if (-currentScreen.xFirstQuarter > x && index !== lastIndex) {
        savedOffset.value = -screenDimensions[index + 1].xStart;
        offset.value = withSpring(-screenDimensions[index + 1].xStart);
        setIndex(index + 1);
      } else if (-currentScreen.xFirstQuarter > x && index === lastIndex) {
        savedOffset.value = -currentScreen.xStart;
        offset.value = withSpring(-currentScreen.xStart);

        /// LINE ANIMATION
        lineOffset.value = withSpring((screenWidth / childrenLength) * index);
      } else {
        savedOffset.value = offset.value;
      }
    } else if (x > -currentScreen.xStart) {
      if (index === 0) {
        savedOffset.value = -currentScreen.xStart;
        offset.value = withSpring(-currentScreen.xStart);

        /// LINE ANIMATION
        lineOffset.value = withSpring((screenWidth / childrenLength) * index);
      } else if (x > -screenDimensions[index - 1].xThirdQuarter) {
        savedOffset.value = -screenDimensions[index - 1].xStart;
        offset.value = withSpring(-screenDimensions[index - 1].xStart);
        setIndex(index - 1);
      } else if (x <= -screenDimensions[index - 1].xThirdQuarter) {
        savedOffset.value = -currentScreen.xStart;
        offset.value = withSpring(-currentScreen.xStart);

        /// LINE ANIMATION
        lineOffset.value = withSpring((screenWidth / childrenLength) * index);
      } else {
        savedOffset.value = offset.value;
      }
    }

    pressed.value = false;
  };

  const tap = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX + savedOffset.value;
      lineOffset.value = interpolate(
        offset.value,
        screenDimensions.map(
          (screen, i) => -screen.xStart + (screenWidth / childrenLength) * i,
        ),
        screenDimensions.map((_, i) => (screenWidth / childrenLength) * i),
      );
    })
    .onFinalize(onFinalizeEvent);

  const animatedLineStyles = useAnimatedStyle(() => ({
    left: lineOffset.value,
  }));

  const animatedContainerStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const containerStyle = {
    flexDirection: 'row' as const,
    flex: 1,
    width: screenWidth * childrenLength,
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {titles.map((title, i) => (
          <Pressable
            onPress={() => {
              savedOffset.value = -screenDimensions[i].xStart;
              offset.value = withSpring(-screenDimensions[i].xStart);
              setIndex(i);
            }}
            key={i}>
            <Text style={styles.text}>{title}</Text>
          </Pressable>
        ))}
      </View>
      <Animated.View
        style={[
          styles.line,
          {
            width: screenWidth / childrenLength,
          },
          animatedLineStyles,
        ]}
      />
      <GestureDetector gesture={tap}>
        <Animated.View style={[containerStyle, animatedContainerStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 10,

    backgroundColor: primaryColor,
    position: 'absolute',
    top: 55 - 10,
  },
  text: {fontSize: 20},
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainContainer: {flex: 1},
});

export default TabCarousel;
