import type {NotificationCommentParams, NotificationReportActionParams} from '@libs/Notification/types';
import getNotificationIcon from '@libs/Notification/getNotificationIcon';

function createNotification(title: string, body: string, icon: string, onClick: () => void) {
    const notification = new Notification(title, {
}

function showCommentNotification({title, body, onClick}: NotificationCommentParams) {
    createNotification(title, body, getNotificationIcon(), onClick);
}

function showReportActionNotification({title, body, onClick}: NotificationReportActionParams) {