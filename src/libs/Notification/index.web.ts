import {Str} from 'expensify-common';
import type {ReportAction} from '@src/types/onyx';
import type {NotificationComment} from './types';
import Browser from '@libs/Browser';

type NotificationEvent = Event & {
    data: {
function createNotification(title: string, body: string, icon: string, onClick: () => void, onClose: () => void) {
    // eslint-disable-next-line no-new
    const notification = new Notification(title, {
        requireInteraction: !Browser.isEdge(),
        body,
        icon,
    });