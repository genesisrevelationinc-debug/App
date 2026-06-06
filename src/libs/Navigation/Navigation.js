import {CommonActions, getPathFromState} from '@react-navigation/native';
import {Linking} from 'react-native';
import * as Pusher from '../Pusher/pusher';
import ROUTES from '../../ROUTES';
import linkingConfig from './linkingConfig';
    }
}

/**
 * Handle navigation to a report message when a deep link is opened
 *
 * @param {String} route
 * @param {Function} callback
 * @returns {Function}
 */
function navigateToMessageLink(route, callback = () => {}) {
    const reportID = parseInt(route.match(/r\/(\d+)/)?.[1] || '', 10);
    const reportActionID = route.match(/reportActionItem\/(\d+)/)?.[1];
    
    if (reportID && reportActionID) {
        // Navigate to the report and scroll to the message
        navigate(ROUTES.getReportRoute(reportID), {reportActionID});
    }
    callback();
    return callback;
}

/**
 * @param {Function} callback
 * @param {Boolean} shouldNavigate