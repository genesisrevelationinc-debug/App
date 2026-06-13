import {Str} from 'expensify-common';
import type {ReportAction} from '@src/types/onyx';
import * as Browser from '@libs/Browser';
import type {NotificationComment} from './types';

type NotificationEvent = Event & {
 * @param onClick - Callback to run on notification click
 * @param onClose - Callback to run on notification close
 */
function createNotification(title: string, body: string, icon: string, onClick: () => void, onClose: () => void): void {
    const options: NotificationOptions = {
        body,
        icon,
    };

    // Edge browser has issues with requireInteraction, causing notifications to not display
    if (!Browser.isEdge()) {
        options.requireInteraction = true;
    }

    const notification = new Notification(title, {
        body,
        icon,
    });