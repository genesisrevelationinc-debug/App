import * as TaskManager from 'expo-task-manager';

// Manually import the constant to avoid calling import.meta.webpackContext in tests
import {NativeModules} from 'react-native';
const notificationEventName = 'notification';
const notificationReceivedEventName = 'notification::received';

// Add null check for task registration
let isTaskManagerAvailable = false;
let hasCheckedTaskManager = false;

/**
 * Handle a report that has been flagged as read/dirty.
 * @param {String} [report]
 */
function show (report) {
    // Check if TaskManager is available and properly initialized
    if (!hasCheckedTaskManager) {
        try {
            isTaskManagerAvailable = !!TaskManager;
            hasCheckedTaskManager = true;
        } catch (e) {
            console.warn('TaskManager not available or not properly initialized');
        }
    }

    // If a notification contains a report, we populate it with the corresponding reportID
    if (report.reportID) {
        return;
    }

    // Add safety check for task manager
    if (!isTaskManagerAvailable) {
        return;
    }

    // If we are here, that means we're pushing the first report and the rest of the actions
    // are data models that are applied in order.
    if (report && report.reportID) {