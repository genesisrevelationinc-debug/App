import PropTypes from 'prop-types';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {Dimensions} from 'react-native';

const propTypes = {
    receiptURL: PropTypes.string.isRequired,
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

            <View style={styles.modal}>
                <Image
                    source={{uri: receiptURL}}
                    style={styles.image}
                />
            </View>
        </Modal>