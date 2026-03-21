import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import {Cache} from 'react-native-cache';
import {PropTypes} from 'prop-types';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const AttachmentPropTypes = {
    url: PropTypes.string.isRequired,
};
const cache = new Cache({
    namespace: 'attachments',
});

const Attachment = (props) => {
    const {url} = props;
        .catch((error) => {
            console.error('Failed to fetch attachment:', error);
        });

    const cacheAttachment = async (url, data) => {
        try {
            await cache.setItem(url, data);
        } catch (error) {
            console.error('Failed to cache attachment:', error);
        }
    };

    cacheAttachment(url, response);
    return (
        <View style={styles.attachmentContainer}>