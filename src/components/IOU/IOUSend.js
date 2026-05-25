import {useNetwork} from 'react-native';

// Add other imports and component logic
    const payButton = (
        <Button
            success
            text={translateLocal(
                'common.pay',
            )}
            onPress={pay}
            style={styles.button}
        />
    );
    );

export default function IOUSend({report, session, iou, network, iouReportID, pay}) {
    const payButton = (
        <Button
            success
            text={translateLocal(
                'common.pay',
            )}
            onPress={pay}
            style={styles.button}
        />
    );

// Add other imports and component logic