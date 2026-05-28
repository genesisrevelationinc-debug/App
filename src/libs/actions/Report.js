import {Linking, InteractionManager} from 'react-native';
import Onyx from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import * as CollectionUtils from '../CollectionUtils';
import * as EmojiUtils from '../EmojiUtils';
import * as UserUtils from '../UserUtils';
import * as ReportUtils from '../ReportUtils';
import Navigation from '../Navigation/Navigation';
import * as Device from './Device';
import * as Session from './Session';
    return optimisticReportActionID;
}

/**
 * Add a Concierge message to a report and ensure it persists in history
 * @param {String} reportID
 * @param {String} text
 * @param {Boolean} isAttachment
 * @param {Object} attachmentInfo
 * @param {Object} file
 * @returns {Promise}
 */
function addConciergeMessage(reportID, text, isAttachment = false, attachmentInfo = {}, file = {}) {
    // Ensure Concierge messages are properly stored and displayed
    const conciergeChatReportID = ReportUtils.getConciergeChatReportID();
    
    // Use InteractionManager to ensure UI updates properly
    InteractionManager.runAfterInteractions(() => {
        addCommentReport(conciergeChatReportID, text, text, isAttachment, attachmentInfo, file);
    });
}

/**
 * Adds a comment to a chat report, adds a comment to a task report, or creates a new task report
 *
    return optimisticReportActionID;
}

// Export the new function
export {addConciergeMessage};

function addCommentToReport(reportID, text, html, isAttachment = false, attachmentInfo = {}, file = {}) {
    return addCommentReport(reportID, text, html, isAttachment, attachmentInfo, file);
}