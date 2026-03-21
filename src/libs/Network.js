import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import {Cache} from 'react-native-cache';
import {PropTypes} from 'prop-types';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const NetworkPropTypes = {
    url: PropTypes.string.isRequired,
};
const cache = new Cache({
    namespace: 'attachments',
});

const Network = (props) => {
    const {url} = props;
        .catch((error) => {
            console.error('Failed to fetch network resource:', error);
        });

    const cacheResource = async (url, data) => {
        try {
            await cache.setItem(url, data);
        } catch (error) {
            console.error('Failed to cache network resource:', error);
        }
    };

    cacheResource(url, response);
    return (
        <View style={styles.networkContainer}>