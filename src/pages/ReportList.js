import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import {View} from 'react-native';
import * as ReportActions from '../../libs/actions/Report';
import * as SessionUtils from '../../libs/SessionUtils';
import * as StyleUtils from '../../styles/StyleUtils';
import * as UserUtils from '../../libs/UserUtils';
    isLoadingReportData: PropTypes.bool,
};

const defaultProps = {
    isLoadingReportData: false,
};

function ReportList({isLoadingReportData}) {
    useEffect(() => {
        if (!SessionUtils.isAnonymousUser()) {
    return (
        <View style={[styles.flex1]}>
            {isLoadingReportData && <ActivityIndicator size="large" color={styles.spinner.color} />}
            {!isLoadingReportData && <ReportListContent />}
        </View>
    );
}
ReportList.defaultProps = defaultProps;

export default withOnyx({
    isLoadingReportData: {