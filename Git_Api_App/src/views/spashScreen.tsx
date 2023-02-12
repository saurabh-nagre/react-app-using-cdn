import React, {useEffect, useRef, useState} from 'react';

import {View, StyleSheet, Animated, Dimensions} from 'react-native';

import {Navigation} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

import firstImage from './../assets/runOctopus.gif';
import secondImage from '../assets/finalOctopus.gif';

const SpashScreen = ({navigation}: {navigation: Navigation}) => {
  const [imageSource, setImageSource] = useState(firstImage);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const textPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const size = useRef(new Animated.Value(100)).current;
  const animatedFontSize = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let h = Dimensions.get('screen').height - 150;
    let w = Dimensions.get('screen').width;
    position.setValue({x: 0, y: h / 2});
    textPosition.setValue({x: 50, y: h / 2 - 100});
    const firstAnime = Animated.parallel([
      moveAnime(w / 2, h / 2),
      sizeAnime(50),
    ]);

    Animated.sequence([firstAnime, rotateAnime(1)]).start(() => {
      setImageSource(secondImage);
      rotateValue.setValue(0);
      Animated.parallel([
        fontsizeAnime(50),
        sizeAnime(200),
        rotateAnime(0),
      ]).start(() => {
        navigation.replace('UserList');
      });
    });
  }, []);

  const fontsizeAnime = (font: number) => {
    return Animated.timing(animatedFontSize, {
      toValue: font,
      duration: 2000,
      useNativeDriver: false,
    });
  };
  const sizeAnime = (width: number) => {
    return Animated.timing(size, {
      toValue: width,
      duration: 2000,
      useNativeDriver: false,
    });
  };
  const moveAnime = (r: number, l: number) => {
    return Animated.timing(position, {
      toValue: {x: r, y: l},
      duration: 2000,
      useNativeDriver: false,
    });
  };

  const rotateAnime = (value: number) => {
    return Animated.timing(rotateValue, {
      toValue: value,
      duration: value === 1 ? 500 : 4000,
      useNativeDriver: false,
    });
  };

  const yInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '80deg'],
  });

  const rotationMoveStyle = {
    transform: [
      {
        translateX: position.x,
      },
      {
        translateY: position.y,
      },
      {
        rotateY: yInterpolate,
      },
    ],
  };

  return (
    <View style={styles.body}>
      <Animated.Image
        style={[{width: size, height: size}, rotationMoveStyle]}
        source={imageSource}
      />
      <Animated.Text
        style={[
          textPosition.getLayout(),
          {
            fontSize: animatedFontSize,
          },
          styles.bigText,
        ]}>
        GitHub
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: constants.WHITE,
  },
  bigText: {
    fontWeight: '900',
    color: constants.BLACK,
  },
});
export default SpashScreen;
