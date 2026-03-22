import PropTypes from 'prop-types';
import { View, Modal, StyleSheet, Image } from 'react-native';
import { withWindowDimensions } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
const ReceiptModal = ({ isVisible, onClose, receiptUrl, windowWidth, windowHeight }) => {
    return (
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: receiptUrl }}
                        style={[styles.receiptImage, { width: windowWidth, height: windowHeight }]}
                    />
                </View>
            </View>
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    receiptImage: {
        resizeMode: 'contain',
    },
});