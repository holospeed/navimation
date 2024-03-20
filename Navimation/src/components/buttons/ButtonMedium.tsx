import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {primaryColor} from '../../model/colors';

function ButtonMedium({
  title,
  pressHandler,
}: {
  title: string;
  pressHandler: () => void;
}) {
  return (
    <Pressable onPress={pressHandler} style={styles.buttonContainer}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 14, fontWeight: '600'},
  buttonContainer: {
    backgroundColor: primaryColor,
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default ButtonMedium;
