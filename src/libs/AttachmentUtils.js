import {Cache} from 'react-native-cache';

const attachmentCache = new Cache({
    namespace: 'attachments',
    policy: {
        maxEntries: 500,
        stdTTL: 0,
    },
});

/**
 * Cache an attachment by URL.
 * @param {String} url - The URL of the attachment.
 * @param {Blob} blob - The attachment data.
 */
export function cacheAttachment(url, blob) {
    attachmentCache.set(url, blob);
}

/**
 * Retrieve an attachment from the cache by URL.
 * @param {String} url - The URL of the attachment.
 * @returns {Blob|null} - The attachment data or null if not found.
 */
export function getCachedAttachment(url) {
    return attachmentCache.get(url);
}

/**
 * Check if an attachment is cached by URL.
 * @param {String} url - The URL of the attachment.
 * @returns {Boolean} - True if the attachment is cached, false otherwise.
 */
export function isAttachmentCached(url) {
    return attachmentCache.has(url);
}

/**
 * Remove an attachment from the cache by URL.
 * @param {String} url - The URL of the attachment.
 */
export function removeCachedAttachment(url) {
    attachmentCache.delete(url);
}