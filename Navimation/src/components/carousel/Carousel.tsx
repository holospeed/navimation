import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {ICarouselProps} from './types';
import ButtonMedium from '../buttons/ButtonMedium';

function Carousel({image, bigText, smallText, pressHandler}: ICarouselProps) {
  return (
    <ImageBackground
      source={{
        uri: image,
      }}
      style={styles.imageBackground}>
      <View style={styles.imageBackgroundMainContainer}>
        <Text style={styles.bigText}>{bigText}</Text>
        <Text style={styles.smallText}>{smallText}</Text>
        <ButtonMedium title={'LEJÁTSZÁS'} pressHandler={pressHandler} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 300,
  },
  imageBackgroundMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bigText: {
    marginRight: 60,
    marginLeft: 60,
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  smallText: {
    marginTop: 10,
    marginRight: 60,
    marginLeft: 60,
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
  },
});

export default Carousel;
