import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
 * @param {String} routeToNavigateTo
 * @returns {Object}
 */
function getRouteParams() {
    return {};
}

const propTypes = {
    /** The root of the navigation tree (coming from React Navigation) */
    navigation: PropTypes.shape({
    }).isRequired,
};
