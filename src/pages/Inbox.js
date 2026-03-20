import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import {View} from 'react-native';
import * as ReportActions from '../../libs/actions/Report';
import * as SessionUtils from '../../libs/actions/Session';
import * as ReportUtils from '../../libs/ReportUtils';
import * as StyleUtils from '../../styles/StyleUtils';
    isLoadingReportData: PropTypes.bool,
};

const defaultProps = {
    isLoadingReportData: false,
};

function Inbox({isLoadingReportData}) {
    useEffect(() => {
        if (!SessionUtils.isAnonymousUser()) {
    }, []);

    return (
        <View style={[styles.flex1, isLoadingReportData && styles.opacity50]}>
            <View style={[styles.flex1, styles.justifyContentBetween]}>
                <View style={[styles.flex1]}>
                    <ReportList
                </View>
            </View>
        </View>
    );
}

Inbox.propTypes = propTypes;
export default withOnyx({
    isLoadingReportData: {
        key: ONYXKEYS.IS_LOADING_REPORT_DATA,
        default: false,
    },
})(Inbox);