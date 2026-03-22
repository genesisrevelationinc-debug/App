import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
const ReceiptModal = ({ isVisible, onClose, receiptUrl }) => {
    if (!isVisible) return null;
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: receiptUrl }}
                        style={[
                            styles.receiptImage,
                            { height: Dimensions.get('window').height - 100 }, // Adjust height to fill modal
                        ]}
                    />
                </View>
            </View>
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});