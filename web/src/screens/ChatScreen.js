import React from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
const ChatScreen = () => {
    useCallback(() => {
      // Perform any side-effects here
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      // Clear any previous screen state or flicker issues
    }, []),
  );
  return (