import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/styles';

const ArchivedRoomBanner = () => (
    <View style={styles.archivedRoomBanner}>
        <Text style={styles.archivedRoomBannerText}>This room has been archived.</Text>
    </View>
);

export default ArchivedRoomBanner;