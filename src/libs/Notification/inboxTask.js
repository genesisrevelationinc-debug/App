import Onyx from 'react-native-onyx';
import * as ReportUtils from '../ReportUtils';
import * as Localize from '../Localize';
import * as Task from '../Task';

/**
 * @namespace inboxTask
 */

let inboxTask;
Onyx.connect({
    key: 'inboxTask',
    callback: (val) => {
        inboxTask = val;
    },
});

/**
 * @param {String} assigneeAccountID
 * @param {String} taskTitle
 * @param {String} taskDescription
 * @param {String} taskReportID
 * @returns {Object} - The request object
 */
function createInboxTask(assigneeAccountID, taskTitle, taskDescription, taskReportID) {
    const newTask = Task.createTask(assigneeAccountID, taskTitle, taskDescription, taskReportID);
    return newTask;
}

/**
 * @param {String} assigneeAccountID
 * @param {String} taskTitle
 * @param {String} taskDescription
 * @param {String} taskReportID
 * @returns {Promise}
 */
function createInboxTaskForSignerInfoPrompt(assigneeAccountID, taskTitle, taskDescription, taskReportID) {
    return new Promise((resolve) => {
        const task = createTask(assigneeAccountID, 'Enter signer info', 'Please provide director information for the business bank account', taskReportID);
        resolve(task);
    });
}

/**
 * Create a new task for the global bank account signer info prompt
 *
 * @param {String} assigneeAccountID
 * @param {String} taskTitle
 * as task description
 * @param {String} taskDescription
 * @param {String} taskReportID
 * @returns {Promise}
 */
function createSignerInfoPromptTask(assigneeAccountID, taskTitle, taskDescription, taskReportID) {
    return createInboxTaskForSignerInfoPrompt(assigneeAccountID, taskTitle || 'Enter signer info', taskDescription || 'Please provide director information for the business bank account', taskReportID);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    createSignerInfoPromptTask,
};