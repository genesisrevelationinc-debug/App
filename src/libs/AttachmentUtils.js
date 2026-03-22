import {Cache} from 'react-native-cache';

const attachmentCache = new Cache({
    namespace: 'attachments',
    policy: {
        maxEntries: 50,
        stdTTL: 0, // 0 = never expires
    },
});

/**
 * Caches an attachment by URL.
 * @param {string} url - The URL of the attachment.
 * @param {Blob} blob - The attachment data as a Blob.
 */
export function cacheAttachment(url, blob) {
    attachmentCache.set(url, blob);
}

/**
 * Retrieves an attachment from the cache by URL.
 * @param {string} url - The URL of the attachment.
 * @returns {Promise<Blob|null>} - The attachment data as a Blob, or null if not found.
 */
export async function getCachedAttachment(url) {
    return attachmentCache.get(url);
}

/**
 * Checks if an attachment is cached by URL.
 * @param {string} url - The URL of the attachment.
 * @returns {Promise<boolean>} - True if the attachment is cached, false otherwise.
 */
export async function isAttachmentCached(url) {
    return attachmentCache.has(url);
}

/**
 * Deletes an attachment from the cache by URL.
 * @param {string} url - The URL of the attachment.
 */
export function deleteCachedAttachment(url) {
    attachmentCache.delete(url);
}