import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ShortcutIcon = ({ iconSource, size = 24 }) => (
  <View style={styles.iconContainer}>
    <Image source={iconSource} style={[styles.icon, { width: size, height: size }]} />
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default ShortcutIcon;