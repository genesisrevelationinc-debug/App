import {View, Text} from 'react-native';
import _ from 'underscore';

import styles from '../styles/styles.js';
import themeColors from '../styles/themes/default.js';
import withLocalize from './withLocalize';
import withWindowDimensions from './withWindowDimensions';

const propTypes = {
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
};

const defaultProps = {
    forwardedRef: () => {},
};

export default forwardRef((props, ref) {
    return (
        <View style={styles.chatContent}>
            <Text style={styles.chatContentCompose}>
                <Text style={styles.chatContentComposeText}>
                    {props.translate('common.yourMessage')}
                </Text>
            </code>
        </View>
    );
}));