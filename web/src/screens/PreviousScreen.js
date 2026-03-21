import React from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
const PreviousScreen = () => {
    useCallback(() => {
      // Perform any side-effects related to focusing the screen
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      // Additional focus effect to handle screen transitions smoothly
    }, []),
  );
  return (