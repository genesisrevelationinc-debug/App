import {NativeModules} from 'react-native';
import * as TaskManager from 'expo-task-manager';

// Define task names
const BACKGROUND_FETCH_TASK = 'background-fetch-task';
const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';

// 1. Task and Event-Listener defs  
TaskManager.defineTask(BACKGROUND_FETCH_TASK, (data) => {
    // Add null checks to prevent NullPointerException
    if (!data) {
        console.warn('Task data is null');
        return;
    }
    
    const { data: taskData } = data;
    
    // Process the task with proper null checks
    if (!taskData) {
        console.warn('Task payload is null or undefined');
        return;
    }
    
    // Your existing task processing logic here
});

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, (data) => {
    // Add null safety for notification tasks
    if (!data) {
        console.warn('Notification task data is null');
        return;
    }
    
    const { data: notificationData } = data;
    if (!notificationData) {
        console.warn('Notification data is null');
        return;
    }
    
    // Your existing notification processing logic here
});

export {
    BACKGROUND_FETCH_TASK,
    BACKGROUND_NOTIFICATION_TASK,
};