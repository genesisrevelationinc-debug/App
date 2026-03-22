import PropTypes from 'prop-types';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {Dimensions} from 'react-native';

const propTypes = {
    receiptURL: PropTypes.string.isRequired,
    isVisible: false,
};

const {height} = Dimensions.get('window');

const ReceiptModal = (props) => {
    return (
        <Modal
                <View style={styles.container}>
                    <Image
                        source={{uri: props.receiptURL}}
                        style={[styles.image, {height: height - 100}]} // Adjust height to fill modal
                    />
                </View>
            </View>
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    image: {
        resizeMode: 'contain',
        width: '95%',
    },
});
