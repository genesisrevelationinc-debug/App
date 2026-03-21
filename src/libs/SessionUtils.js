import lodashHas from 'lodash/has';
import lodashIsEqual from 'lodash/isEqual';
import lodashIsString from 'lodash/isString';
import * as ReportActions from './actions/Report';
import * as UserUtils from './UserUtils';
import * as API from './API';
import * as OnyxUtils from './OnyxUtils';
        .then((response) => {
            if (response.jsonCode === 200) {
                Onyx.merge(ONYXKEYS.SESSION, {authToken: response.authToken});
                // Ensure the Inbox is refreshed after successful login
                Onyx.set(ONYXKEYS.IS_LOADING_REPORT_DATA, true);
                ReportActions.fetchAllReports();
                Onyx.set(ONYXKEYS.IS_LOADING_REPORT_DATA, false);
                Navigation.dismissModal();
            } else {
                Onyx.merge(ONYXKEYS.SESSION, {error: response.message});