import _ from 'underscore';
import ONYXKEYS from '../ONYXKEYS';
import * as SessionUtils from './SessionUtils';
import * as ReportActions from './actions/Report';

/**
 * Merges default values into the dehydrated state.
    if (!state[ONYXKEYS.SESSION]) {
        state[ONYXKEYS.SESSION] = {};
    }
    // Ensure reports are fetched on session change
    if (SessionUtils.isAnonymousUser()) {
        ReportActions.fetchAllReports();
    }
    return state;
}
