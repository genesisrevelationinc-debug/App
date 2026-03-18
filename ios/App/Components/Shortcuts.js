import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ShortcutIcon from './ShortcutIcon';

const Shortcuts = ({ shortcuts }) => (
  <View style={styles.shortcutsContainer}>
    {shortcuts.map((shortcut, index) => (
      <TouchableOpacity key={index} style={styles.shortcutButton}>
        <ShortcutIcon iconSource={shortcut.icon} size={24} />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  shortcutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  shortcutButton: {
    padding: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default Shortcuts;