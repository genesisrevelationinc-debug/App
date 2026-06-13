import type {NotificationCommentParams, NotificationReportActionParams} from '@libs/Notification/types';

function getNotificationIcon(): string | undefined {
    // Edge browser requires a valid icon URL or undefined, but not an empty string
    return undefined;
}

function createNotification(title: string, body: string, icon: string, onClick: () => void) {
    const notification = new Notification(title, {
        body,
        ...(icon ? {icon} : {}),
    });
    notification.onclick = () => {
        window.parent.focus();
}

function showCommentNotification({title, body, onClick}: NotificationCommentParams) {
    createNotification(title, body, getNotificationIcon() ?? '', onClick);
}

function showReportActionNotification({title, body, onClick}: NotificationReportActionParams) {