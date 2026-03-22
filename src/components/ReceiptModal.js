import PropTypes from 'prop-types';
import { View, Modal, StyleSheet, Image } from 'react-native';
import { withWindowDimensions } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const ReceiptModal = ({ isVisible, onClose, receiptUrl, windowWidth, windowHeight }) => {
    return (
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: receiptUrl }}
                        style={[styles.receiptImage, { height: windowHeight - 100 }]} // Adjust height to fill modal
                    />
                </View>
            </View>
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '95%',
    },
    receiptImage: {
        resizeMode: 'contain',
        width: '100%',
    },
});
