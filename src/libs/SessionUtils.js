import _ from 'underscore';
import ONYXKEYS from '../ONYXKEYS';
import * as API from '../API';
import * as ReportActions from '../actions/Report';

/**
 * Check if the user is an anonymous user.
    return !session.authToken;
}

function fetchReportsOnLogin() {
    ReportActions.fetchAllReports();
}

export {
    isAnonymousUser,
    fetchReportsOnLogin,
};