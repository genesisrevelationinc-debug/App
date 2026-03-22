import styles from '../../styles/styles';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import withWindowDimensions, {windowDimensionsPropTypes} from '../withWindowDimensions';
import {Dimensions} from 'react-native';
const propTypes = {
    ...withLocalizePropTypes,
    const {translate} = props;
    const {isSmallScreenWidth} = props.windowDimensions;
    const {height} = Dimensions.get('window');
    const modalStyle = [
        styles.flex1,
        {height: height - 50}, // Adjust the height to fill the screen minus some padding
        styles.alignItemsCenter,
        styles.justifyContentCenter,
    ];
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.isVisible}
            style={styles.flex1}
        >
            <View style={modalStyle}>
                <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>