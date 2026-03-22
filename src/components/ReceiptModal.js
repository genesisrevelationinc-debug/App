import PropTypes from 'prop-types';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {Dimensions} from 'react-native';

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    receiptImage: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
});

            <View style={styles.modalContainer}>
                <Image
                    source={{uri: props.receiptUrl}}
                    style={[styles.receiptImage, {resizeMode: 'contain'}]}
                />
            </View>
        </Modal>