import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import {Cache} from 'react-native-cache';
import {PropTypes} from 'prop-types';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const MessagePropTypes = {
    content: PropTypes.string.isRequired,
};
const cache = new Cache({
    namespace: 'attachments',
});

const Message = (props) => {
    const {content} = props;
        .catch((error) => {
            console.error('Failed to fetch markdown image:', error);
        });

    const cacheMarkdownImage = async (url, data) => {
        try {
            await cache.setItem(url, data);
        } catch (error) {
            console.error('Failed to cache markdown image:', error);
        }
    };

    cacheMarkdownImage(url, response);
    return (
        <View style={styles.messageContainer}>